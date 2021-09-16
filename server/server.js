// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

server.use(middlewares);

/**
 * Custom requests
 */
server.post('/authenticate', (req, res) => {
    console.log('***/authenticate request body***', req.body);
    const { name, password } = req.body;

    const user = router.db.get('users').find({
      name,
      password,
    }).value();

    if (user) {
      // dummy token
      const authToken = 'dummyToken';

      const response = {
        user,
        authToken,
      };

      console.log('***/authenticate response body***', response);

      res.jsonp(response);
    } else {
      res.status(401).jsonp({
        error: 'no such user',
      });
    }
  },
);

server.post('/users/new', (req, res) => {
    const user = req.body;
    console.log('***/users/new request body***', user);
    const { name, email } = user;

    const usersCollection = router.db.get('users');

    const userFoundByEmail = usersCollection.find({
      email,
    }).value();
    const userFoundByName = usersCollection.find({
      name,
    }).value();
    if (userFoundByEmail || userFoundByName) {
      res.status(400).jsonp({
        error: 'something went wrong',
      });
    } else {
      usersCollection.insert(user).write();
      res.jsonp(user);
    }
  },
);
/**
 * End of - Custom requests
 */

/**
 * Traditional json-server logic.
 */
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});