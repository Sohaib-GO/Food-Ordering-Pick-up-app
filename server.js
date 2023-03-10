// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['supersecretkey'],
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const adminApi = require('./routes/admin-api');
const adminRoutes = require('./routes/admin');
const registerRoutes = require('./routes/register');
const homePageRoutes = require('./routes/homepage');
const loginRoutes = require('./routes/login');
const contactRoutes = require('./routes/contact');
const menuRoutes = require('./routes/menu');
const logoutRoutes = require('./routes/logout');
const accountRoutes = require('./routes/account');
const smsRoutes = require('./routes/sms');
const account = require('./routes/admin');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/register', registerRoutes);
app.use('/homepage', homePageRoutes);
app.use('/login', loginRoutes);
app.use('/contact', contactRoutes);
app.use('/menu', menuRoutes);
app.use('/logout', logoutRoutes);
app.use('/api/admin', adminApi);
app.use('/admin', adminRoutes);
app.use('/account', accountRoutes);
app.use('/sms', smsRoutes);
app.use('/account', account);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
const userQueries = require("./db/queries/users");
app.get("/", async(req, res) => {
  const userId = req.session.userId;

  let user;
  if (userId) {
    user = await userQueries.getUserById(userId);
  }

  res.render("index", { user: user });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
