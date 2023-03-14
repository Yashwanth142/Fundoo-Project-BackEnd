import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  if(body.password != body.confirmpassword){
    throw new Error("password and confirm password should be same"); 
  }
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
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

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (body) => {
  const data = await User.findById(id);
  
  return data;
};

//get single user
export const login = async (body) => {                   
  // it find and return the user based on mail id
 const data = await User.findOne({email : body.email});

 if( !data ){
   throw new Error("Invalid email id")
 }

 return data;
};
