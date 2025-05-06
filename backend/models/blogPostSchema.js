import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const blogPostSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },

  comments: [commentSchema]

}, { timestamps: true });

const BlogPost = model('BlogPost', blogPostSchema);
export default BlogPost;

