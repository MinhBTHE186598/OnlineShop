const user = require("./user")
const banner = require("./banner")
const product = require("./product")
const seller = require("./seller")
const productReview = require("./productReview")

const initRoutes = (app) => {

    app.use('/user', user)
    app.use('/banner', banner)
    app.use('/product', product)
    app.use('/seller', seller)
    app.use('/productReview', productReview)
    
    return app.use("/", (req, res) => {
        return res.send("hello w2")
    })
}

module.exports = initRoutes