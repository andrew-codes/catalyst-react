import blogConfig from './../../blog/blog.config';

export default Object.freeze({
   url: process.env.NODE_ENV === 'production' ? blogConfig.url : 'http://localhost:3000'
});