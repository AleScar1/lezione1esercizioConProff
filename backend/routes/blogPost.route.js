import express from 'express';
import BlogPost from '../models/blogPostSchema.js';
import { uploadCover } from '../middlewares/multer.js';
import postsModel from '../models/blogPostSchema.js'

const router = express.Router();

// ➔ GET /blogPosts → ritorna una lista di blog post
router.get('/', async (req, res) => {
    try {
      const posts = await BlogPost.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// ➔ GET /blogPosts/:id → ritorna un singolo blog post
router.get('/:id', async (req, res) => {
    try {
      const post = await BlogPost.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// ➔ POST /blogPosts → crea un nuovo blog post
router.post('/', async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➔ PUT /blogPosts/:id → modifica il blog post con l'id associato
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));

    res.status(500).json({ error: err.message });
  }
});

//------------
router.patch("/:id/cover", uploadCover, async (req, res, next) => {
  const id = req.params.id
  console.log(req.file)
  try {
    const postEdit = await postsModel.findByIdAndUpdate(
      id,
      { cover: req.file.path },
      { new: true }
    );
    res.status(200).json(postEdit)
  } catch (err) {
    // console.log(err)
    // res.status(500).json({error: "errore durante il caricamento del file"})
    next(err)
  }
})




// ➔ DELETE /blogPosts/:id → cancella il blog post con l'id associato
router.delete('/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post eliminato correttamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---- lezione 5 
router.post('/new/with-comment', async (req, res) => {
  try {
    const newPost = new BlogPost({
      category: "categoriaEx",
      title: "Embedding in MongoDB",
      author: "Luca Bianchi",
      content: "MongoDB content",
      comments: [
        {
          authorName: "Giulia Verdi",
          text: "Ottimo articolo!"
        }
      ]
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Tutti i commenti di un post
router.get('/:id/comments', async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.json(post.comments);
});

router.get('/:id/comments/:commentId', async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  const comment = post.comments.id(req.params.commentId);
  res.json(comment);
});
//new com.
router.post('/:id/comments', async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  post.comments.push(req.body);
  await post.save();
  res.json(post.comments);
})

router.put('/:id/comments/:commentId', async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  const comment = post.comments.id(req.params.commentId);
  comment.authorName = req.body.authorName;
  comment.text = req.body.text;
  await post.save();
  res.json(comment);
});

router.delete('/:id/comments/:commentId', async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  post.comments.id(req.params.commentId).remove();
  await post.save();
  res.json({ message: "Commento eliminato" });
});
//---------------------------------------------------------------
export default router;
