// qui creazione rotte
import express from 'express';
import Author from "../models/authorSchema.js";
import { uploadAvatar } from '../middlewares/multer.js';

const router = express.Router()


// GET /users → ritorna tutti gli utenti
router.get('/', async (req, res) => {
    const authors = await Author.find()
    res.json(authors);
});

// GET /users/:id → ritorna un utente specifico in base all'id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const author = await Author.findById(id) 
    res.json(author);
});

// POST /users → crea un nuovo utente
router.post('/', async (req, res) => {
    const obj = req.body;
    const author = new Author(obj);
    const dbAuthor = await author.save();
    res.status(201).json(dbAuthor)
}); 

// PUT /users/:id → modifica un utente esistente
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const userUpdate = await userModel.findByIdAndUpdate(id, obj)
        res.status(200).json(userUpdate)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /users/:id → elimina un utente esistente
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Author.findByIdAndDelete(id);
        res.status(200).json({ message: "Autore eliminato" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



  
router.patch("/:id/avatar", uploadAvatar, async (req, res) => {
    const id = req.params.id;
    try {
      const authorUpdated = await authorsModel.findByIdAndUpdate(
        id,
        { avatar: req.file.path },
        { new: true }
      );
      res.status(200).json(authorUpdated);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Errore duranante il caricamento del file" });
    }
});


export default router;