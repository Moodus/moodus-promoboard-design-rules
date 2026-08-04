# Moodus Promoboard design rules

Client-facing one-page guide explaining what our designer needs in order to design a
Moodus promoboard: required material, what we can't use, what we handle, board sizes
and the approval steps. Available in EN / NL / FR / DE / IT via the language switch.

Contact for submissions: design@moodus.com

## Files

| File | What it is |
| --- | --- |
| `template.html` | Source. The logo is a `%%logo%%` placeholder, so this file shows a broken image if you open it directly. |
| `public/index.html` | The page to publish. Identical to the template, with the logo inlined as a base64 `data:` URI. |
| `logo/Moodus Logo.png` | The logo that gets inlined. |

Everything is self-contained — no build tools, no external requests, no fonts or scripts
loaded from a CDN. Light and dark themes are both handled in CSS.

## Regenerating `public/index.html`

After editing `template.html`, re-inline the logo:

```sh
LOGO="data:image/png;base64,$(base64 -w0 'logo/Moodus Logo.png')"
awk -v l="$LOGO" '{gsub(/%%logo%%/, l); print}' template.html > public/index.html
```

## Editing the copy

All text lives in the `STR` object at the bottom of `template.html`, one block per
language. Elements pick up their text from the matching `data-i18n` key, so a string
only has to be changed in that object — the HTML above it holds the English fallback.
