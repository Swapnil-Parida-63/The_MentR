const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    thumbnail: { type: String, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    published: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

blogSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
