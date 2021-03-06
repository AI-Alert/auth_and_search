const Post = require("../models/Post");

class PostConroller {

    async getAllPostsSearch(req, res) {
        try {
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 5;
            const search = req.query.search || "";
            let sort = req.query.sort || "title";
            let tag = req.query.tag || "All";


            const tagOptions = [
                "Psychology",
                "Programming",
                "Music",
                "Art",
                "Sport",
                "Other",
            ];

            tag === "All"
                ? (tag = [...tagOptions])
                : (tag = req.query.tag.split(","));
            req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

            let sortBy = {};
            if (sort[1]){
                sortBy[sort[0]] = sort [1];
            } else {
                sortBy[sort[0]] = "asc";
            }

            const posts = await Post.find({title: { $regex: search, $options: "i"}})
                .where("tag")
                .in([...tag])
                .sort(sortBy)
                .skip(page * limit)
                .limit(limit);

            const total = await Post.countDocuments({
                tag: { $in: [...tag] },
                name: {$regex: search, $options: "i"},
            });

            const response = {
                error: false,
                total,
                page: page + 1,
                limit,
                tag: tagOptions,
                posts,
            };

            res.status(200).json(response);

        } catch (e){
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }

    }


    async getOnePostSearch(req, res) {
        try {
            Post.findOne({
                _id: req.params.id
            }).exec(function(err, post){
                if(err) {
                    res.send('error has occured');
                } else {
                    console.log(post);
                    res.json(post);
                }
            });
        } catch (e){
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }

    }


    async postOnePost(req, res) {
        try {
            const newPost = new Post();
            newPost.title = req.body.title;
            newPost.desc = req.body.desc;
            newPost.tag = req.body.tag;
                newPost.save(function(err, post){
                    if(err) {
                        res.send('Post is Already exists');
                    } else {
                        console.log(post);
                        res.send(post);
                    }
                });

        } catch (e){
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }

    }


    async changeOnePost(req, res) {
        try {
            Post.findOneAndUpdate({
                _id: req.params.id
            },{
                $set: {
                    title: req.body.title,
                    desc: req.body.desc,
                    tax: req.body.tax,
                    updatedAt: req.body.updatedAt
                }
            },{
                upsert: true
            },function(err, newPost){
                if(err) {
                    res.send('error updating post');
                } else {
                    console.log(newPost);
                    res.send(newPost);
                }
            });
        } catch (e){
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }

    }


    async deleteOnePost(req, res) {
        try {
            Post.findByIdAndRemove({
                _id: req.params.id
            },function(err, post){
                if(err) {
                    res.send('error deleting post');
                } else {
                    console.log(post);
                    res.send(post);
                }
            });
        } catch (e){
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }


}

module.exports = new PostConroller()