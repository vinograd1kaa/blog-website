import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true, //дата создания юзера и обновление сущности
  },
);

export default mongoose.model('Comment', CommentSchema);