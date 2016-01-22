Catalyst-React Blog Engine
==========================

<iframe src="https://discordapp.com/widget?id=139500841760456704&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
 
![Build Status](https://travis-ci.org/andrew-codes/catalyst-react.svg?branch=master)

**This is very much so a work in progress**, so the blog engine does not currently fully realize this readme; however, for the goals of this project and for future reference:

This is an customizable, isomorphic blog engine written with a variety of front-end technologies, including:

-	ES6 support via Babel
-	Reactjs with JSX support
-	Flux
-	Immutable data/state
-	Isomorphic app
-	React-router
-	Styles in for Radium and/or Stylus, LESS or Sass
-	Express
-	Promises via bluebird
-	Blog CLI to get a new blog created quickly

Creating a New Blog
-------------------

```bash
npm install react-blog -g # install package
cd ./my-new-blog # change into the directory for you new blog
blog create
```

Running your New Blog
---------------------

```bash
cd ./my-new-blog # change into the directory of your new blog
NODE_ENV=developing node ./server.js
# open your browser and navigate to http://localhost:3000
```

Customizing Your New Blog
-------------------------

```bash
cd ./my-new-blog # change into the directory of your blog
blog create skin 'my-new-skin-name' # Create a new skin in your blog's directory
```

This will create a new skin for your blog that you can further customize. Open the blog's directory with your favorite editor and hack away!

### What Can I Customize?

-	The express server
-	Routes
-	React components associated with routes
-	Add your own styles in Radium, Stylus, LESS, or Sass for your custom React components
-	Utilize any of the available blog flux actions
-	Create new APIs from a customizable BasicAPI class
-	Use your own, existing document database connection
-	Create your own custom data persistence connection via creating custom APIs

Using Your New Blog
-------------------

Planning on an admin side to enable adding/updateing/removing published posts in Markdown, upload static assets such as images, and drafting new posts, etc.

Run the tests
-------------

```bash
npm test
```
