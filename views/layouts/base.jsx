import React from 'react';

export default function BaseLayout (props, context) {
  return (
    <div>
      <div className='topnav'>
        <a href='/' className='topnav-logo'>reddit</a>

        <div className='pull-right'>
          { props.token ?
            <a href='/logout'>Log Out</a> :
            <form className='pull-right form-inline' action='/login' method='post'>
              <input name='username' placeholder='username' type='text' />
              <input name='password' placeholder='password' type='password' />
              <input name='_csrf' value={ context.ctx.csrf } type='hidden' readOnly={ true } />
              <button type='submit'>Log In</button>
            </form>
          }
        </div>
      </div>

      { props.children }
    </div>
  );
}

BaseLayout.contextTypes = {
  ctx: React.PropTypes.object,
};
