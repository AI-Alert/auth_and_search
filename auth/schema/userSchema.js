const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLBoolean,
} = require('graphql')

const Users = require('../models/user');

// const Users = [
//     { id: 1, email: 'new@mail.com', password: 'pass', role: 'USER' },
//     { id: 2, email: 'test@mail.com', password: 'ssap', role: 'USER' },
//     { id: 3, email: 'test@new.com', password: 'pass_1', role: 'USER' },
//     { id: 4, email: 'new@test.com', password: 'pass_2', role: 'USER' }
//     ]


const UsersType = new GraphQLObjectType({
    name: 'Users',
    description: 'This represents a user',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) }
    })
})

//Mutation

// const UserMutationType = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addUser: {
//             type: new GraphQLList(UsersType),
//             args: {
//                 email: { type: new GraphQLNonNull(GraphQLString) },
//                 password: { type: new GraphQLNonNull(GraphQLString) },
//                 role: { type: new GraphQLNonNull(GraphQLString) },
//             },
//             resolve(parent, args) {
//                 const user = new Users({
//                     email: args.email,
//                     password: args.password,
//                     role: args.role
//                 });
//                 return user.save();
//             },
//         },
//         deleteUser: {
//             type: new GraphQLList(UsersType),
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 const foundUser = Users.findOne({where : {id: args.id}})
//                 if (foundUser){
//                     return Users.destroy(args.id);
//                 } else {
//                     return "User doesn't found!"
//                 }
//             }
//         },
//         updateUser: {
//             type: new GraphQLList(UsersType),
//             args: {
//                 id: { type: GraphQLID },
//                 email: { type: new GraphQLNonNull(GraphQLString) },
//                 password: { type: GraphQLString },
//                 role: { type: GraphQLString },
//             },
//             resolve(parent, args) {
//                 const foundUser = Users.findOne({where : {id: args.id}})
//                 if (foundUser){
//                     Users.set({email: args.email, password: args.password, role: args.role});
//                     return Users.save();
//                 } else {
//                     return "User doesn't found!"
//                 }
//             },
//         },
//
//         updateUserPassword: {
//             type: new GraphQLList(UsersType),
//             args: {
//                 id: { type: GraphQLID },
//                 password: { type: new GraphQLNonNull(GraphQLString) },
//             },
//             resolve(parent, args) {
//                 const foundUser = Users.findOne({where : {id: args.id}})
//                 if (foundUser){
//                     Users.set({password: args.password});
//                     return Users.save();
//                 } else {
//                     return "User doesn't found!"
//                 }
//             },
//         },
//
//     }
// });


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UsersType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const foundUser = Users.findOne({where : {id: args.id}})
                if (foundUser){
                    return foundUser;
                } else {
                    return "User doesn't found!"
                }


            },
        },
        users: {
            type: new GraphQLList(UsersType),
            resolve(parent, args) {
                return Users.findAll();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQueryType,
    // mutation: UserMutationType,
});


