import Index from './controllers/index';
import Listing from './controllers/listing';

export default function routes (app) {
  const { router } = app;

  router.use(async (ctx, next) => {
    // Has to be a let, or the compiler barfs when creating a Buffer
    let tokenString = ctx.cookies.get('token');

    if (tokenString) {
      try {
        const b = new Buffer(tokenString, 'base64').toString('ascii');
        const t = JSON.parse(b);
        ctx.props.token = t;
      } catch (e) {
        // there was an error decoding the token, but it was probably already
        // handled upstream by the server. Annoyingly, it doesn't change the
        // value in `cookies.get` when you use `cookies.set`, so we will just
        // catch it here.
      }
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
