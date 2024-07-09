# Template setup

```
# copy the parent directory

# rename the *.code-workspace file

# delete the .git directory

# set up Git
git init

git config --local user.name "InkWell Studio"
git config --local user.email joepro@tuta.io

git remote add origin git@inkwellstudio:inkwell-studio/NEW-PROJECT.git
```

# Template for an Astro site running on Deno

## Development

### Dependencies

#### Required

- [Deno](https://deno.land/)
- [pnpm](https://pnpm.io/)

#### Optional

- [Astro Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)

### Configuration

Opt-out of Astro data collection:

```
npx astro telemetry disable
```

### Writing code

This project is set up for development with [Visual Studio Code](https://code.visualstudio.com/), and is configured to have the editor
format files each time they are saved.

Deno is used for linting:

```
deno lint
```

### Local development

#### Development mode

```
pnpm dev
```

#### Production mode

Build a production version of the site, then preview it:

```
pnpm build
pnpm preview
```

### Committing to `master`

Commit messages should follow the following pattern:

```
type(scope): details

more details (optional)
```

Where `type` is one of:

- `change`
- `chore`
- `docs`
- `build`
- `feat`
- `fix`
- `refactor`
- `style`
