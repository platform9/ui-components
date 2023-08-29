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
   

