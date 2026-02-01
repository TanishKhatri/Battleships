function renderGame(mode) {
  if (mode === "1player") {
    const titleScreen = document.querySelector(".titleScreenContainer");
    if (titleScreen) {
      titleScreen.remove();
    }
  }
}

export default renderGame;