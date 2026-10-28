import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: '第一次認識一個人，你最容易注意到什麼？',
    options: [
      {
        letter: 'A',
        text: '「他明明沒說什麼，卻一直在照顧別人。」',
        scores: { martin: 5, james: 2, juhoon: 2, seonghyeon: 2, keonho: 1 },
        dimensions: { gentleness: 5, reliability: 3, chemistry: 2 },
      },
      {
        letter: 'B',
        text: '「他安靜待在自己的世界裡，反而讓你很好奇。」',
        scores: { juhoon: 5, keonho: 3, seonghyeon: 2, martin: 1, james: 1 },
        dimensions: { mystery: 5, contrast: 2, gentleness: 2 },
      },
      {
        letter: 'C',
        text: '「他好像很在乎身邊人的感受。」',
        scores: { martin: 5, juhoon: 3, james: 2, keonho: 1, seonghyeon: 1 },
        dimensions: { gentleness: 5, chemistry: 3 },
      },
      {
        letter: 'D',
        text: '「他看起來很有自己的規則和標準。」',
        scores: { seonghyeon: 5, james: 3, keonho: 2, juhoon: 1, martin: 1 },
        dimensions: { reliability: 4, contrast: 3 },
      },
      {
        letter: 'E',
        text: '「他明明一直在搞笑，卻有一種說不出的距離感。」',
        scores: { keonho: 5, james: 2, seonghyeon: 2, juhoon: 2, martin: 1 },
        dimensions: { playfulness: 4, mystery: 4, contrast: 3 },
      },
    ],
  },
  {
    id: 2,
    prompt: '後來發現一個人跟第一印象完全不一樣，你會覺得？',
    options: [
      {
        letter: 'A',
        text: '「原來他其實比想像中還要瘋。」',
        scores: { james: 5, keonho: 3, seonghyeon: 2, martin: 1, juhoon: 1 },
        dimensions: { contrast: 5, playfulness: 4 },
      },
      {
        letter: 'B',
        text: '「原來他只是安靜，不是真的乖。」',
        scores: { juhoon: 5, seonghyeon: 3, keonho: 2, james: 1, martin: 1 },
        dimensions: { contrast: 4, mystery: 3, playfulness: 2 },
      },
      {
        letter: 'C',
        text: '「原來他一直默默注意著身邊的人。」',
        scores: { martin: 5, juhoon: 3, james: 2, seonghyeon: 1, keonho: 1 },
        dimensions: { gentleness: 5, chemistry: 3 },
      },
      {
        letter: 'D',
        text: '「原來他對很多小細節都有自己的堅持。」',
        scores: { seonghyeon: 5, james: 3, juhoon: 2, martin: 1, keonho: 1 },
        dimensions: { reliability: 4, contrast: 3 },
      },
      {
        letter: 'E',
        text: '「原來他的笑鬧背後，其實藏著很多自己的世界。」',
        scores: { keonho: 5, juhoon: 3, james: 2, martin: 1, seonghyeon: 1 },
        dimensions: { mystery: 5, contrast: 4 },
      },
    ],
  },
  {
    id: 3,
    prompt: '朋友今天看起來心情很差，你會希望他怎麼被對待？',
    options: [
      {
        letter: 'A',
        text: '「有人直接陪著他，把事情一起處理掉。」',
        scores: { james: 5, seonghyeon: 2, martin: 2, keonho: 2, juhoon: 1 },
        dimensions: { reliability: 5, chemistry: 2 },
      },
      {
        letter: 'B',
        text: '「不逼他說話，但默默陪著。」',
        scores: { juhoon: 5, martin: 3, keonho: 2, seonghyeon: 1, james: 1 },
        dimensions: { gentleness: 4, mystery: 3 },
      },
      {
        letter: 'C',
        text: '「有一個很溫柔的人先注意到他的情緒。」',
        scores: { martin: 5, juhoon: 3, james: 2, seonghyeon: 1, keonho: 1 },
        dimensions: { gentleness: 5, chemistry: 3 },
      },
      {
        letter: 'D',
        text: '「有人仔細觀察，找到真正讓他不舒服的地方。」',
        scores: { seonghyeon: 5, juhoon: 3, james: 2, martin: 1, keonho: 1 },
        dimensions: { chemistry: 4, reliability: 3 },
      },
      {
        letter: 'E',
        text: '「先陪他玩、讓他放鬆，之後再悄悄關心。」',
        scores: { keonho: 5, martin: 2, james: 2, juhoon: 1, seonghyeon: 2 },
        dimensions: { playfulness: 5, gentleness: 2 },
      },
    ],
  },
  {
    id: 4,
    prompt: '如果你們一起完成一件很重要的事情，你最喜歡哪種搭檔？',
    options: [
      {
        letter: 'A',
        text: '「說到做到，遇到問題會直接扛起來。」',
        scores: { james: 5, seonghyeon: 3, martin: 2, keonho: 1, juhoon: 1 },
        dimensions: { reliability: 5, chemistry: 2 },
      },
      {
        letter: 'B',
        text: '「安靜地把事情做好，偶爾突然皮一下。」',
        scores: { juhoon: 5, seonghyeon: 2, keonho: 3, james: 1, martin: 1 },
        dimensions: { contrast: 3, mystery: 3, playfulness: 3 },
      },
      {
        letter: 'C',
        text: '「很在乎每個人的狀態，不希望有人被落下。」',
        scores: { martin: 5, james: 2, juhoon: 2, keonho: 2, seonghyeon: 1 },
        dimensions: { gentleness: 5, reliability: 3 },
      },
      {
        letter: 'D',
        text: '「有明確標準，連小細節都不放過。」',
        scores: { seonghyeon: 5, james: 3, juhoon: 1, keonho: 2, martin: 1 },
        dimensions: { reliability: 4, contrast: 3 },
      },
      {
        letter: 'E',
        text: '「表面一直鬧，真正重要的時候卻很可靠。」',
        scores: { keonho: 4, james: 4, seonghyeon: 2, martin: 1, juhoon: 1 },
        dimensions: { contrast: 5, reliability: 3, playfulness: 3 },
      },
    ],
  },
  {
    id: 5,
    prompt: '你覺得跟一個人最容易聊到停不下來的是？',
    options: [
      {
        letter: 'A',
        text: '「聊人生、夢想、未來。」',
        scores: { james: 4, juhoon: 3, martin: 3, seonghyeon: 3, keonho: 1 },
        dimensions: { chemistry: 5, reliability: 2 },
      },
      {
        letter: 'B',
        text: '「聊一些只有你們兩個才懂的事情。」',
        scores: { juhoon: 4, seonghyeon: 4, keonho: 3, martin: 2, james: 1 },
        dimensions: { chemistry: 4, mystery: 4 },
      },
      {
        letter: 'C',
        text: '「從一個很蠢的話題一路笑到停不下來。」',
        scores: { martin: 4, keonho: 4, james: 3, seonghyeon: 2, juhoon: 1 },
        dimensions: { playfulness: 5, chemistry: 3 },
      },
      {
        letter: 'D',
        text: '「突然聊到一個很奇怪的想法，然後越聊越有趣。」',
        scores: { seonghyeon: 4, juhoon: 4, keonho: 3, james: 2, martin: 1 },
        dimensions: { contrast: 4, mystery: 3 },
      },
      {
        letter: 'E',
        text: '「表面上一直互嘴，其實慢慢發現彼此很懂對方。」',
        scores: { keonho: 4, seonghyeon: 3, james: 3, juhoon: 2, martin: 2 },
        dimensions: { chemistry: 5, contrast: 4 },
      },
    ],
  },
  {
    id: 6,
    prompt: '如果一個平常很會鬧的人突然安靜下來，你會怎麼想？',
    options: [
      {
        letter: 'A',
        text: '「他是不是其實自己扛了很多？」',
        scores: { james: 5, martin: 3, keonho: 2, juhoon: 1, seonghyeon: 1 },
        dimensions: { reliability: 4, gentleness: 3 },
      },
      {
        letter: 'B',
        text: '「他可能只是想待在自己的世界裡。」',
        scores: { juhoon: 5, keonho: 3, seonghyeon: 2, james: 1, martin: 1 },
        dimensions: { mystery: 5, gentleness: 2 },
      },
      {
        letter: 'C',
        text: '「他是不是在想別人的事情？」',
        scores: { martin: 5, juhoon: 2, james: 2, seonghyeon: 1, keonho: 2 },
        dimensions: { gentleness: 5, chemistry: 2 },
      },
      {
        letter: 'D',
        text: '「是不是有什麼地方讓他覺得不舒服？」',
        scores: { seonghyeon: 5, martin: 2, juhoon: 2, james: 2, keonho: 1 },
        dimensions: { chemistry: 4, reliability: 3 },
      },
      {
        letter: 'E',
        text: '「他看起來沒事，但我總覺得他沒有全部說出來。」',
        scores: { keonho: 5, juhoon: 3, james: 2, seonghyeon: 2, martin: 1 },
        dimensions: { mystery: 5, contrast: 3 },
      },
    ],
  },
  {
    id: 7,
    prompt: '哪一個瞬間最容易讓你心動？',
    options: [
      {
        letter: 'A',
        text: '「他沒說什麼，卻已經把你需要的東西準備好了。」',
        scores: { james: 5, juhoon: 3, martin: 2, seonghyeon: 2, keonho: 1 },
        dimensions: { reliability: 5, gentleness: 3 },
      },
      {
        letter: 'B',
        text: '「他記得你很久以前隨口說過的小事。」',
        scores: { juhoon: 5, martin: 3, seonghyeon: 2, james: 1, keonho: 1 },
        dimensions: { chemistry: 5, gentleness: 4 },
      },
      {
        letter: 'C',
        text: '「他真的很在乎你的感受，而且不是嘴上說說。」',
        scores: { martin: 5, james: 3, juhoon: 2, seonghyeon: 1, keonho: 1 },
        dimensions: { gentleness: 5, reliability: 3 },
      },
      {
        letter: 'D',
        text: '「他只在很熟的人面前露出完全不同的一面。」',
        scores: { seonghyeon: 5, keonho: 4, juhoon: 2, james: 1, martin: 1 },
        dimensions: { contrast: 5, mystery: 3 },
      },
      {
        letter: 'E',
        text: '「你們明明一直在互嘴，某一刻卻突然很有默契。」',
        scores: { keonho: 5, james: 3, seonghyeon: 3, juhoon: 1, martin: 1 },
        dimensions: { chemistry: 5, playfulness: 4 },
      },
    ],
  },
  {
    id: 8,
    prompt: '如果跟喜歡的人一起旅行，你最想要哪種感覺？',
    options: [
      {
        letter: 'A',
        text: '「行程亂一點沒關係，但有人會照顧大家。」',
        scores: { james: 5, martin: 3, seonghyeon: 2, keonho: 1, juhoon: 1 },
        dimensions: { reliability: 5, gentleness: 2 },
      },
      {
        letter: 'B',
        text: '「慢慢走，聊一些只有彼此才懂的事情。」',
        scores: { juhoon: 5, martin: 2, seonghyeon: 3, keonho: 2, james: 1 },
        dimensions: { chemistry: 4, mystery: 4 },
      },
      {
        letter: 'C',
        text: '「一路注意大家開不開心，有人累了也會發現。」',
        scores: { martin: 5, juhoon: 2, james: 2, keonho: 2, seonghyeon: 1 },
        dimensions: { gentleness: 5, chemistry: 3 },
      },
      {
        letter: 'D',
        text: '「不一定照計畫走，但重要的小細節不能亂。」',
        scores: { seonghyeon: 5, james: 3, juhoon: 1, keonho: 2, martin: 1 },
        dimensions: { reliability: 4, contrast: 3 },
      },
      {
        letter: 'E',
        text: '「表面玩得超瘋，私底下卻有只有你們懂的小暗號。」',
        scores: { keonho: 5, seonghyeon: 3, james: 2, juhoon: 1, martin: 1 },
        dimensions: { playfulness: 4, chemistry: 4, contrast: 3 },
      },
    ],
  },
  {
    id: 9,
    prompt: '如果他遇到挫折，你最想對他說什麼？',
    options: [
      {
        letter: 'A',
        text: '「你不用一個人扛。」',
        scores: { james: 5, martin: 3, keonho: 2, juhoon: 1, seonghyeon: 1 },
        dimensions: { reliability: 4, gentleness: 4 },
      },
      {
        letter: 'B',
        text: '「你想說的時候，我會聽。」',
        scores: { juhoon: 5, martin: 3, keonho: 2, seonghyeon: 1, james: 1 },
        dimensions: { gentleness: 5, mystery: 3 },
      },
      {
        letter: 'C',
        text: '「你不用一直顧慮別人的感受，也可以照顧自己。」',
        scores: { martin: 5, james: 2, juhoon: 2, seonghyeon: 2, keonho: 1 },
        dimensions: { gentleness: 5, chemistry: 3 },
      },
      {
        letter: 'D',
        text: '「我知道你可能很在意，但我們可以慢慢處理。」',
        scores: { seonghyeon: 5, james: 3, juhoon: 2, martin: 1, keonho: 1 },
        dimensions: { reliability: 4, chemistry: 3 },
      },
      {
        letter: 'E',
        text: '「你現在不想說也沒關係，我還是在。」',
        scores: { keonho: 5, juhoon: 3, martin: 2, james: 1, seonghyeon: 1 },
        dimensions: { gentleness: 4, mystery: 4 },
      },
    ],
  },
  {
    id: 10,
    prompt: '如果你真的喜歡上一個人，最後讓你留下來的會是？',
    options: [
      {
        letter: 'A',
        text: '「他總是在不知不覺中保護著身邊的人。」',
        scores: { james: 5, martin: 3, juhoon: 2, seonghyeon: 1, keonho: 1 },
        dimensions: { reliability: 5, gentleness: 3 },
      },
      {
        letter: 'B',
        text: '「有一天他突然說：『我其實一直有注意到。』」',
        scores: { juhoon: 5, martin: 2, seonghyeon: 2, keonho: 2, james: 1 },
        dimensions: { chemistry: 5, mystery: 3 },
      },
      {
        letter: 'C',
        text: '「你開始期待每天跟他一起笑、一起分享小事。」',
        scores: { martin: 5, keonho: 3, james: 2, juhoon: 1, seonghyeon: 1 },
        dimensions: { playfulness: 4, chemistry: 4, gentleness: 3 },
      },
      {
        letter: 'D',
        text: '「他只讓你看到別人看不到的那一面。」',
        scores: { seonghyeon: 5, keonho: 3, juhoon: 2, james: 2, martin: 0 },
        dimensions: { contrast: 5, mystery: 4 },
      },
      {
        letter: 'E',
        text: '「你慢慢發現，原來你們的默契比想像中還深。」',
        scores: { keonho: 4, seonghyeon: 4, james: 3, juhoon: 3, martin: 2 },
        dimensions: { chemistry: 5, contrast: 3 },
      },
    ],
  },
];
