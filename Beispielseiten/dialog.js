// Dialog

document.getElementById("show-modal-dialog").addEventListener("click", () => {
  document.getElementById("dialog").showModal();
});

document.getElementById("close-dialog").addEventListener("click", () => {
  document.getElementById("dialog").close();
});

document.getElementById("dialogicon").addEventListener("click", () => {
  document.getElementById("dialog").close();
});