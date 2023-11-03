# About Book App

This project was created to solve the problem of trying to find your next read. Too many books you're interested in? Our next step in this project is to build out bookshelves to organize your interests. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Redux

This project uses Redux to keep track of the user's token when navigating to different pages. This is still a work in progress.

## Components:

- Book.js is the component that renders when a book is clicked on. The user also has an option to view the book details on Google Books official site.

- BookList.js is the component that renders a list of books from a user's search. 

- Bookshelves.js is the component that will render the list of bookshelves that has been created for and by the user. This is still a work in progress. The API requires a user ID which needs retrieval from the Google Books site. This might require showing the user how to access it using links and instructions or find a way to programmatically retrieve this for the user. 

## Next Steps

- Continued work on styling for the main page.
- Figure out course of action for Bookshelves.