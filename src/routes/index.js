import AppChrome from './components/AppChrome';
import Bio from './Bio';

export default {
  component: 'div',

  childRoutes: [
    {
      path: '/',
      component: AppChrome,
      childRoutes: [
        Bio
      ]
    }
  ]
};
