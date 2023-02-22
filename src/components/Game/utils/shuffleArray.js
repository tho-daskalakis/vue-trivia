export default function shuffleArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = this.getRandomInt(arr.length);
    const temp = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = temp;
  }
}
