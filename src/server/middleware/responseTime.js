const getTimeStamp = () => new Date();

export default () => async (ctx, next) => {
  const start = getTimeStamp();
  await next();
  const ms = getTimeStamp() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
};
