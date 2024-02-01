# MERN-stack boilerplate with GraphQL, Apollo and Auth Middleware

My personal boilerplate for a MERN-stack app with GraphQL, Apollo Server and authentication middleware.

- Scaffolded using Vite with React + Javascript.
- Includes configured React Router.

- Server configured with

- Uses bcrypt and jsonwebtoken with custom auth middleware

- CSS imports

## Already done:

### Client:

1. Scaffolded new Vite with React + Javascript:

```
    npm create vite@latest
    cd mern-boilerplate
    npm i
    npm run dev
```

2. Added **.gitignore** at root-level.

3. Moved scaffolded app into a [./client](./client) child-directory.

4. Added "Start" script to [package.json](./client/package.json) at client-level:

   `"start": "vite"`

5. Customised [vite.config.js](./vite.config.js) to start on port 3000 and open on start, and added a proxy for `/graphql` endpoint:

```
    export default defineConfig({
	    plugins: [react()],
	    server: {
            port: 3000,
            open: true,
            proxy: {
                '/graphql': {
                    target: 'http://localhost:3001',
                    secure: false,
                    changeOrigin: true,
                },
            },
	    },
    });
```

1. Created a [./pages](./client/src/pages/) and a [./components](./client/src/components/) diretory to house pages and components respectively.

1. Added additional dependencies for the front end:
   `npm i react-router-dom @apollo/client`

1. Added boilerplate "Home", "Error" and "Link 1" pages and a generic [Navbar](./client/src/components/Navbar/index.js) component with links to each page.

1. Set up app.jsx to use Apollo to provide context for user authentication, and added

1. Configured main.jsx to use React Router and link to the above pages.

### Server

1. Created a [./server](./server) child-directory and a server [package.json](./server/package.json), with scripts and necessary dependencies:

```
npm i @apollo/server express graphql mongoose bcrypt jsonwebtoken
npm i -D nodemon
```

2. Added connection to MongoDB using mongoose in [./config/connection.js](./server/config/connection.js):

```
const mongoose = require('mongoose');

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-boilerplate'
);

module.exports = mongoose.connection;
```

1. Added a [./models](./server/models/) directory containing a template [User.js](./server/models/User.js) using `bcrypt` pre-save middelware, and exported via [index.js](./server/models/index.js).

1. Set up an `authMiddleware` in [auth.js](./server/utils/auth.js) using JSON web-tokens and GraphQL error-handling.

1. Created a [./schemas](./server/schemas/) directory with an [index.js](./server/schemas/index.js), linking to a basic [typeDefs.js](./server/schemas/typeDefs.js) and [resolvers.js](./server/schemas/resolvers.js) using the `User` schema and `authMiddleware`.

1. Added a [server.js](./server/server.js), configuring Apollo Server linked to [typeDefs.js](./server/schemas/typeDefs.js) and [resolvers.js](./server/schemas/resolvers.js), Express middleware and GraphQL.

### Other

1. Added a [package.json](./package.json) at root-level, with scripts and saved [Concurrently v8.2.2](https://www.npmjs.com/package/concurrently) as a dev-dependency:
   `npm i -D concurrently`

## To do:

### Client

1. Rename the app in [package.json](./package.json) at root level, and change any other info as desired (such as license info).

1. Import models in [resolvers.js](./server/schemas/resolvers.js) and define resolvers.
1. Define typeDefs in [typeDefs.js](./server/schemas/typeDefs.js).

### Server

1. Change DB details (rename `mern-boilerplate`) in [./config/connection.js](./server/config/connection.js) and/or use `env` vars to access a remote DB with [MongoDB Atlas](https://www.mongodb.com/atlas/database):

```
process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/[mern-boilerplate]'
```

1. Add new models to the [./models](./server/models/) directory and import/export them via [index.js](./server/models/index.js).

1. Update [auth.js](./server/utils/auth.js) util to replace `secret` string with `env` var here:
   `const secret = 'mysecretssshhhhhhh'`

1. Ensure the rest of the `authMiddleware` (such as the payload) is consistent with the `User` model in [User.js](./server/models/User.js)

### Other/Optional

1. Rename the app in [package.json](./package.json) at root level, and change any other info as desired (such as license info).

1. Remove seed script and any other scripts not required from root [package.json](./client/package.json) and server [package.json](./server/package.json)

# STILL FOR ME TO ADD/CONFIGURE:

- env and dotenv dev dependency
