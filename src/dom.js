const dom = {};
function renderTitleScreen() {
  const titleScreenTemplate = document.querySelector("template.titleScreenTemplate");
  const titleScreen = titleScreenTemplate.content.cloneNode(true);
  const body = document.querySelector("body");
  body.appendChild(titleScreen);
}

renderTitleScreen();
export default dom;