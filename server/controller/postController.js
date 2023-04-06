import postModel from '../model/postModel.js';

export const createPost = async (request, response) => {
  try {
    const post = await new postModel(request.body);
    post.save();

    response.status(200).json('Post saved successfully');
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updatePost = async (request, response) => {
  try {
    const post = await postModel.findById(request.params.id);

    if (!post) {
      response.status(404).json({ msg: 'Post not found' });
    }

    await postModel.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json('post updated successfully');
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deletePost = async (request, response) => {
  try {
    const post = await postModel.findById(request.params.id);

    await post.delete();

    response.status(200).json('post deleted successfully');
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getPost = async (request, response) => {
  try {
    const post = await postModel.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllPosts = async (request, response) => {
  let username = request.query.username;
  let category = request.query.category;
  let posts;

  try {
    if (username) {
      posts = await postModel.find({ username: username });
    } else if (category) {
      posts = await postModel.find({ categories: category });
    } else {
      posts = await postModel.find({});
    }

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};
