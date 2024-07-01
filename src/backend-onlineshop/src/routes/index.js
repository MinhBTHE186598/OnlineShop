const user = require("./user")
const banner = require("./banner")
const product = require("./product")
const seller = require("./seller")
const productReview = require("./productReview")
const category = require("./category")
const sellManager = require("./sellManager")
const admin = require("./admin")
const contact = require("./contact")
const noti = require("./noti")
const bill = require("./bill")
const initRoutes = (app) => {

    app.use('/user', user)
    app.use('/banner', banner)
    app.use('/product', product)
    app.use('/seller', seller)
    app.use('/productReview', productReview)
    app.use('/category', category)
    app.use('/sellManager', sellManager)
    app.use('/admin', admin)
    app.use('/contact', contact)
    app.use('/noti', noti)
    app.use('/bill', bill)
    return app.use("/", (req, res) => {
        return res.send("hello w2")
    })
}

module.exports = initRoutes