## Meet Volume
Implements volume adjustment for each of the three (3) individual audio
streams provided by Google Meet. In the future, presentation audio
will also be adjustable.

Note that, currently, there is no way to deduce which user each
`<audio>` element is connected to, therefore, when someone else unmutes
their microphone and begins to talk, Google Meet may change which
audio stream refers to which user. In that case, be warned that volume
adjustments **carry over when the audio source changes**, so you may
experience either overly quiet or overly loud audio when someone else
unmutes their microphone and begins talking.

In the future, this should be addressed by adding a Compressor effect
to the audio streams, but as of now, just keep that in mind.

Because of these limitations, this extension works best when there are
only one to three people at a time who are constantly talking, where it
is relatively rare that anyone else will unmute their microphone and
start talking.


### How to install
First, click on Code and then Download ZIP, or, alternatively, you can
[download the file directly](https://github.com/louie-github/meet-volume/archive/refs/heads/master.zip).
Afterwards, extract the *meet-volume-master* folder.

For Chrome users, follow the steps listed in
[Creating the manifest](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest)
to load an unpacked extension, selecting the folder that you created
in the above step.

For Firefox users, follow the steps listed in
[Installing](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
to load an unpacked extension as a Temporary Add-On. Note that this
add-on will not persist between browser restarts.


### IMPORTANT: Current bugs
A bug currently exists whereby activating this extension in
Chromium-based browsers **breaks Google Meet's audio visualizations.**

This means that you will not be able to see the blue circle on the top
right of each user indicating whether they are talking, as well as the
gray circle pulsing if their camera is off.

This is not an issue on Firefox.

Technical details of the bug will be written later on, but all help is
appreciated to fix this!


### License
Code is licensed under the [MIT License](LICENSE.md).

Meet Volume Icons © 2021 by Louie Torres are licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Material Design Icons by Google, including:
- [volume_up_white_24dp.svg](icons/volume_up_white_24dp.svg)

are licensed under the [Apache License Version 2.0](icons/VOLUME_UP-LICENSE).
Check them out at https://github.com/google/material-design-icons.