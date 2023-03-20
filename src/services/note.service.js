import note from '../models/note.model';

//create new note
export const newNote = async (body) => {
  const data = await note.create(body);
  return data;
};

//get all note
export const getAllnotes = async () => {
  const data = await note.find();
  return data;
};

//gets note by id
export const getNote = async (id) => {
  const data = await note.findById(id);
  return data;
};

//update note
export const updatenote = async (_id, body) => {
  const data = await note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single note
export const deletenote = async (id) => {
  await note.findByIdAndDelete(id);
  return '';
};
