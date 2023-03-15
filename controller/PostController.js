import Post from "../model/Post.js";
import Log from "../utility/Log.js";

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        Log.success("Successfully Get All Post => " + posts);
        return res.status(200).json(posts);
    } catch (error) {
        Log.error("Something went wrong => " + error);
        return res.status(500).json({ message : "Something went wrong on the server!" });
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const post = new Post({
            title,
            description,
        });

        post.save()
            .then((data) => {
                Log.success("Successfully Create New Post => " + data);
                return res.status(201).json({ message: "Successfully create new post!", data: data });
            })
            .catch((error) => {
                Log.error("Error Create New Post => " + error);
                return res.status(400).json({ message : error });
            });
    } catch (error) {
        Log.error("Something went wrong => " + error);
        return res.status(500).json({ message : "Something went wrong on the server!" });
    }
}

export const getPostById = async (req, res) => {
    try {
        const _id = req.params.id;
        try {
            const post = await Post.findById(_id);
            if(post == null){
                Log.error(`Post with ID: ${_id} not found!`);
                return res.status(404).json({ message : `Post not found!` });
            }
            Log.success(`Retrieve Post with ID: ${_id} => ${post}`);
            return res.status(200).json(post);
        } catch (error) {
            Log.error(`Post with ID: ${_id} not found!`);
            return res.status(404).json({ message : `Post not found!` });
        }
    } catch (error) {
        Log.error("Something went wrong => " + error);
        return res.status(500).json({ message : "Something went wrong on the server!" });
    }
}

export const updatePostById = async (req, res) => {
    try {
        const _id = req.params.id;
        try {
            const post = await Post.findById(_id);
            if(post == null){
                Log.error(`Post with ID: ${_id} not found!`);
                return res.status(404).json({ message : `Post not found!` });
            }
            let { title, image, description } = post;
            try {
                req.body.title !== undefined && (title = req.body.title);
                req.body.description !== undefined && (description = req.body.description);

                const updatedPost = await Post.updateOne({_id}, {
                    $set: {
                        title,
                        description,
                    },
                    $currentDate: {
                        lastModified: true,
                    }
                });

                Log.success(`Successfully Updated Post with ID: ${_id} => ${JSON.stringify(updatedPost)}`);
                return res.status(201).json({ message : "Successfully updated post!", data : post });
            } catch (error) {
                Log.error("Error to Update Post => " + error);
                return res.status(400).json({ message : error });
            }
        } catch (error) {
            Log.error(`Post with ID: ${_id} not found!`);
            return res.status(404).json({ message : `Post not found!` });
        }
    } catch (error) {
        Log.error("Something went wrong => " + error);
        return res.status(500).json({ message : "Something went wrong on the server!" });
    }
} 

export const deletePostById = async (req, res) => {
    try {
        const _id = req.params.id;
        try {
            const deletedPost = await Post.deleteOne({_id});
            Log.success(`Successfully Deleted Post with ID: ${_id} => ${JSON.stringify(deletedPost)}`);
            return res.status(200).json({ message : "Successfully deleted post!" });
        } catch (error) {
            Log.error(`Post with ID: ${_id} not found!`);
            return res.status(404).json({ message : `Post not found!` });
        }
    } catch (error) {
        Log.error("Something went wrong => " + error);
        return res.status(500).json({ message : "Something went wrong on the server!" });
    }
}