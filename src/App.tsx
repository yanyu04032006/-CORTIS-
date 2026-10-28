/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Sparkles,
  Heart,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Check,
  Copy,
  Share2,
  Volume2,
  VolumeX,
  Users,
  X,
  Download,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMBERS, MEMBER_LIST } from './data/members';
import { QUESTIONS } from './data/questions';
import { MemberId, HiddenDimensions } from './types';
import { sound } from './utils/sound';
import { getDynamicNuance } from './utils/resultNuance';
import { generatePhotocardImage } from './utils/canvasPhotocard';

export default function App() {
  const [stage, setStage] = useState<'cover' | 'quiz' | 'loading' | 'result'>('cover');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<MemberId, number>>({
    james: 0,
    juhoon: 0,
    martin: 0,
    seonghyeon: 0,
    keonho: 0,
  });
  const [dimensions, setDimensions] = useState<HiddenDimensions>({
    reliability: 0,
    gentleness: 0,
    contrast: 0,
    chemistry: 0,
    mystery: 0,
    playfulness: 0,
  });
  const [historySelections, setHistorySelections] = useState<number[]>([]);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(sound.getMuted());
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const startQuiz = () => {
    sound.playSparkle();
    setScores({ james: 0, juhoon: 0, martin: 0, seonghyeon: 0, keonho: 0 });
    setDimensions({
      reliability: 0,
      gentleness: 0,
      contrast: 0,
      chemistry: 0,
      mystery: 0,
      playfulness: 0,
    });
    setHistorySelections([]);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setStage('quiz');
  };

  const chooseOption = (index: number) => {
    sound.playPop();
    setSelectedOpt(index);
  };

  const handleNext = () => {
    if (selectedOpt === null) return;
    sound.playSwoosh();

    const opt = QUESTIONS[currentIdx].options[selectedOpt];

    // Accumulate member scores
    const newScores = { ...scores };
    (Object.entries(opt.scores) as [MemberId, number][]).forEach(([mem, pt]) => {
      newScores[mem] = (newScores[mem] || 0) + pt;
    });
    setScores(newScores);

    // Accumulate hidden dimensions
    const newDims = { ...dimensions };
    (Object.entries(opt.dimensions) as [keyof HiddenDimensions, number][]).forEach(
      ([dim, val]) => {
        if (val) {
          newDims[dim] = (newDims[dim] || 0) + val;
        }
      }
    );
    setDimensions(newDims);

    const newHistory = [...historySelections, selectedOpt];
    setHistorySelections(newHistory);
    setSelectedOpt(null);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStage('loading');
      setTimeout(() => {
        sound.playSparkle();
        setStage('result');
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#FF2E63', '#FFD54F', '#2979FF', '#7C4DFF', '#00B0FF'],
        });
      }, 1600);
    }
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;
    sound.playSwoosh();

    // Replay history to recompute clean scores & dimensions
    const prevHistory = historySelections.slice(0, currentIdx - 1);
    const recomputedScores: Record<MemberId, number> = {
      james: 0,
      juhoon: 0,
      martin: 0,
      seonghyeon: 0,
      keonho: 0,
    };
    const recomputedDims: HiddenDimensions = {
      reliability: 0,
      gentleness: 0,
      contrast: 0,
      chemistry: 0,
      mystery: 0,
      playfulness: 0,
    };

    prevHistory.forEach((ansIdx, qIdx) => {
      const qOpt = QUESTIONS[qIdx].options[ansIdx];
      if (qOpt) {
        (Object.entries(qOpt.scores) as [MemberId, number][]).forEach(([mem, pt]) => {
          recomputedScores[mem] += pt;
        });
        (Object.entries(qOpt.dimensions) as [keyof HiddenDimensions, number][]).forEach(
          ([dim, val]) => {
            if (val) recomputedDims[dim] += val;
          }
        );
      }
    });

    setScores(recomputedScores);
    setDimensions(recomputedDims);
    setHistorySelections(prevHistory);
    setSelectedOpt(historySelections[currentIdx - 1] ?? null);
    setCurrentIdx(currentIdx - 1);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsSoundMuted(muted);
  };

  // Determine top members
  const sortedMembers = (Object.entries(scores) as [MemberId, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const primaryKey = sortedMembers[0]?.[0] || 'james';
  const runnerUpKey = sortedMembers[1]?.[0] || 'juhoon';
  const isDualBias =
    sortedMembers[0] &&
    sortedMembers[1] &&
    sortedMembers[0][1] - sortedMembers[1][1] <= 2;

  const primary = MEMBERS[primaryKey];
  const runnerUp = MEMBERS[runnerUpKey];

  const dynamicNuance = getDynamicNuance(primaryKey, runnerUpKey, dimensions);

  const copyTextToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
        return;
      }
    } catch {
      // Fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Silently handle if clipboard not permitted
    }
  };

  const handleShare = async () => {
    sound.playPop();
    const shareText = `《猜猜你的 CORTIS 擔是誰？》\n我的 CORTIS 擔是：${primary.chineseName} (${primary.englishName})！\n差一點被 ${runnerUp.chineseName} 拐走。\n心動關鍵是：${primary.title}！\n快來測測你的心動雷達：`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: '《猜猜你的 CORTIS 擔是誰？》',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or unsupported, fallback to clipboard
      }
    }

    await copyTextToClipboard(`${shareText}\n${window.location.href}`);
  };

  const handleCopy = () => {
    sound.playPop();
    const text = `《猜猜你的 CORTIS 擔是誰？》\n我的 CORTIS 擔是：${primary.chineseName} (${primary.englishName})！\n差一點被 ${runnerUp.chineseName} 拐走。\n心動關鍵是：${primary.title}！\n快來測測看：${window.location.href}`;
    copyTextToClipboard(text);
  };

  const handleDownloadCard = async () => {
    try {
      sound.playSparkle();
      setIsDownloading(true);
      const dataUrl = await generatePhotocardImage(primary);
      const link = document.createElement('a');
      link.download = `CORTIS_${primary.englishName}_Photocard.png`;
      link.href = dataUrl;
      link.click();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF2E63', '#FFD54F', '#2979FF'],
      });
    } catch (err) {
      console.error('Failed to download photocard', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Calculate spectrum bar positions (0 to 100%)
  const maxDimVal = Math.max(
    dimensions.reliability,
    dimensions.gentleness,
    dimensions.contrast,
    dimensions.chemistry,
    dimensions.mystery,
    dimensions.playfulness,
    1
  );

  const getSpectrumPercent = (val: number) => {
    const raw = Math.round((val / maxDimVal) * 80) + 15;
    return Math.min(94, Math.max(16, raw));
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-[#18181B] flex flex-col items-center justify-between p-3 sm:p-5 selection:bg-[#FF2E63] selection:text-white font-sans relative overflow-x-hidden">
      {/* Background Street Doodles & Dotted Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(#FF2E63 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Floating Header */}
      <header className="w-full max-w-md flex items-center justify-between py-2 z-10">
        <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-[#18181B]">
          <span className="text-[#FF2E63]">✦</span>
          <span>CORTIS 心動雷達</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              setIsGalleryOpen(true);
            }}
            className="px-2.5 py-1 text-xs font-black bg-white rounded-xl border-2 border-[#18181B] shadow-[2px_2px_0px_#18181B] hover:bg-pink-50 flex items-center gap-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <Users className="w-3.5 h-3.5 text-[#FF2E63]" />
            <span>成員圖鑑</span>
          </button>
          <button
            onClick={toggleSound}
            className="p-1.5 bg-white rounded-xl border-2 border-[#18181B] shadow-[2px_2px_0px_#18181B] hover:bg-pink-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            title={isSoundMuted ? '開啟音效' : '靜音'}
            aria-label={isSoundMuted ? '開啟音效' : '靜音'}
          >
            {isSoundMuted ? (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#FF2E63]" />
            )}
          </button>
        </div>
      </header>

      {/* Main Container Card */}
      <main className="w-full max-w-md bg-white rounded-3xl border-2 border-[#18181B] shadow-[4px_4px_0px_#18181B] overflow-hidden p-5 sm:p-6 relative my-auto z-10">
        {/* ================= COVER 封面頁 ================= */}
        {stage === 'cover' && (
          <div className="text-center space-y-5">
            {/* Badges */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="inline-block bg-[#FFD54F] px-3.5 py-1.5 rounded-full border-2 border-[#18181B] text-xs font-black shadow-[2px_2px_0px_#18181B] rotate-[-2deg]">
                CORTIS STAGE QUIZ ★
              </span>
              <span className="inline-block bg-[#FF80AB] text-white px-3.5 py-1.5 rounded-full border-2 border-[#18181B] text-xs font-black shadow-[2px_2px_0px_#18181B] rotate-[2deg]">
                LIVE ON STAGE ♡
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[#18181B]">
                《猜猜你的 CORTIS 擔是誰？》
              </h1>
              <p className="text-sm text-zinc-700 font-bold">
                「10 個問題，看看最後會被誰悄悄拐走。」
              </p>
            </div>

            {/* Central Stage Hand-Drawn / Street Cover Illustration */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#18181B] shadow-[3px_3px_0px_#18181B] aspect-[16/10] bg-pink-100 group">
              <img
                src="/assets/aistudio/unnamed_95470072.jpg"
                alt="CORTIS 全員合照封面"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#18181B]/85 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-0.5 rounded-md border border-white/20">
                ★ CORTIS STAGE QUIZ · LIVE ON STAGE
              </div>
            </div>

            {/* Sub-quote Tag with Sparkles */}
            <div className="p-3 bg-[#FFF5F8] rounded-2xl border-2 border-[#18181B] flex items-center justify-center gap-2 shadow-[2px_2px_0px_#18181B]">
              <Sparkles className="text-[#FF2E63] w-4 h-4 animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wide text-[#FF2E63]">
                Color Outside The Lines
              </span>
              <Heart className="text-[#2979FF] w-4 h-4 animate-bounce shrink-0" />
            </div>

            {/* Start Button */}
            <button
              onClick={startQuiz}
              className="w-full py-4 bg-[#FF2E63] text-white font-black rounded-2xl border-2 border-[#18181B] shadow-[3px_3px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 text-base sm:text-lg transition-transform cursor-pointer hover:bg-[#E02656]"
            >
              <span>開始測驗 →</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Disclaimer */}
            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
              ＊純娛樂性質｜以粉絲視角設計的角色原型，不代表真人性格診斷。
            </p>
          </div>
        )}

        {/* ================= QUIZ 測驗頁 ================= */}
        {stage === 'quiz' && (
          <div className="space-y-4 sm:space-y-5">
            {/* Progress Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentIdx > 0 && (
                  <button
                    onClick={handlePrev}
                    className="px-2 py-1 rounded-xl border border-[#18181B] text-xs font-black bg-white hover:bg-zinc-100 flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
                    title="上一題"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>上一題</span>
                  </button>
                )}
                <span className="text-xs font-black bg-[#FFD54F] px-3 py-1 rounded-full border border-[#18181B]">
                  第 {currentIdx + 1} / {QUESTIONS.length} 題
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-28 sm:w-32 bg-zinc-200 h-2.5 rounded-full overflow-hidden border border-[#18181B]">
                <div
                  className="bg-[#FF2E63] h-full transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Prompt Card */}
            <div className="p-4 bg-[#FFF5F8] rounded-2xl border-2 border-[#18181B] shadow-[2px_2px_0px_#18181B]">
              <h2 className="font-black text-base sm:text-lg leading-snug text-[#18181B]">
                {QUESTIONS[currentIdx].prompt}
              </h2>
            </div>

            {/* 5 Option Cards */}
            <div className="space-y-2.5">
              {QUESTIONS[currentIdx].options.map((opt, i) => {
                const isSelected = selectedOpt === i;
                return (
                  <button
                    key={opt.letter}
                    onClick={() => chooseOption(i)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFEEF3] border-[#FF2E63] shadow-[2px_2px_0px_#FF2E63] scale-[1.01]'
                        : 'bg-white border-[#18181B] shadow-[2px_2px_0px_#18181B] hover:bg-zinc-50'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 border-2 border-[#18181B] ${
                        isSelected
                          ? 'bg-[#FF2E63] text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-800'
                      }`}
                    >
                      {opt.letter}
                    </span>
                    <span
                      className={`text-sm leading-snug pt-0.5 ${
                        isSelected ? 'font-black text-[#18181B]' : 'font-medium text-zinc-800'
                      }`}
                    >
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              disabled={selectedOpt === null}
              onClick={handleNext}
              className={`w-full py-3.5 font-black rounded-2xl border-2 border-[#18181B] flex items-center justify-center gap-2 transition-all cursor-pointer text-sm sm:text-base ${
                selectedOpt === null
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border-zinc-300'
                  : 'bg-[#FF2E63] text-white shadow-[3px_3px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 hover:bg-[#E02656]'
              }`}
            >
              <span>
                {currentIdx < QUESTIONS.length - 1 ? '下一題 →' : '查看心動結果 →'}
              </span>
            </button>
          </div>
        )}

        {/* ================= LOADING 雷達掃描頁 ================= */}
        {stage === 'loading' && (
          <div className="py-16 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-[#FF2E63] border-t-transparent rounded-full animate-spin" />
              <Heart className="w-10 h-10 text-[#FF2E63] animate-bounce" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-black text-lg sm:text-xl text-[#18181B]">
                正在讀取你的心動雷達……
              </h3>
              <p className="text-xs text-zinc-500 font-bold">
                解析你的可靠感、反差萌、秘密高牆與靈魂默契比例
              </p>
            </div>
          </div>
        )}

        {/* ================= RESULT 結果頁 ================= */}
        {stage === 'result' && (
          <div className="space-y-4 text-center">
            {/* Header Stamp */}
            <div className="inline-block bg-[#FFD54F] px-4 py-1.5 rounded-full border-2 border-[#18181B] text-xs font-black rotate-[-2deg] shadow-[2px_2px_0px_#18181B]">
              ★ 答案揭曉 ★
            </div>

            {/* 雙擔判定 (Dual Bias Warning) */}
            {isDualBias && (
              <div className="bg-[#FFF8F0] border-2 border-[#FF9100] rounded-2xl p-3 text-left text-xs text-[#18181B] space-y-1 shadow-[2px_2px_0px_#FF9100]">
                <div className="font-black text-[#E65100] flex items-center gap-1.5 text-sm">
                  <Heart className="w-4 h-4 text-[#FF5722] fill-[#FF5722]" />
                  <span>你有明顯的雙擔傾向。</span>
                </div>
                <div className="font-bold text-zinc-800">
                  主擔：<strong>{primary.chineseName} ({primary.englishName})</strong>
                  <span className="mx-1.5 text-zinc-400">/</span>
                  危險對象：<strong>{runnerUp.chineseName} ({runnerUp.englishName})</strong>
                </div>
                <p className="italic text-zinc-600 font-medium pt-0.5">
                  「你的心好像沒有打算只選一個。」
                </p>
              </div>
            )}

            {/* 第一名主擔卡片 */}
            <div className="border-2 border-[#18181B] rounded-2xl p-5 bg-[#FFF5F8] shadow-[3px_3px_0px_#18181B] space-y-3.5 text-left relative overflow-hidden">
              {/* Member Photo Card Portrait */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-[#18181B] shadow-[2px_2px_0px_#18181B] bg-white group">
                <img
                  src={primary.image}
                  alt={primary.chineseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/95 px-2.5 py-1 rounded-full border border-[#18181B] text-[11px] font-black shadow-xs">
                  {primary.themeTag}
                </div>
                <div className="absolute bottom-2 left-2 bg-[#18181B]/85 text-white px-2.5 py-1 rounded-lg text-xs font-black backdrop-blur-xs">
                  ★ CORTIS STAGE BIAS
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-zinc-500 uppercase tracking-wider">
                  你的 CORTIS 擔是——
                </p>
                <div className="flex items-baseline justify-between mt-0.5">
                  <h2 className="text-2xl sm:text-3xl font-black" style={{ color: primary.color }}>
                    {primary.chineseName} ({primary.englishName})
                  </h2>
                </div>
                <div
                  className="inline-block px-3 py-1 rounded-full border-2 border-[#18181B] text-xs font-black mt-2 shadow-[1px_1px_0px_#18181B]"
                  style={{ backgroundColor: primary.badgeBg }}
                >
                  {primary.title}
                </div>
              </div>

              {/* Quote Block */}
              <blockquote className="p-3 bg-white rounded-xl border border-zinc-300 text-xs text-zinc-700 font-semibold italic leading-relaxed">
                {primary.quote}
              </blockquote>

              {/* Archetype Descriptions */}
              <p className="text-sm font-black text-[#18181B] leading-relaxed">
                {primary.summary}
              </p>

              <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                {primary.details}
              </p>

              <div className="p-3 bg-white/90 rounded-xl border border-pink-200 text-xs font-bold text-pink-700 leading-relaxed">
                {primary.endingNote}
              </div>

              {/* Dynamic Persona Nuance */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900 leading-relaxed font-bold">
                {dynamicNuance}
              </div>
            </div>

            {/* 第二名 Runner-up Block */}
            <div className="p-3 bg-white rounded-2xl border-2 border-[#18181B] text-left text-xs shadow-[2px_2px_0px_#18181B] flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#18181B] shrink-0 bg-zinc-100">
                <img
                  src={runnerUp.image}
                  alt={runnerUp.chineseName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-zinc-500 font-bold text-[11px]">差一點就被他拐走：</div>
                <strong className="text-zinc-900 font-black text-sm">
                  {runnerUp.chineseName} ({runnerUp.englishName})
                </strong>
                <span className="text-zinc-600 block text-[11px] truncate">
                  · {runnerUp.title}
                </span>
              </div>
            </div>

            {/* ================= CORTIS 心動光譜 ================= */}
            <div className="border-2 border-[#18181B] rounded-2xl p-4 bg-white shadow-[2px_2px_0px_#18181B] text-left space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200">
                <span className="text-xs font-black text-[#18181B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF2E63]" />
                  <span>你的 CORTIS 心動光譜</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-bold">動態雷達分佈</span>
              </div>

              {/* Spectrum Bars */}
              <div className="space-y-2 text-xs font-bold text-zinc-700 pt-1">
                {[
                  { label: '可靠感', val: dimensions.reliability, color: '#FF2E63' },
                  { label: '溫柔感', val: dimensions.gentleness, color: '#FF9100' },
                  { label: '反差感', val: dimensions.contrast, color: '#7C4DFF' },
                  { label: '默契感', val: dimensions.chemistry, color: '#2979FF' },
                  { label: '神秘感', val: dimensions.mystery, color: '#00B0FF' },
                  { label: '玩心', val: dimensions.playfulness, color: '#10B981' },
                ].map((item) => {
                  const percent = getSpectrumPercent(item.val);
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-12 text-[11px] font-black shrink-0 text-zinc-800">
                        {item.label}
                      </span>
                      <div className="flex-1 relative h-3 bg-zinc-100 rounded-full border border-zinc-300 overflow-hidden flex items-center px-1">
                        <div className="w-full h-0.5 bg-zinc-300" />
                        <div
                          className="absolute w-2.5 h-2.5 rounded-full border border-[#18181B] shadow-xs transform -translate-x-1/2 transition-all duration-500"
                          style={{
                            left: `${percent}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions: Download Photocard, Share, Copy, Restart */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleDownloadCard}
                disabled={isDownloading}
                className="w-full py-3.5 bg-[#FFD54F] text-[#18181B] border-2 border-[#18181B] rounded-2xl font-black text-sm shadow-[3px_3px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#FFCA28] transition-all disabled:opacity-75 disabled:cursor-wait"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#18181B]" />
                    <span>小卡繪製下載中...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#18181B]" />
                    <span>下載專屬命定拍立得小卡 (PNG)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="w-full py-3.5 bg-[#FF2E63] text-white border-2 border-[#18181B] rounded-2xl font-black text-sm shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#E02656]"
              >
                <Share2 className="w-4 h-4" />
                <span>分享我的結果</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-3 bg-white text-[#18181B] border-2 border-[#18181B] rounded-2xl font-black text-xs sm:text-sm shadow-[2px_2px_0px_#18181B] flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer hover:bg-zinc-50"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copied ? '已複製結果！' : '複製文字結果'}</span>
                </button>

                <button
                  onClick={startQuiz}
                  className="flex-1 py-3 bg-white text-[#18181B] border-2 border-[#18181B] rounded-2xl font-black text-xs sm:text-sm shadow-[2px_2px_0px_#18181B] flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer hover:bg-zinc-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>再測一次</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md py-4 text-center text-xs text-zinc-500 font-semibold z-10 space-y-0.5">
        <p>Fan-made interactive quiz</p>
        <p className="text-[11px] text-[#FF2E63]">Made for fun ♡</p>
      </footer>

      {/* Member Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#18181B] shadow-[4px_4px_0px_#18181B] p-5 max-h-[88vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF2E63]" />
                <h3 className="font-black text-base text-[#18181B]">
                  CORTIS 全員角色原型檔案
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.playPop();
                  setIsGalleryOpen(false);
                }}
                className="p-1 rounded-xl border border-[#18181B] hover:bg-zinc-100 cursor-pointer"
                aria-label="關閉圖鑑"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 overflow-y-auto space-y-3 flex-1 pr-1">
              {MEMBER_LIST.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-2xl border-2 border-[#18181B] bg-[#FFF5F8] shadow-[2px_2px_0px_#18181B] flex gap-3 items-center"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#18181B] shrink-0 bg-white">
                    <img
                      src={m.image}
                      alt={m.chineseName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-sm text-[#18181B]">
                        {m.chineseName} ({m.englishName})
                      </h4>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full border border-[#18181B]" style={{ backgroundColor: m.badgeBg }}>
                        {m.themeTag}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#FF2E63] mt-0.5">
                      {m.title}
                    </p>
                    <p className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5 italic">
                      {m.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playPop();
                setIsGalleryOpen(false);
              }}
              className="w-full py-2.5 bg-[#FFD54F] text-[#18181B] font-black rounded-xl border-2 border-[#18181B] shadow-[2px_2px_0px_#18181B] text-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5 hover:bg-[#FFCA28]"
            >
              關閉成員檔案
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
