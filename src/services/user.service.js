import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//create new user
export const Signup = async (body) => {
  const email = await User.findOne({ email: body.email });

  if (email) {
    throw new Error('Email id already exist');
  }

  if (body.password != body.confirmpassword) {
    throw new Error('password and confirm password should be same');
  }

  const encrypt = bcrypt.hashSync(body.password, 10); // saltRounds= 10
  body.password = encrypt;
  body.confirmpassword = encrypt;

  const data = await User.create(body);
  return data;
};

//get Login user
export const Login = async (body) => {
  // it find and return the user based on mail id
  const data = await User.findOne({ email: body.email });

  if (!data) {
    throw new Error('Invalid email id');
  }

  if (!bcrypt.compareSync(body.password, data.password)) {
    // here data.password will be decrypted and compared with body.password
    throw new Error('Wrong password');
  }
  return data;
};

//--------------------------------------------------

//update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

//delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

//get single user
// export const getUser = async (body) => {
//   const data = await User.findById(id);

//   return data;
// };
