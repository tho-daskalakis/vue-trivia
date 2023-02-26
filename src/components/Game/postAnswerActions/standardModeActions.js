export default function standardModeActions() {
  // Game end condition
  if (this.questionCount >= 10) this.showFinalScreen();
}
