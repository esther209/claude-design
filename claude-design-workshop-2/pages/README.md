# pages/

Each folder here is one self-contained design page. The HTML and every image/video it needs live side-by-side in the same folder, with flat filenames (no `assets/` or `../assets/` paths).

**To play with a page in Claude Code:** copy the folder, drop it into a Claude Code session, and open the HTML. All asset paths resolve locally.

## What's in each folder

| Folder | Source HTML | Notes |
|---|---|---|
| `workshop-hero/` | Workshop-Hero-standalone.html | Hero video + poster |
| `workshop-landing-v2/` | Workshop-Landing-Claude-v2.html | Full landing, v2 |
| `workshop-landing-v3/` | Workshop-Landing-Claude-v3.html | Full landing, v3 |
| `workshop-landing-v4/` | Workshop-Landing-Claude-v4.html | Full landing, v4 (includes 10 deck slides) |
| `alessandra-vincenti/` | alessandra-vincenti.html | `assets/alessandra.jpg` is missing from source — page will show a broken image |
| `aurora-dashboard/` | aurora-dashboard.html | No external assets — pure HTML/CSS |
| `operators-workshop/` | operators-workshop.html | `assets/operators background 2.0.png` is missing from source |
| `terra-bakery/` | terra-bakery.html | Bread-making video |
| `careplus/` | landing pages/careplus.html | CarePlus landing |
| `northview-apartments/` | landing pages/northview-apartments.html | Apartment landing with bg video |
| `crimson-silk-ribbon/` | video-cdn/index.html | Silk ribbon video page (.mp4 + .webm) |

## How this was built

Paths in each HTML were rewritten from things like `assets/foo.png`, `../assets/foo.png`, and `decks/slides/slide-01.jpg` to just `foo.png` / `slide-01.jpg`, and the referenced files were copied alongside.

External (`https://...`) and `data:` URIs were left alone. Cross-page navigation links (e.g. one workshop page linking to another) were left as relative HTML hrefs and will 404 when the folder is opened on its own — that's expected; each folder is meant as a standalone toy.

The originals are untouched in the parent directory. Once you've confirmed these copies work, the originals + `assets/` + `landing pages/` + `video-cdn/` + `decks/` can be archived or deleted.
