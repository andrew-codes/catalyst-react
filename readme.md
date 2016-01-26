# Catalyst-React Blog Engine [![Travis][build-badge]][build] [![Discord][discord-badge]][discord]

[![Gratipay][gratipay-badge]][gratipay] [![Twitter][twitter-follow-badge]][twitter]

**This is very much so a work in progress**, so the blog engine does not currently fully realize this readme; however, for the goals of this project and for future reference:

Catalyst is a customizable, fully isomorphic blog written from the ground-up in ES2015 and React, along with a variety of other front-end technologies. It uses Koa as its server and includes hot-reloading when in development mode.

## Getting Started

```bash
npm install
npm start # runs blog in development mode
```

## Deployment

Running the deployment task will create a distribution of the site that is ready to be run for production. The
distribution output should be copied in its **entirety** to the production server. Running the `npm start` task in the
distribution directory will run the site in production mode.

```bash
npm run deployment # creates a distribution for deployment

# Running the deployment
node dist/index.js
```

## Developing

```bash
npm run start:dev # run site in development and watch specs
```

### Running Specs

```bash
npm test # run specs
npm test -- --watch # run specs and watch
npm test -- --grep grep_pattern # run specs matching grep_pattern
```

[build-badge]: https://img.shields.io/travis/andrew-codes/catalyst-react/master.svg?style=flat-square
[build]: https://travis-ci.org/andrew-codes/catalyst-react

[npm-dependencies-badge]: https://david-dm.org/andrew-codes/catalyst-react.svg

[npm-dev-dependencies-badge]: https://david-dm.org/dev/andrew-codes/catalyst-react.svg

[discord-badge]: https://img.shields.io/badge/Discord-join%20chat%20%E2%86%92-738bd7.svg?style=flat-square
[discord]: https://discord.gg/0mJKTpyIAAmkz7dY

[twitter-follow-badge]: https://img.shields.io/twitter/follow/andrew_codes.svg?style=social
[twitter]: http://twitter.com/intent/user?screen_name=andrew_codes

[gratipay-badge]: https://img.shields.io/gratipay/user/andrew-codes.svg
[gratipay]: https://gratipay.com/~andrew-codes/
