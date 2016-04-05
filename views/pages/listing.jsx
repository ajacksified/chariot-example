import React from 'react';
import { connect } from 'react-redux';

import Listing from '../components/listing';
import Comment from '../components/comment';

export function ListingPage (props) {
  if (props.data.comments && props.data.link) {
    return (
      <div>
        <Listing listing={ props.data.link } showSubreddit={ true } />
        { props.data.comments.body.map(c => <Comment comment={ c } key={ c.id } />) }
      </div>
    );
  }

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
}

export default connect(state=>state)(ListingPage);
