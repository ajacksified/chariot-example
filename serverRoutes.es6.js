import fs from 'fs';
import url from 'url';
import qs from 'querystring';

const HEALTH = 'OK';

export default function routes (app) {
  const { router } = app;
  let robots;

  fs.readFile('robots.txt', function(err, file) {
    if (file && !err) {
      robots = file.toString();
    }
  });

  router.get('robots.txt', async (ctx) => {
    if (!robots) {
      ctx.status = 503;
      return;
    }

    ctx.body = robots;
  });

  router.get('/health', async (ctx) => {
    ctx.body = HEALTH;
  });

  router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      const ref = url.parse(ctx.request.headers.referer);

      const query = {
        ...qs.parse(ref.search),
        error: 'Invalid login information',
      };

      return ctx.redirect(`${ref.pathname}?${qs.stringify(query)}`);
    }

    // TODO this does not account for refresh tokens yet
    const token = await ctx.api.login(username, password);
    const tokenString = new Buffer(JSON.stringify(token)).toString('base64');

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + token.expires_in);

    ctx.cookies.set('token', tokenString, {
      expires,
      httpOnly: false,
      signed: true,
      overwrite: true,
      maxAge: 1000 * token.expires_in,
    });

    ctx.redirect('/');
  });

  router.get('logout', async (ctx) => {
    ctx.cookies.set('token');
    ctx.redirect('/');
  });
}
