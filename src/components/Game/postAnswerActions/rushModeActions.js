export default function rushModeActions() {
  // Game end condition
  if (this.lives < 1) this.showFinalScreen();
}
