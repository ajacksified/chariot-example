import Snoode from 'snoode';

export default function(config={}) {
  return async (ctx, next) => {
    let token;
    // this has to be a let because the compiler complains about it being
    // edited; I guess by Buffer?
    let tokenString = ctx.cookies.get('token');

    if (tokenString) {
      try {
        const b = new Buffer(tokenString, 'base64').toString('ascii');
        const t = JSON.parse(b);
        token = t.access_token;
      } catch (e) {
        ctx.cookies.set('token', '');
      }
    }

    ctx.api = new Snoode({
      debugLevel: 'info',
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      oauthAppOrigin: config.oauthAppOrigin,
      token,
      origin: token ? 'https://oauth.reddit.com' : 'https://www.reddit.com',
    });

    return await next();
  };
}
