# Card photos

Drop card images in this folder, named by card ID:

```
photos/C001.jpg
photos/C002.jpg
...
```

Then set the `photo` field for that card in `collection.js`:

```js
{"id":"C001", ... ,"photo":"photos/C001.jpg", ... }
```

That's it — the card automatically shows the photo (and click-to-zoom in the
detail view). If the file is missing or the path is wrong, the card falls back
to the gunmetal placeholder, so nothing ever breaks.

### Tips
- **Portrait orientation, 5:7-ish ratio** looks best (the frame is 5:7).
- JPG or PNG, ~1000px tall is plenty. Keep files reasonable (<500 KB) so the
  page stays fast.
- Shoot on a dark, even background to match the armory look. A straight-on,
  well-lit scan of the front is what sells.
- Filenames are case-sensitive on the web — use exactly `C001.jpg` (uppercase C).
