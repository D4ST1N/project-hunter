export default class Notification {
  constructor({
    title,
    text = '',
    type = 'error',
    time = 2500,
    dynamicTime = true,
    isHtml = false,
    hoverToStop = true,
    clickToClose = true,
    timeForChar = 60,
  }) {
    this.title = title;
    this.text = text;
    this.type = type;
    this.time = time;
    this.dynamicTime = dynamicTime;
    this.isHtml = isHtml;
    this.hoverToStop = hoverToStop;
    this.clickToClose = clickToClose;
    this.timeForChar = timeForChar;
    this.isVisible = true;
    this.showTime = performance.now();
    this.id = this.getId();
    this.init();
  }

  init() {
    this.totalTime = this.time;

    if (this.dynamicTime) {
      this.totalTime += this.getDynamicTime();
    }

    this.setTimer();
  }

  setTimer() {
    this.timerId = setTimeout(() => {
      this.hide();
    }, this.totalTime);
  }

  pauseTimer() {
    const timePassed = performance.now() - this.showTime;

    if (timePassed < this.totalTime) {
      clearTimeout(this.timerId);
      this.totalTime -= timePassed;
    }
  }

  continueTimer() {
    if (this.totalTime > 0) {
      this.setTimer();
    }
  }

  getDynamicTime() {
    return (this.text.length + this.title.length) * this.timeForChar;
  }

  hide() {
    clearTimeout(this.timerId);
    this.isVisible = false;
  }

  getId() {
    const S4 = () => {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    return `${S4()}-${S4()}-${S4()}`
  }
}