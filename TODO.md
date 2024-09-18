# References

## Advanced translation needs

- https://github.com/nanostores/i18n

# Tasks to complete now

- [ ] add routing for other content:
  - [ ] pages (add e2e tests as you go)
    - [ ] language-specific landing/"home" pages
      - include layout demo
    - [ ] index: citations
      - include backend work
    - [ ] index: topics
    - [ ] table of contents (same page as above?)
    - [ ] concordance (?)
    - [ ] project-explanation landing page (no need to populate it yet)
    - [ ] handle language-switching navigation links
      - eventually add:
        - what the CCC is
        - how the Search may be used (e.g. keywords, phrases, content titles, paragraph numbers)
        - how the JSON API may be used
  - [ ] ensure content navigation with HTMX works appropriately in all cases
  - [ ] see note in `website/src/artifacts.ts` about tyring to use `import.meta.*`
  - [ ] handle Vite rollup error from
        `/Users/Joseph/Repos/catechism-of-the-catholic-church-astro/catechism/source/utils/content.ts :: getCatechism()`
    - see `https://docs.astro.build/en/reference/configuration-reference/#vite`
- [ ] implement app shell with content-HTMX functionality
  - [ ] language switching: consider adding the React menu for proof of full functionality
  - [ ] add e2e tests for the table-of-contents pages?
  - [ ] implement "sketch" versions of the index pages
- [ ] add theme switching (light/dark/system)
- [ ] consider adding a note to `DEVELOPMENT.md` about adding languages (does just `catechism/source/types/language.ts` have to be modified
      for additional language support, and the `~/pages/en/index.astro` path have to be modified if the default language changes?)
- [ ] add a 500 page
- [ ] implement landing page
  - [ ] consider adding to the list of existing online versions of the CCC:
        https://dn790005.ca.archive.org/0/items/catechismofthecatholicchurch/Catechism%20of%20the%20Catholic%20Church%20-%20USCCB.pdf
- [ ] look into removing `website/src/env.d.ts` (https://github.com/withastro/astro/pull/11859)
- [ ] update UI
  - [ ] look into the mobile apps that William mentioned, and their features:
    - Blue Letter Bible
      - likes the navigation for book and chapter better than the YouVersion Bible app
      - good for word meanings
      - the concordance is useful
    - Cepher Bible
      - "UI not as good"
      - likes the highlighting mechanism (makes copying and pasting easier)
    - YouVersion Bible
      - highlighting text for copying and pasting verses in handy, but wished it worked across chapter breaks
      - infinite scrolling is useful (even if it were limited to "big chunks", such as a book) (likes this better than "flipping pages")
    - Ascension App (not mentioned by William, but should be re-examined)
  - [ ] watch design videos
  - [ ] consider adding the ability to have different "themes" and font settings for the light/dark modes (cf.
        https://www.esv.org/Matthew+1/)
    - [ ] determine if Tailwind themes can and be reasonably implemented
  - [ ] handle the overlay/mobile "expanded view" scroll problem (where expanding the content container's height beyond the height of the
        window cues the mobile browsers to minimize their menus, but the fixed action bars (and cross-reference window?) do not "capture"
        the user's scrolling motions — on desktop and mobile such that the main content is scrolled instead)
  - [ ] handle RTL languages
  - [ ] consider building some sort of style guide/library
  - [ ] fonts to consider
    - Bookman
    - Alegreya
    - Lora
    - reach out to Josh?
    - others?
  - [ ] accomodate Forced Colors mode (see Polypane blog)
  - [ ] dark mode: try to avoid the "window blending" problem (cannot tell where the browser window starts and another application window
        begins)
  - [ ] consider all notes about colors found elsewhere in this file
  - [ ] update text on intro page
  - merge
  - [ ] consider using: https://react-spectrum.adobe.com/react-aria/index.html
  - [ ] when relevant, re-add the following to the `deno.jsonc::check` task: `deno check website/src/**/*.tsx`
  - [ ] implement Action Bar menus
    - [ ] Table of Contents
    - [ ] Search
    - [ ] Settings
      - [ ] UI: light/dark/system
      - [ ] text size
      - [ ] "About" (general info)
      - [ ] language switcher
    - [ ] consider using a component library for buttons and other like elements
      - https://react-spectrum.adobe.com/react-aria/index.html
      - https://headlessui.com/
      - https://mantine.dev/
      - https://www.radix-ui.com/primitives
      - https://chakra-ui.com/
  - [ ] consider using https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss (with the Headless UI
        components)
- [ ] consider opening the cross-reference window only after the desired response is received (or otherwise improve the behavior)
- [ ] remove all unused artifacts and their generators
- [ ] remove all unused artifact utility functions
- [ ] remove all unused utility function (e.g. `website/src/logic/routing.ts::*`)
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
  - [ ] handle all TODO's in the component files
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
