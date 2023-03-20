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

//change trash status to true
export const Addintrash = async (_id) => {
  const data = await note.findByIdAndUpdate(
    {
      _id
    },
    {
      trash : true
    },
    {
      new:true
    }
  );
  
  return data;
};

//change trash status to false
export const Removeformtrash = async (_id) => {
  const data = await note.findByIdAndUpdate(
    {
      _id
    },
    {
      trash : false
    },
    {
      new:true
    }
  );
  
  return data;
};

//change Archive status to true
export const AddinArchive = async (_id) => {
  const data = await note.findByIdAndUpdate(
    {
      _id
    },
    {
      archive : true
    },
    {
      new:true
    }
  );
  
  return data;
};

//change Archive status to false
export const RemoveformArchive = async (_id) => {
  const data = await note.findByIdAndUpdate(
    {
      _id
    },
    {
      archive : false
    },
    {
      new:true
    }
  );
  
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
