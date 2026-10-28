import { MemberId, HiddenDimensions } from '../types';

export function getDynamicNuance(
  primaryId: MemberId,
  runnerUpId: MemberId,
  dimensions: HiddenDimensions
): string {
  // Find top hidden dimension
  const sortedDims = (Object.entries(dimensions) as [keyof HiddenDimensions, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const topDim = sortedDims[0]?.[0] || 'reliability';

  switch (primaryId) {
    case 'james':
      if (topDim === 'mystery' || topDim === 'contrast') {
        return '【心動切片】你明明崇尚踏實可靠的人，卻偏偏會被他看似無厘頭搞笑、私底下比誰都清醒的反差感深深吸引。';
      }
      if (topDim === 'gentleness' || topDim === 'chemistry') {
        return '【心動切片】比起甜言蜜語，你最招架不住的是他在關鍵時刻默默替你扛下所有問題時，那份笨拙卻極度真摯的保護欲。';
      }
      return '【心動切片】你容易被那種「既然負責了就要把它做到最好」的強烈擔當感打動，在他身邊總能獲得滿滿的安全感。';

    case 'juhoon':
      if (topDim === 'contrast' || topDim === 'playfulness') {
        return '【心動切片】你原以為他是安靜無害的溫順少年，卻在不經意捕捉到他嘴角那抹偷偷使壞的狡黠笑意時，心跳徹底漏了一拍。';
      }
      if (topDim === 'chemistry') {
        return '【心動切片】你渴望精神上的深度默契，那種哪怕兩人都不說話、只是靜靜共享一副耳機也無比舒適的靈魂共振，正是他最致命的魅力。';
      }
      return '【心動切片】他不常將關心宣之於口，但他永遠記得你隨口提過的喜好，這種無聲而綿密的細節關注最讓你淪陷。';

    case 'martin':
      if (topDim === 'chemistry' || topDim === 'gentleness') {
        return '【心動切片】你真正渴望的不是一直喧鬧，而是在大家都在狂歡時，他是全場第一個回頭看你有沒有累到的那個人。';
      }
      if (topDim === 'contrast') {
        return '【心動切片】平時總是習慣照顧每個人情緒的他，在偶爾向你露出想被摸摸頭的小脆弱時，會徹底激發你想要珍惜他的心。';
      }
      return '【心動切片】他的愛就像冬天熱呼呼的烘焙香氣，真誠、溫暖又沒有負擔，讓你明白「被好好放在心上」是多麼幸福的事。';

    case 'seonghyeon':
      if (topDim === 'contrast' || topDim === 'playfulness') {
        return '【心動切片】在外人面前永遠端莊冷靜有秩序的他，唯獨在面對你時會放下所有標準、毫無包袱地搞笑耍賴，這種「熟人限定」最令人心動。';
      }
      if (topDim === 'reliability' || topDim === 'chemistry') {
        return '【心動切片】你非常欣賞他對自己所愛之事的極致專注與審美標準，這種認真生活的帥氣模樣，讓你不知不覺跟隨他的腳步。';
      }
      return '【心動切片】他不是對所有事情都在意，但只要你被他劃進保護圈，他對你的細節上心程度會超乎所有人想像。';

    case 'keonho':
      if (topDim === 'mystery' || topDim === 'contrast') {
        return '【心動切片】你很容易被他熱烈的玩心牽引，但最讓你牽腸掛肚的，反而是熱鬧散場後他眼底那一抹淡淡的高牆與孤獨感。';
      }
      if (topDim === 'chemistry') {
        return '【心動切片】你們可能表面上一直在互嘴互鬧，但往往只要一個眼神就能心領神會，這種「只有彼此懂的小暗號」最讓人欲罷不能。';
      }
      return '【心動切片】越是不輕易讓人看懂的他，只要對你露出哪怕一絲卸下防備的真心，就會成為你最想珍惜的唯一偏愛。';

    default:
      return '【心動切片】你心靈深處渴望被理解、被珍惜，而他的存在恰好填補了你最柔軟的那塊期待。';
  }
}
