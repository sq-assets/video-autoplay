# Mobile video autoplay fix

Makes video blocks play reliably on phones: muted, inline and looping. Each starts from the beginning once 60% in view, pauses when out of view, and starts on first tap if the phone blocked autoplay.

Note: iPhones in Low Power Mode block all video autoplay on every site. For must-move work, use animated WebP instead.

### Use
Add to **Custom CSS** for each section with videos:

```css
section[data-section-id="YOUR-SECTION-ID"] { --video-autoplay: 1; }
```

`VISIBLE` at the top of the script = how much of the video must be on screen before it starts (`.6` = 60%).

### Install

Paste into **Settings → Developer tools → Code injection → Footer**:

```html
<script src="https://cdn.jsdelivr.net/gh/sq-assets/video-autoplay@main/effect.js"></script>
```

After changing a file here, jsDelivr can take up to 12 hours to update the live site. To force it straight away, purge it at https://www.jsdelivr.com/tools/purge

Made by [Kill Vanilla Studio](https://www.killvanillastudio.com)
