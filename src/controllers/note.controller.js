import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

//New note
export const newNote = async (req, res, next) => {
  try {
    const data = await NoteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Notes added successfully'
    });
  } catch (error) {
    next(error);
  }
};

//get all notes
export const getAllnotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllnotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  }catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({   // 400 = bad
        code: HttpStatus.BAD_REQUEST,                     
        message: `${error}`
    });
  }
};

export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id, req.body.userID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Notes have fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const Addintrash = async (req, res, next) => {
  try {
    const data = await NoteService.Addintrash(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'trash status changed to true successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const Removeformtrash = async (req, res, next) => {
  try {
    const data = await NoteService.Removeformtrash(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'trash status changed to false successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const AddinArchive = async (req, res, next) => {
  try {
    const data = await NoteService.AddinArchive(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Archive status changed to true successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const RemoveformArchive = async (req, res, next) => {
  try {
    const data = await NoteService.RemoveformArchive(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Archive status changed to false successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updatenote = async (req, res, next) => {
  try {
    const data = await NoteService.updatenote(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deletenote = async (req, res, next) => {
  try {
    await NoteService.deletenote(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'note deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
