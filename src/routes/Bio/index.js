export default {
  path: 'bio',
  getComponent(location, cb) {
    require.ensure([], require => cb(null, require('./components/Bio')));
  }
};
