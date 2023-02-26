export default function handleGameSharedActions(isCorrect) {
  this.answersEnabled = false;
  this.showAnswers = true;
  this.questionCount++;
  if (isCorrect) {
    this.score++;
  } else {
    this.lives--;
  }
}
