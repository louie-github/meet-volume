const IS_DEBUG = false;

const meetButtonsQS = IS_DEBUG ? "body" : '[class="cZG6je"]';
const containerDivQS = ".meetvol-container";
const popupDivQS = ".meetvol-popup";
const btnQS = ".meetvol-button";

let clickListener;
let meetvolItems = [];
let audioElements = [];
let containerDiv, popupDiv, button;

let audioContext;

let htmlData;
fetch(chrome.runtime.getURL("meet_popup/popup.html"))
  .then((res) => res.text())
  .then((data) => {
    htmlData = data;
  });

function setupAudioAPI() {
  audioContext = audioContext || new AudioContext();
}

function setupMeetStreams() {
  audioElements = [];
  for (const element of document.querySelectorAll("audio")) {
    const originalStream = element.srcObject;
    const sourceNode = audioContext.createMediaStreamSource(originalStream);
    const destinationNode = audioContext.createMediaStreamDestination();
    const gainNode = audioContext.createGain();
    const analyserNode = audioContext.createAnalyser();
    const analyserArray = new Float32Array(analyserNode.frequencyBinCount);
    sourceNode.connect(gainNode);
    gainNode.connect(analyserNode);
    analyserNode.connect(destinationNode);

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
      nodes: {
        sourceNode: sourceNode,
        gainNode: gainNode,
        analyserNode: analyserNode,
        destinationNode: destinationNode,
      },
      analyserArray: analyserArray,
    });
  }
}

function resetMeetStreams() {
  for (const item of audioElements) {
    item.element.srcObject = item.originalStream;
    item.element.muted = false;
    item.element.play();
    item.newElement.remove();
    for (const node in item.nodes) {
      node.disconnect();
    }
  }
  audioElements = [];
}

function setVolume(index, value) {
  const audioItem = audioElements[index];
  audioItem.nodes.gainNode.gain.linearRampToValueAtTime(
    value,
    audioContext.currentTime + 0.1
  );
}

function absSum(arr) {
  return arr.reduce((sum, i) => sum + Math.abs(i));
}

function visualizeVolumes() {
  for (let i = 0; i < audioElements.length; i++) {
    audioItem = audioElements[i];
    meetvolItem = meetvolItems[i];
    audioItem.nodes.analyserNode.getFloatTimeDomainData(
      audioItem.analyserArray
    );
    meetvolItem.visualizer.fg.style.width =
      (absSum(audioItem.analyserArray) * 2 * 100) /
        audioItem.analyserArray.length +
      "%";
  }
  requestAnimationFrame(visualizeVolumes);
}

function togglePopupVisibility(state) {
  popupDiv.hidden = typeof state === "boolean" ? !state : !popupDiv.hidden;
  popupDiv.style.display = popupDiv.hidden ? "none" : "";
}

function getMeetVolItems() {
  meetvolItems = [];
  for (const item of document.querySelectorAll(".meetvol-item")) {
    meetvolItems.push({
      item: item,
      index: parseInt(item.querySelector(".meetvol-slider-index").textContent),
      slider: item.querySelector('input[type="range"].meetvol-slider'),
      output: item.querySelector(".meetvol-slider-output"),
      gainView: item.querySelector(".meetvol-slider-gainView"),
      visualizer: {
        bg: item.querySelector(".meetvol-visualizer-bg"),
        fg: item.querySelector(".meetvol-visualizer-fg"),
      },
    });
  }
}

function connectSlidersToOutputs() {
  for (const item of meetvolItems) {
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
  meetvolItems = [];

  // Thanks: https://stackoverflow.com/a/36696086/8646315
  if (clickListener !== undefined) {
    window.removeEventListener("click", clickListener);
  }
  clickListener = (event) => {
    if (button.contains(event.target)) {
      togglePopupVisibility();
    } else if (popupDiv.contains(event.target)) {
      // Ignore click event
    } else {
      togglePopupVisibility(false);
    }
  };
  window.addEventListener("click", clickListener);
  setupAudioAPI();
  setupMeetStreams();
  getMeetVolItems();
  for (const sliderItem of meetvolItems) {
    sliderItem.slider.value = 100;
  }
  connectSlidersToOutputs();
  visualizeVolumes();
}

function injectHTML() {
  // meetButtons.append(htmlData);
  document
    .querySelector(meetButtonsQS)
    .insertAdjacentHTML("beforeend", htmlData);
}

function removeHTML() {
  containerDiv.remove();
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.message === "setup") {
    injectHTML();
    setupElements();
  } else if (message.message === "teardown") {
    removeHTML();
    resetMeetStreams();
  }
});
