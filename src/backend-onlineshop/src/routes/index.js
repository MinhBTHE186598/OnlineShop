const user = require("./user")
const banner = require("./banner")
const product = require("./product")

const initRoutes = (app) => {

    app.use('/user', user)
    app.use('/banner', banner)
    app.use('/product', product)
    
    return app.use("/", (req, res) => {
        return res.send("hello w2")
    })
}

module.exports = initRoutes