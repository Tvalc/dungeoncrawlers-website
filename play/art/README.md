# Makko art drop-zone

Drop PNGs here and they appear in the game automatically — no code changes, no
rebuild required (the game loads them by URL). This folder is **preserved**
across game rebuilds (`build:web` won't delete it).

Prompts for every character are in the game repo: `ART_PROMPTS.md`
(regenerate with `npm run art-prompts`).

## Where files go

```
art/
  heroes/<slug>/portrait.png          512×512, transparent  → roster, dossier, cards
  heroes/<slug>/panel-1.png           ~512×384, inked       → dossier "story so far"
  heroes/<slug>/panel-2.png
  heroes/<slug>/panel-3.png
  monsters/<slug>/portrait.png        512×512               → bestiary
  vex/idle.png                        512×512 (mouth closed) → host avatar
  vex/talk.png                        512×512 (mouth open)   → host avatar while speaking
  rooms/<type>.png                    square                 → behind the dungeon feed
  rooms/default.png                   fallback room backdrop
```

`<slug>` = the name lowercased with non-letters turned to dashes
(e.g. `Sir Aldric` → `sir-aldric`, `Zyra Quill` → `zyra-quill`,
`Grim Gourmand` → `grim-gourmand`). Room `<type>` values include `entry`,
`core`, `trap`, `normal` — or just provide `default.png`.

Commit the files to this repo and push; GitHub Pages serves them within a minute.
