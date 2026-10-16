# Editor navigation and input font correction

## Install the snippet

1. Download `snippets/glass-robo-fixes.css` from this branch.
2. Open **Settings → Appearance → CSS snippets** and click the folder button.
3. Put the CSS file in that folder, refresh the snippets list, and enable **glass-robo-fixes**.
4. Reopen the affected note, or reload Obsidian once if the editor still has stale measurements.

Keep Glass Robo and your current heading style selected. Disabling the snippet reverses its changes. This option also survives ordinary updates to the installed theme.

Alternatively, back up and replace the installed theme's `theme.css` with this branch's `theme.css`, then reload Obsidian. The SCSS source is patched as well. Either installation method is sufficient.

## Cursor positioning

The theme adds `margin-top: 15px` and `margin-bottom: 10px` to CodeMirror heading lines in **Voidraizer, Lodi, Cross, Dots, and Neat**. CodeMirror's line measurements exclude those margins. Text below headings consequently appears at different coordinates from the editor's internal line map, breaking clicks, drag selection, and Up/Down navigation.

The fix uses zero vertical margins and symmetric vertical padding in Live Preview. The previous margins plus padding total 35px, so the replacement uses 17.5px of padding above and below the text. Heading colors, decorations, and reading-mode margins remain in place. Full-width heading backgrounds now cover the added padding.

References: [original issue #6](https://github.com/lorens-osman-dev/Glass-Robo/issues/6), [CodeMirror maintainer's explanation](https://discuss.codemirror.net/t/how-to-set-the-line-spacing/9277).

## Search and input text

The theme sets input `font-size` to `var(--font-normal)`. Obsidian defines that variable as the unitless **font weight 400**. It is invalid as a font size, so the browser falls back to an inherited size. The corrected rule uses `--font-ui-small`, Obsidian's normal input size.

With Obsidian 1.13.7's actual application CSS in Chromium, the original rule inherited 15px and the corrected rule produced 13px. The giant gray rendering from [issue #20](https://github.com/lorens-osman-dev/Glass-Robo/issues/20) did **not** reproduce in this environment. This corrects a definite font-size error, but a fix for that exact rendering symptom still needs confirmation in the affected Obsidian installation.

## Validation

The original issue's note was reproduced with a real CodeMirror 6 editor and the original theme CSS. All five affected styles mapped clicks to the wrong lines and jumped **9 → 14 → 18** when pressing Down. With the patched theme, clicks matched their target lines and Down moved **9 → 10 → 11 → 12 → 13 → 14**. The other four available heading styles also passed.

An expanded comparison used Obsidian 1.13.7's application CSS with CodeMirror 6.43.14: nine heading styles × two editor widths × two text directions. All **36 patched cases** passed coordinate mapping, physical mouse clicks, Up/Down navigation, and drag selection below wrapped H1–H6 headings, including scrolling. The original theme failed in all **20 cases** covering the five affected styles. Reading-mode heading margins, padding, colors, and border radii matched the original in every style. The standalone snippet also matched the rebuilt theme in the original-note checks across all nine styles.

Validation uses an isolated CodeMirror browser harness; native Obsidian and the user's complete plugin/snippet configuration were not run. The SCSS compiled successfully with the repository's locked Sass 1.80.7 and Vite 5.4.11 versions.
