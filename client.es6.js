// server.es6.js

import config from './config';

// Import custom middleware
import snoodeMiddleware from './lib/snoodeMiddleware';

// Import the Chariot library.
import Chariot from 'chariot/src/client';

// Import routes file
import routes from './routes';

// Create a new chariot instance, passing in our App constructor
const chariot = new Chariot(config);

chariot.enableMiddleware(snoodeMiddleware());

// Load in url routes
chariot.loadRoutes(routes);

Chariot.onLoad([chariot.start]);
