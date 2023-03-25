import note from '../models/note.model';
import client from "../config/cache"

//create new note
export const newNote = async (body) => {
  const data = await note.create(body);
  return data;
};

//get all note
export const getAllnotes = async (body) => {
  const data = await note.find({ userID: body.userID });
  client.set(body.userID, JSON.stringify(data))
  return data;
};

//gets note by id
export const getNote = async (id, userID) => {
  const data = await note.findOne({ _id: id, userID: userID });
  return data;
};

//change trash status to true
export const Addintrash = async (_id, body) => {
  const data = await note.findOneAndUpdate(
    {
      _id: _id,
      userID: body.userID
    },
    {
      trash: true
    },
    {
      new: true
    }
  );
  client.set(_id, JSON.stringify(data))
  return data;
};

//change trash status to false
export const Removeformtrash = async (_id, body) => {
  const data = await note.findOneAndUpdate(
    {
      _id: _id,
      userID: body.userID
    },
    {
      trash: false
    },
    {
      new: true
    }
  );
  client.set(_id, JSON.stringify(data))
  return data;
};

//change Archive status to true
export const AddinArchive = async (_id, body) => {
  const data = await note.findOneAndUpdate(
    {
      _id: _id,
      userID: body.userID
    },
    {
      archive: true
    },
    {
      new: true
    }
  );
  client.set(_id, JSON.stringify(data))
  return data;
};

//change Archive status to false
export const RemoveformArchive = async (_id, body) => {
  const data = await note.findOneAndUpdate(
    {
      _id: _id,
      userID: body.userID
    },
    {
      archive: false
    },
    {
      new: true
    }
  );
  client.set(_id, JSON.stringify(data))
  return data;
};

//update note
export const updatenote = async (_id, body) => {
  const data = await note.findOneAndUpdate(
    {
      _id: _id,
      userID: body.userID
    },
    body,
    {
      new: true
    }
  );
  client.set(_id, JSON.stringify(data))
  return data;
};

//delete single note
export const deletenote = async (id, body) => {
  const data = await note.findOneAndDelete({_id:id, userID:body.userID});
  if(!data){
    throw new Error("Failed to delete note")
  }
  client.del(id);
  return data;
};
