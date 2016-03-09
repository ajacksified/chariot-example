import Index from './controllers/index';
import Listing from './controllers/listing';

export default function routes (app) {
  const { router } = app;

  router.use(async (ctx, next) => {
    let tokenString = ctx.cookies.get('token');

    if (tokenString) {
      const b = new Buffer(tokenString, 'base64').toString('ascii');
      const t = JSON.parse(b);
      ctx.props.token = t;
    }

    return await next();
  });

  router.get('/', app.get(Index));
  router.get('/r/:subredditName', app.get(Index));

  router.get('/r/:subredditName/comments/:listingId/:listingTitle/', app.get(Listing));

  router.get('/json', async (ctx) => {
    ctx.body = {
      name: 'jack',
    };
  });
}
