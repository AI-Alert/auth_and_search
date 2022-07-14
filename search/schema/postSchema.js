const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLBoolean
} = require('graphql')

const Posts = require('../models/Post');

// const Posts = [
//     { id: 1, title: 'Psychology', desc: 'Psychology is the study of the mind and behavior, according to the American Psychological Association. It is the study of the mind, how it works, and how it affects behavior. ', tag: ['Psychology'], createdAt: '2022-07-08T07:47:51.200Z', updatedAt: '2022-07-08T07:47:51.200Z' },
//     { id: 2, title: 'Sport', desc: 'Sport is commonly defined as an athletic activity that involves a degree of competition, such as netball or basketball. ', tag: ['Sport'], createdAt: '2022-07-08T09:51:21.289Z', updatedAt: '2022-07-08T09:51:21.289Z' },
//     { id: 3, title: 'Sport', desc: 'Sport is defined as an athletic activity that involves a degree of competition, such as netball or basketball. ', tag: ['Sport'], createdAt: '2022-07-08T09:51:21.289Z', updatedAt: '2022-07-08T09:51:21.289Z' },
//     { id: 4, title: 'Когда больше ничего не радует: 5 причин выгорания разработчика и как себе помочь', desc: 'Для большинства кодеров характерно многочасовое выполнение одной задачи, глубокая концентрация. В своей работе программист задействует аналитическое мышление, систематизирует информацию, устанавливает причинно-следственные связи, сравнивает и так далее. Эти процессы задействуют лобную долю мозга.', tag: ['Psychology', 'Programming'], createdAt: '2022-07-08T07:47:51.200Z', updatedAt: '2022-07-08T07:47:51.200Z' },
//     { id: 5, title: 'Programming', desc: 'Programming is a creative task: there is no right or wrong way to solve a problem, in the same way, that there is no right or wrong way to paint a picture. ', tag: ['Programming'], createdAt: '2022-07-08T07:47:51.200Z', updatedAt: '2022-07-08T07:47:51.200Z' }
// ]

const PostsType = new GraphQLObjectType({
    name: 'Posts',
    description: 'This represents a post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: new GraphQLNonNull(GraphQLString) },
        tag: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) }
    })
})

//Mutation

const PostMutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPost: {
            type: new GraphQLList(PostsType),
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                desc: { type: new GraphQLNonNull(GraphQLString) },
                tag: { type: new GraphQLNonNull(GraphQLString) },
                // createdAt: { type: new GraphQLNonNull(GraphQLString) },
                // updatedAt: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const post = new Posts({
                    title: args.title,
                    desc: args.desc,
                    tag: args.tag,
                    // createdAt: args.createdAt,
                    // updatedAt: args.updatedAt,
                });
                return post.save();
            },
        },
        deletePost: {
            type: new GraphQLList(PostsType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Posts.findByIdAndRemove(args.id);
            }
        },
        updatePost: {
            type: new GraphQLList(PostsType),
            args: {
                id: { type: GraphQLID },
                title: { type: new GraphQLNonNull(GraphQLString) },
                desc: { type: GraphQLString },
                tag: { type: GraphQLString },
                watched: { type: GraphQLBoolean },
                // createdAt: { type: new GraphQLNonNull(GraphQLString) },
                updatedAt: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Posts.findByIdAndUpdate(
                    args.id,
                    { $set: { title: args.title, desc: args.desc, tag: args.tag, watched: false, updatedAt: Date.now() } },
                    { new: true },
                );
            },
        },

        updatePostTitle: {
            type: new GraphQLList(PostsType),
            args: {
                id: { type: GraphQLID },
                title: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Posts.findByIdAndUpdate(
                    args.id,
                    { $set: { title: args.title } },
                    { new: true },
                );
            },
        },

    }
});


const PostQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        post: {
            type: PostsType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Posts.findById(args.id);
            },
        },
        posts: {
            type: new GraphQLList(PostsType),
            resolve(parent, args) {
                return Posts.find({});
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: PostQueryType,
    mutation: PostMutationType,
});


