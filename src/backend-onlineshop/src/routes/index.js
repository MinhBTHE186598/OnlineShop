const user = require("./user")
const banner = require("./banner")

const initRoutes = (app) => {

    app.use('/user', user)
    app.use('/banner', banner)
    
    return app.use("/", (req, res) => {
        return res.send("hello w2")
    })
}

module.exports = initRoutes