import React from 'react';

export default function DefaultLayout (props, context) {
  const { config } = props;
  const { manifest } = config;

  let css = manifest['base.css'];
  let js = manifest['client.js'];

  if (config.minifyAssets) {
    css = manifest['base.min.css'];
    js = manifest['client.min.js'];
  }

  css = `${config.assetPath}/css/${css}`;
  js = `${config.assetPath}/js/${js}`;

  return (
    <html>
      <head>
        <title>{ props.title }</title>
        <link href={ css } rel='stylesheet' />
        <meta id='csrf-token-meta-tag' name='csrf-token' content={ context.ctx.csrf }/>
      </head>
      <body>
        <div id='app-container'>
          { props.children }
        </div>

        <script src={ js } async='true' />
      </body>
    </html>
  );
}

DefaultLayout.contextTypes = {
  ctx: React.PropTypes.object,
};
