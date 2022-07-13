const Router = require("express")
const router = new Router()
const searchRouter = require('./searchRouter')
const graphQLRouter = require('./graphQLRouter')

router.use('/search', searchRouter);
router.use('/graphql', graphQLRouter);

module.exports = router