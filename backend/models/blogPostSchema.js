import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogPostSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  cover: { type: String, required: true },
  readTime: {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  author: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const BlogPost = model('BlogPost', blogPostSchema);

export default BlogPost;
