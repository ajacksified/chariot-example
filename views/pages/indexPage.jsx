import React from 'react';
import { pick } from 'lodash/object';
import { connect } from 'react-redux';

import Listing from '../components/listing';
import Paging from '../components/paging';

export function IndexPage ({ data, path, query }) {
  const subredditName = data.subreddit ? data.subreddit.display_name : '';

  if (data.links.body) {
    return (
      <div>
        <h1>{ subredditName || 'reddit' }</h1>
        { data.links.body.map(l =>
          <Listing listing={ l } key={ l.id } showSubreddit={ !subredditName } />)
        }

        <Paging
          listings={ data.links.body }
          baseUrl={ path }
          query={ query }
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
}

export function stateSlicer (state) {
  return pick(state, ['data', 'query', 'path']);
}

export default connect(stateSlicer)(IndexPage);
