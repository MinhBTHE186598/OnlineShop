const initRoutes = app => {
  return app.use("/", (req, res) => {
    return res.send("hello w2");
  });
};
module.exports = initRoutes;