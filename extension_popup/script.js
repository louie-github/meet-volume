const mainButton = document.getElementById("main-button");

mainButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: "setup",
    });
  });
});
