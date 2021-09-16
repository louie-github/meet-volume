// Thanks: https://stackoverflow.com/a/9517879/8646315
// "Use a content script to access the page context variables and functions"

let s = document.createElement("script");
s.src = chrome.runtime.getURL("meet_popup/monkeypatch.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);
