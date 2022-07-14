const Router = require("express")
const router = new Router()
const searchRouter = require('./searchRouter')
const graphQLRouter = require('./graphqlPostRouter')

router.use('/search', searchRouter);
router.use('/graphql', graphQLRouter);

module.exports = router