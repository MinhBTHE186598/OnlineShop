const user = require("./user");
const initRoutes = app => {
  app.use('/api/v1/user', user);
  return app.use("/", (req, res) => {
    return res.send("hello w2");
  });
};
module.exports = initRoutes;