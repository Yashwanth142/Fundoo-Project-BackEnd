import express from 'express';
import * as notecontroller from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userAuth, notecontroller.getAllnotes);

//route to create a new note
router.post('', userAuth, newNoteValidator, notecontroller.newNote);

//route to get a single user by their  id
router.get('/:_id', userAuth, notecontroller.getNote);

//route to update a single user by their user id
router.put('/:_id', userAuth, notecontroller.updatenote);

//route to delete a single user by their user id
router.delete('/:_id', userAuth, notecontroller.deletenote);

//add in trash true
router.put('/:_id/addtrash', userAuth, notecontroller.Addintrash);

//remove form trash false
router.put('/:_id/removetrash', userAuth, notecontroller.Removeformtrash);

//add in archive true
router.put('/:_id/addArchive', userAuth, notecontroller.AddinArchive);

//remove form archive false
router.put('/:_id/removeArchive', userAuth, notecontroller.RemoveformArchive);

export default router;
