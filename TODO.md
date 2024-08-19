# References

## Advanced translation needs

- https://github.com/nanostores/i18n

# Tasks to complete now

- [ ] implement app shell with content-HTMX functionality
  - [ ] cross-reference functionality (TBD)
  - [ ] language switching (new URL: swap/add/remove language tag; translate other segments (ignore the post-# value))
  - [ ] add e2e tests for the table-of-contents pages?
- [ ] add theme switching (light/dark/system)
- [ ] add a 500 page
- [ ] implement API demo
- [ ] implement landing page
- [ ] update UI
  - [ ] when relevant, re-add the following to the `deno.jsonc::check` task: `deno check website/src/**/*.tsx`
  - [ ] implement Action Bar menus
    - [ ] Table of Contents
      - [ ] "Home" (to a new "Dashboard" page (at `/en`): TOC with a link to the current "intro" page)
        - [ ] introductory paragraphs, e.g.:
          - [ ] what the CCC is
          - [ ] how the Search may be used (e.g. keywords, phrases, content titles, paragraph numbers)
          - [ ] how the JSON API may be used
      - [ ] introductory Apostolic Letter
      - [ ] Prologue
      - [ ] Parts 1-X
      - [ ] Glossary
      - [ ] Topical Index
      - [ ] Citation Index
    - [ ] Search
    - [ ] Settings
      - [ ] UI: light/dark/system
      - [ ] text size
      - [ ] "About" (general info)
      - [ ] language switcher
    - [ ] consider using a component library for buttons and other like elements
      - https://headlessui.com/
      - https://mantine.dev/
      - https://www.radix-ui.com/primitives
      - https://chakra-ui.com/
  - [ ] consider using `Partial`s with the `CrossReferenceWindow` component
  - [ ] consider using https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss (with the Headless UI
        components)
  - [ ] consider implementing necessary back-end changes
    - [ ] implement page-preserved "translation" linking
      - [ ] mock-data Catechism translations: use the same structure for all
  - [ ] watch design videos
  - [ ] determine if Tailwind themes can be reasonably implemented
  - [ ] diagnose build errors (from `esbuild`)
  - [ ] consider building some sort of style guide/library
  - [ ] handle RTL languages
  - [ ] fonts to consider
    - [ ] Bookman
    - [ ] Alegreya
  - [ ] accomodate Forced Colors mode (see Polypane blog)
  - [ ] dark mode: try to avoid the "window blending" problem (cannot tell where the browser window starts and another application window
        begins)
  - [ ] consider all notes about colors found elsewhere in this file
  - [ ] update text on intro page
  - merge
- [ ] remove all unused artifacts and their generators
- [ ] remove all unused artifact utility functions
- [ ] remove unused entries from `translation.ts`
- [ ] determine if the Catechism JSON artifacts should be created without formatting (will the saved disk space be beneficial?) (see
      `catechism/artifact-builders/build.ts`)
- [ ] verify helper function usage (in the `website/src/logic` directory):
- [ ] all exported functions are used externally
- [ ] all functions are used

- [ ] update the intro page if appropriate
- merge

- [ ] set caching headers for the fonts (and any other static files?)
- merge

- [ ] translations: always use a server-side component so data isn't sent up to the client unnecessarily
- merge

- [ ] implement hierarchical navigation
- merge

- [ ] research artifact caching methods

## Unprioritized

- [ ] determine the proper status code to use for the paragraph-number redirects
- [ ] add helpful information and links to the 404 page
- [ ] look into using Astral for e2e testing: https://astral.deno.dev/
- [ ] consider improving artifact management
  - should artifacts not be commited, and instead be built during deployment?
- [ ] UI: style for LTR and RTL text
- [ ] add e2e UI tests to validate links
- [ ] add a UI language switcher
  - [ ] update all user-facing text to be
- [ ] add JSON validation for `catechism.json`
- [ ] render all content
  - [ ] handle all TODO's in `content.tsx`
  - [ ] re-do the rendering structures (reorganize components, etc.)
  - [ ] opening content
  - [ ] citation markers
  - [ ] is there anything else?
- [ ] implement content loading
  - [ ] cross-reference navigation
  - [ ] chapter > chapter navigation
  - [ ] routing
    - [ ] to in-page anchor tags
- UI:
  - consider if any of the official Tailwind presets would be useful:
    - https://tailwindcss.com/docs/plugins#official-plugins
  - consider using Radix UI things:
    - https://www.radix-ui.com/colors
    - https://www.radix-ui.com/
    - https://icons.radix-ui.com/
  - [ ] consider using the following colors:
    - [ ] #E86D82 (red-pink)
- [ ] implement unimplemented tests
- [ ] add a test to ensure that all cross-references are paired (in `catechism.test.ts`)
- [ ] implement hierarchical navigation
- [ ] implement historical navigation
- [ ] implement search
- [ ] implement index
- [ ] implement glossary
- [ ] implement "copy" buttons (click a button to copy the entire text of a paragraph, quote, etc.)

# Tasks to complete once it has been decided to release a production-ready version

- [ ] investigate more efficient content-loading mechanisms, e.g.
  - can pages for all renderable routes be statically generated and cached on the server?
  - can all JSON content be loaded in-memory on the server?
- [ ] verify the translations in `catechism/artifact-builders/utils.ts` and `catechism/source/utils/semantic-path.ts` are correct

# Possible features

- [ ] the ability to ask a question in natural language (via text or mic), e.g. "What happens in the Sacrament of Confirmation?"
- [ ] note-taking and highlighting
  - [ ] permanent and temporary storage (easily toggleable)
- [ ] narration
  - [ ] recordered audio (better than a screen reader)
  - [ ] text is highlighted to follow along (toggleable)
