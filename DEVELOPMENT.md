# Development

## Dependencies

### Required

- [Deno](https://deno.land/) 1.45.1
- [pnpm](https://pnpm.io/) 9.3.0

### Optional

Visual Studio Code extensions:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)

## Configuration

Opt-out of Astro data collection:

```
cd website
npx astro telemetry disable
```

## Writing code

This project is set up for development with [Visual Studio Code](https://code.visualstudio.com/), and is configured to have the editor
format files each time they are saved.

### Main tasks

| task                        | description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| `deno task pre-commit`      | linting, testing, formatting, and artifact creation            |
| `deno task build-mock-data` | re-generate mock Catechism data                                |
| `deno task dev`             | locally serve a development version of the website             |
| `deno task build`           | build the production version of the website                    |
| `deno task serve-prod`      | locally serve the last built production version of the website |

### End-to-end testing

```
# if necessary, build the production version of the website:
deno task build

# serve the website
deno task serve-prod

# in a separate shell:
deno task test-e2e
```

### Committing to `master`

The `build` task should be successfully executed before committing to ensure that the code is linted, correct, and formatted, and that the
artifacts are kept in-sync with the source.

After that, the end-to-end tests should be successfully executed (see _End-to-end testing_ above).

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

## Deployment

This project is deployed to [Deno Deploy](https://deno.com/deploy) via [Github Actions](https://docs.github.com/en/actions). The deployment
is configured by `.github/workflows/deploy.yml`.

Deployments are triggered by pushed commits on the `master` and `dev` branches. Code from the `master` branch is deployed to production.
