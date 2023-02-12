import CommentSchema from "../models/Comment.js";

export const create = async (req, res) => {
  try {
    const doc = new CommentSchema({
      fullName: req.body.fullName,
      comment: req.body.comment,
      postId: req.params.postId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать комментарий',
    })
  }
}

export const getPostComments = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await CommentSchema.find(
      { "postId": postId },
    ).exec();

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить комментарии',
    })
  }
}

export const getLastComments = async (req, res) => {
  try {
    const comments = await CommentSchema.find().exec();

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить комментарии',
    })
  }
}