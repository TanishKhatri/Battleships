function renderTitleScreen() {
  const titleScreenTemplate = document.querySelector(
    "template.titleScreenTemplate",
  );
  const titleScreen = titleScreenTemplate.content.cloneNode(true);
  const body = document.querySelector("body");
  body.appendChild(titleScreen);
}

renderTitleScreen();
 
const upArrow = document.querySelector(".upArrow");
const leftArrow = document.querySelector(".leftArrow");
const downArrow = document.querySelector(".downArrow");
const rightArrow = document.querySelector(".rightArrow");
const enterKey = document.querySelector(".enterKey");

function arrowEnterAddFunction(e) {
if (e.key === "ArrowUp") {
  upArrow.classList.add("activated");
} else if (e.key === "ArrowLeft") {
  leftArrow.classList.add("activated");
} else if (e.key === "ArrowDown") {
  downArrow.classList.add("activated");
} else if (e.key === "ArrowRight") {
  rightArrow.classList.add("activated");
} else if (e.key === "Enter") {
  enterKey.classList.add("activated");
}
}

function arrrowEnterRemoveFunction(e) {
  if (e.key === "ArrowUp") {
    upArrow.classList.remove("activated");
  } else if (e.key === "ArrowLeft") {
    leftArrow.classList.remove("activated");
  } else if (e.key === "ArrowDown") {
    downArrow.classList.remove("activated");
  } else if (e.key === "ArrowRight") {
    rightArrow.classList.remove("activated");
  } else if (e.key === "Enter") {
    enterKey.classList.remove("activated");
  }
}
document.addEventListener("keydown", arrowEnterAddFunction);
document.addEventListener("keyup", arrrowEnterRemoveFunction);
