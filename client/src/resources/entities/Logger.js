export default class Logger {
  constructor({ level = 'warning', only = false } = {}) {
    this.level = level;
    this.only = only;

    this.priorities = [
      'info',
      'warning',
      'error',
    ];

    this.logs = [];
  }

  log(message, level = 'info') {
    if (this.priorities.indexOf(level) >= this.priorities.indexOf(this.level)) {
      if (!this.only || this.level === level) {
        const now = new Date();

        if (typeof message === 'object') {
          message = `${message.message}\n${message.stack}`;
        }

        this.logs.push({
          message,
          level,
          time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
        });
      }
    }
  }

  getLogs() {
    const logs = [...this.logs];
    this.logs = [];

    return logs;
  }
}