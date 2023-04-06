import commentModel from '../model/commentModel.js';

export const newComment = async (request, response) => {
  try {
    const comment = await new commentModel(request.body);
    comment.save();

    response.status(200).json('Comment saved successfully');
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getComments = async (request, response) => {
  try {
    const comments = await commentModel.find({ postId: request.params.id });

    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteComment = async (request, response) => {
  try {
    const comment = await commentModel.findById(request.params.id);
    await comment.delete();

    response.status(200).json('Comment deleted successfully');
  } catch (error) {
    response.status(500).json(error);
  }
};
