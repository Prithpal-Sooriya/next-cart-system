# NEXT + Typescript + Styleguidist shopping cart example.

## How to run:

1. Clone/download this repository
2. run `yarn` to install the node_modules
3. Scripts:

   - `yarn docs` runs the styleguidist framework for isolated component development.
   - `yarn dev` runs the dev server

     - A `yarn docs:build` is required for the docs link to work.

   - `yarn build` will build the NEXT project
   - `yarn docs:build` will build the styleguidist project.
   - `yarn test` to run the test environment

## New frameworks and paradigms.

Recently I've been interested in how [RedwoodJS](https://redwoodjs.com/) breaks down components into "Cells" (atomic) components and the paradigm of Single File Components (SFC).

Also tried out [React StyleGuidist](https://github.com/styleguidist/react-styleguidist) as an alternative to StoryBook & for isolated component development.

Previous use of StoryBooks was that it was very config heavy (Seperate `component.story.ts file & markdown file). So having a way of writing "Stories" with just markdown files is refreshing.

## Conclusion

Breaking down components into "cells" and adding them to the styleguide made a nice living documentation for how they look and work (code snippets viewable in docs).

One downside is that component cells need to be exported to be used in React Styleguidist - thus the `Component__Element` namescheme to indicate where the cell came from. I'm on the fence for this sort of namescheme. Maybe this can be mitigated through [SFCs with storybooks by combining stories & components into 1 file?](https://www.swyx.io/react-sfcs-here/#merging-csf-and-sfcs)

### Improvements

**Styles**

- CSS Modules is nice for isolating CSS for components. However doesn't really follow a BEM style. Maybe providing a BEM namescheme with CSS Modules would be more scaleable?
- The app also is not mobile friendly, if we were to start again then it might be better to have a mobile first design / use exsiting design systems.

**State Management** - Just used React Context with `useReducer` for this app. If we needed to share state throughout larger apps (or if need to perform more complex processes) then a 3rd party library like Redux & Sagas would suffice.

**I18n**

- No I18n was added to this, but can be an easy addition with [i18Next](https://www.i18next.com/) or other localisation libs.
- Same for currency, we can use built in [Intl Number Format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) or 3rd party (if we need currency conversions)

**Tests**

- Styleguidist can be used for **Manual** visual tests, but it would be better to automate. Wanted to try [StyleGuidists Snapshot](https://github.com/styleguidist/snapguidist) and [Automated visual test](https://github.com/unindented/react-styleguidist-visual) plugins, however failed to get them to work (both outdated & also had issues using inside WSL).

  - Storybook has a variety of plugins for testing unlike styleguidist.

- We have used React Testing Library for unit tests, specifically on the pure components. In the future for connected & more complex components we can use integration tests.

- Something we haven't tested out was testing hooks in isolation. By using custom hooks we can isolate component tests from logic (hook logic). We can test this using [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library).
