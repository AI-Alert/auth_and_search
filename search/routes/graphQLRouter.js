const Router = require("express");
const router = new Router();
const schema = require('../schema/postSchema')
const {graphqlHTTP} = require("express-graphql");


router.use('/', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

module.exports = router;