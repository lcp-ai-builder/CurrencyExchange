# Repository Guidelines

## Project Structure & Module Organization
The React Native entry point lives in `App.tsx`, with `index.js` delegating to it, so most UI work belongs in `src`. Screens reside under `src/screens`, while shared layout tokens and component-level styles stay in `src/styles`. The Jest suite is collected in `__tests__/*.test.tsx`, and platform-native projects live in `android/` and `ios/` (run `bundle install` before touching Pods). Keep assets that ship with the app inside the platform folders or co-located with the components that load them to preserve tree-shakeable bundles.

## Build, Test, and Development Commands
- `yarn start` (or `npm start`): boots the Metro bundler for live reload.
- `yarn android` / `yarn ios`: compiles and deploys the app to the active emulator or device; ensure Metro is already running.
- `yarn test`: runs Jest in watch mode for fast TypeScript-aware unit tests.
- `bundle exec pod install` (after `bundle install`): syncs iOS native dependencies whenever you add or update native modules.

## Coding Style & Naming Conventions
TypeScript is required (see `tsconfig.json` extending the React Native baseline). Prefer functional components, React hooks, and strongly typed props. Components, hooks, and screen files use `PascalCase` (e.g., `HomeScreen.tsx`); utility functions and style objects use `camelCase`. Follow Prettier 2.8.8 defaults (two-space indent, single quotes) via `npx prettier --write .` before committing. Keep styles isolated in `styles.ts` or `styles/` modules so the UI tree remains declarative.

## Testing Guidelines
Jest with `react-test-renderer` drives unit tests, so create files alongside features or under `__tests__` using the `ComponentName.test.tsx` naming. Favor behavior assertions (text content, navigation triggers) over shallow snapshot dumps, and add regression tests for any bugfix. Every new screen or logic helper should include at least one positive and one edge-case test; maintain or raise coverage when touching existing suites by running `yarn test --coverage` locally before opening a PR.

## Commit & Pull Request Guidelines
Write commits in the imperative mood (e.g., `Add currency conversion hook`) and scope them narrowly so revertability stays high. Link issues in either the commit footer (`Refs #123`) or PR description. Each PR should summarize the change, list manual test steps (device, platform, command), and attach screenshots or recordings for visible UI tweaks. Request at least one reviewer, keep CI green, and note any follow-up tasks explicitly so they do not get lost.
