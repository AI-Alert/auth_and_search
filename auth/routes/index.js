const Router = require("express")
const router = new Router()
const userRouter = require('./userRouter')
const graphQLRouter = require('./graphqlUserRouter')

router.use('/user', userRouter);
router.use('/graphql', graphQLRouter);

module.exports = router