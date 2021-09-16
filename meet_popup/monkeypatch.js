// Code adapted from:
// https://github.com/joeywatts/disable-autogain-control-extension/blob/master/disableAutogain.js

/*
MIT License

Copyright (c) 2021 Joseph Watts

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// TODO: Monkey-patch Chrome functions so that Google Meet's
// visualizations don't break.

/*
var createdMsSources = [];
var createdAnalyserNodes = [];
var connectedAnalyserNodes = [];

function patchFunction(object, name, createNewFunction) {
  if (object !== undefined && name in object) {
    const original = object[name];
    object[name] = createNewFunction(original);
  }
}

patchFunction(AudioContext.prototype, "createAnalyser", function (original) {
  return function createAnalyser() {
    console.log("Created a new AnalyserNode!");
    const ret = original.call(this);
    createdAnalyserNodes.push(ret);
    return ret;
  };
});

patchFunction(AudioNode.prototype, "connect", function (original) {
  return function connect(destination, outputIndex, inputIndex) {
    const ret = original.call(this, destination, outputIndex, inputIndex);
    if (destination instanceof AnalyserNode) {
      console.log("Connected an AnalyserNode!");
      connectedAnalyserNodes.push({
        src: this,
        dest: destination,
      });
    }
    return ret;
  };
});

*/
