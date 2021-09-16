## Meet Volume (UNFINISHED)
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


### License
Code is licensed under the [MIT License](LICENSE.md).

Meet Volume Icons © 2021 by Louie Torres are licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Material Design Icons by Google, including:
- [volume_up_white_24dp.svg](icons/volume_up_white_24dp.svg)

are licensed under the [Apache License Version 2.0](icons/VOLUME_UP-LICENSE).
Check them out at https://github.com/google/material-design-icons.