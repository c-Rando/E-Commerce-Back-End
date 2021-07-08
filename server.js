const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
.then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer listening on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.log('Error syncing DB: ', err.message);
})
