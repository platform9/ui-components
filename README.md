# Platform9 UI Components

This is the home for all of PF9's UI React components

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Transpiles TypeScript source code to JavaScript. These files are stored in the `built` folder

## To Use pf9-ui-components In Your App:
1. In your app root directory, run `yarn add https://github.com/platform9/ui-components`
2. Import the components you want to use from the `built` folder.
   Ex. `import Theme from 'pf9-ui-components/built/theme-manager/themes/model'`
3. If you want to sync your changes from ui-components to your app, run `yarn upgrade pf9-ui-components`

## To Modify or Create a React Component:
1. Run `yarn start` to run the app
2. Make the changes you need to make in the code
3. Run `yarn build` 
4. Commit and push your changes to the main branch
5. To update your changes in the app that is using this component library, run `yarn upgrade pf9-ui-components`


## Storybook
Storybook is used to create an isolated development environment and showcase the components. This helps speed up development as we can control the data / props that are feed into the component.

To see the Storybook just run:

### yarn storybook
   

## Project Structure

- **`src/elements/`** – low-level, reusable building blocks (buttons, inputs, grid, badge, card, tooltip, etc.).
- **`src/components/`** – higher-level, opinionated components that compose elements into PF9-specific UX patterns.
- **`src/theme-manager/`** – theming primitives and helpers (PF9 color palette, typography, component-level theme config).
- **`src/providers/`, `src/containers/`, `src/hooks/`, `src/utils/`** – supporting building blocks used by elements/components.

When published, the compiled code lives under the `built/` folder with a similar structure (`built/elements`, `built/components`, etc.).

## Testing

This project uses **Create React App**'s Jest setup with **React Testing Library**:

- Run the test watcher:
  - `yarn test`
- Recommended conventions:
  - Unit tests live next to the code as `*.test.tsx` / `*.test.ts`.
  - Use Testing Library to assert on rendered output and behavior (not implementation details).

Suggested focus areas:

- **Elements** – verify visual states and basic behavior of primitives:
  - Buttons, inputs, toggles, dropdowns, badges, tooltips, grid cells/rows, etc.
- **Components** – verify composition and higher-level workflows:
  - Validated forms, steppers, card/table composites, widgets, dialogs, etc.

Storybook stories in `src/stories/` can be used as a reference for realistic props and states when designing tests.
