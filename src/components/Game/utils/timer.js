function centiSecondCounter(callback) {
  this.timer = setInterval(() => {
    callback();
  }, 10);
}

function deciSecondCounter(callback) {
  this.timer = setInterval(() => {
    callback();
  }, 100);
}

export { centiSecondCounter, deciSecondCounter };
