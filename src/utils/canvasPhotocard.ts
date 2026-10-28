import { Member } from '../types';

export async function generatePhotocardImage(member: Member): Promise<string> {
  const canvas = document.createElement('canvas');
  const width = 1080;
  const height = 1540;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // 1. Background - Street Cute Pastel Pink
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFF0F5');
  bgGrad.addColorStop(1, '#FFDCE6');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Halftone Dot Grid
  ctx.fillStyle = 'rgba(255, 46, 99, 0.12)';
  const dotSpacing = 36;
  for (let x = 20; x < width; x += dotSpacing) {
    for (let y = 20; y < height; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Card Base - Neo-Brutalist Frame
  const cardMargin = 50;
  const cardW = width - cardMargin * 2;
  const cardH = height - cardMargin * 2;

  // Solid Offset Shadow
  ctx.fillStyle = '#18181B';
  ctx.beginPath();
  ctx.roundRect(cardMargin + 12, cardMargin + 12, cardW, cardH, 36);
  ctx.fill();

  // White Card Surface
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(cardMargin, cardMargin, cardW, cardH, 36);
  ctx.fill();

  // Outer Border
  ctx.strokeStyle = '#18181B';
  ctx.lineWidth = 6;
  ctx.stroke();

  // 4. Header Bar
  ctx.fillStyle = '#FFD54F';
  ctx.beginPath();
  ctx.roundRect(cardMargin + 24, cardMargin + 24, cardW - 48, 76, 20);
  ctx.fill();
  ctx.strokeStyle = '#18181B';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#18181B';
  ctx.font = '900 30px "Noto Sans TC", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('★ CORTIS STAGE QUIZ · 命定小卡', cardMargin + 48, cardMargin + 62);

  ctx.font = '800 24px "Noto Sans TC", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('LIVE ON STAGE ♡', cardMargin + cardW - 48, cardMargin + 62);

  // 5. Member Photo Image
  const imgY = cardMargin + 120;
  const imgH = 780;
  const imgW = cardW - 60;
  const imgX = cardMargin + 30;

  try {
    const memberImg = await loadImage(member.image);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgW, imgH, 28);
    ctx.clip();

    const imgRatio = memberImg.width / memberImg.height;
    const boxRatio = imgW / imgH;
    let sW, sH, sX, sY;

    if (imgRatio > boxRatio) {
      sH = memberImg.height;
      sW = memberImg.height * boxRatio;
      sX = (memberImg.width - sW) / 2;
      sY = 0;
    } else {
      sW = memberImg.width;
      sH = memberImg.width / boxRatio;
      sX = 0;
      sY = (memberImg.height - sH) / 2;
    }

    ctx.drawImage(memberImg, sX, sY, sW, sH, imgX, imgY, imgW, imgH);

    // Scrim at bottom of image for text readability
    const scrim = ctx.createLinearGradient(imgX, imgY + imgH - 220, imgX, imgY + imgH);
    scrim.addColorStop(0, 'rgba(0,0,0,0)');
    scrim.addColorStop(1, 'rgba(24,24,27,0.88)');
    ctx.fillStyle = scrim;
    ctx.fillRect(imgX, imgY + imgH - 220, imgW, 220);

    ctx.restore();

    ctx.strokeStyle = '#18181B';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgW, imgH, 28);
    ctx.stroke();

    // Name on photo
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 68px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${member.chineseName} (${member.englishName})`, imgX + 32, imgY + imgH - 50);

    ctx.fillStyle = '#FFD54F';
    ctx.font = '700 26px "Noto Sans TC", sans-serif';
    ctx.fillText(member.title, imgX + 34, imgY + imgH - 120);

  } catch {
    ctx.fillStyle = '#FFF5F8';
    ctx.beginPath();
    ctx.roundRect(imgX, imgY, imgW, imgH, 28);
    ctx.fill();
    ctx.strokeStyle = '#18181B';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.fillStyle = '#FF2E63';
    ctx.font = '900 48px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(member.chineseName, imgX + imgW / 2, imgY + imgH / 2);
  }

  // 6. Fan Info & Quote Strip
  const infoY = imgY + imgH + 36;
  const infoH = 175;
  ctx.fillStyle = '#FFF5F8';
  ctx.beginPath();
  ctx.roundRect(cardMargin + 30, infoY, cardW - 60, infoH, 24);
  ctx.fill();
  ctx.strokeStyle = '#18181B';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#FF2E63';
  ctx.font = '900 24px "Noto Sans TC", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('✦ 你的 CORTIS 命定本命：', cardMargin + 54, infoY + 22);

  ctx.fillStyle = '#18181B';
  ctx.font = '700 22px "Noto Sans TC", sans-serif';
  drawWrappedText(ctx, member.summary, cardMargin + 54, infoY + 62, cardW - 108, 30, 2);

  ctx.fillStyle = '#555555';
  ctx.font = 'italic 600 20px "Noto Sans TC", sans-serif';
  drawWrappedText(ctx, member.quote, cardMargin + 54, infoY + 128, cardW - 108, 26, 1);

  // 7. Footer - Barcode & Slogan
  const footerY = infoY + infoH + 32;
  drawBarcode(ctx, cardMargin + 48, footerY, 260, 42);

  ctx.fillStyle = '#18181B';
  ctx.font = '900 22px "Noto Sans TC", sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('Color Outside The Lines ♡ CORTIS', cardMargin + cardW - 48, footerY + 22);

  return canvas.toDataURL('image/png');
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (src.startsWith('http://') || src.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Retry once without crossOrigin
      const fallback = new Image();
      fallback.onload = () => resolve(fallback);
      fallback.onerror = (e) => reject(e);
      fallback.src = src;
    };
    img.src = src;
  });
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 2
) {
  let line = '';
  let lineCount = 0;
  let currentY = y;

  for (let n = 0; n < text.length; n++) {
    const testLine = line + text[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      if (lineCount + 1 >= maxLines) {
        ctx.fillText(line + '...', x, currentY);
        return;
      }
      ctx.fillText(line, x, currentY);
      line = text[n];
      currentY += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

function drawBarcode(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = '#18181B';
  let curX = x;
  const bars = [3, 1, 4, 2, 1, 5, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 5, 1, 3, 2];
  for (let i = 0; i < bars.length && curX < x + w; i++) {
    const barW = bars[i] * 2.2;
    if (i % 2 === 0) {
      ctx.fillRect(curX, y, barW, h);
    }
    curX += barW + 3;
  }
}
