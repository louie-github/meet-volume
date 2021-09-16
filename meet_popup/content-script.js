const meetButtonsQS = '[class="cZG6je"]';
const containerDivQS = ".meetvol-container";
const popupDivQS = ".meetvol-popup";
const btnQS = ".meetvol-button";

const sliderItems = [];
const audioElements = [];

let audioContext;

// containerDiv is currently unused.
let containerDiv, popupDiv, button;

let htmlData;
fetch(chrome.runtime.getURL("meet_popup/popup.html"))
  .then((res) => res.text())
  .then((data) => {
    htmlData = data;
  });

function setupAudioAPI() {
  audioContext = new AudioContext();
}

function setupMeetStreams() {
  for (const element of document.querySelectorAll("audio")) {
    const originalStream = element.srcObject;
    const sourceNode = audioContext.createMediaStreamSource(originalStream);
    const destinationNode = audioContext.createMediaStreamDestination();
    const gainNode = audioContext.createGain();
    sourceNode.connect(gainNode);
    gainNode.connect(destinationNode);

    element.muted = true;
    // Create new element to play adjusted audio.
    const newElement = document.createElement("audio");
    newElement.classList.add("meetvol-destination-audio");
    document.body.append(newElement);
    newElement.srcObject = destinationNode.stream;
    newElement.play();

    audioElements.push({
      element: element,
      newElement: newElement,
      originalStream: originalStream,
      newStream: destinationNode.stream,
      sourceNode: sourceNode,
      gainNode: gainNode,
      destinationNode: destinationNode,
    });
  }
}

function setVolume(index, value) {
  const audioItem = audioElements[index];
  audioItem.gainNode.gain.linearRampToValueAtTime(
    value,
    audioContext.currentTime + 0.1
  );
}

function togglePopupVisibility(state) {
  console.log(state);
  popupDiv.hidden = typeof state === "boolean" ? !state : !popupDiv.hidden;
  popupDiv.style.display = popupDiv.hidden ? "none" : "";
}

function getSliders() {
  for (const item of document.querySelectorAll(".meetvol-control-item")) {
    sliderItems.push({
      item: item,
      index: parseInt(item.querySelector(".meetvol-slider-index").textContent),
      slider: item.querySelector('input[type="range"].meetvol-slider'),
      output: item.querySelector(".meetvol-slider-output"),
      gainView: item.querySelector(".meetvol-slider-gainView"),
    });
  }
}

function connectRangeOutputs() {
  for (const item of sliderItems) {
    item.slider.addEventListener("input", () => {
      item.output.textContent = item.slider.value;
      let newValue = item.slider.value / 100;
      newValue = newValue * newValue;
      item.gainView.textContent = newValue.toFixed(2);
      setVolume(item.index, newValue);
    });
  }
}

function setupElements() {
  containerDiv = document.querySelector(containerDivQS);
  popupDiv = document.querySelector(popupDivQS);
  button = document.querySelector(btnQS);

  // Thanks: https://stackoverflow.com/a/36696086/8646315
  window.addEventListener("click", (event) => {
    if (button.contains(event.target)) {
      togglePopupVisibility();
    } else if (popupDiv.contains(event.target)) {
      // Ignore click event
    } else {
      togglePopupVisibility(false);
    }
  });
  setupAudioAPI();
  setupMeetStreams();
  getSliders();
  for (const sliderItem of sliderItems) {
    sliderItem.slider.value = 100;
  }
  connectRangeOutputs();
}

function injectHTML() {
  // meetButtons.append(htmlData);
  document
    .querySelector(meetButtonsQS)
    .insertAdjacentHTML("beforeend", htmlData);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.message === "setup") {
    injectHTML();
    setupElements();
  }
});
