import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
// export const getAllUsers = async (req, res, next) => {
//   try {
//     const data = await UserService.getAllUsers();
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'All users fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
// export const getUser = async (req, res, next) => {
//   try {
//     const data = await UserService.getUser(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'User fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//  }
// };

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const Login = async (req, res, next) => {
  try {
    const data = await UserService.Login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const Signup = async (req, res, next) => {
  try {
    const data = await UserService.Signup(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
// export const updateUser = async (req, res, next) => {
//   try {
//     const data = await UserService.updateUser(req.params._id, req.body);
//     res.status(HttpStatus.ACCEPTED).json({
//       code: HttpStatus.ACCEPTED,
//       data: data,
//       message: 'User updated successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'email successfully send to the mail id'
    });
  } catch (error) {
    next(error);
  }
};

export const ResetPassword = async (req, res, next) => {
  try {
    await UserService.ResetPassword(req.body.userId, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Password reset completed'
    });
  } catch (error) {
    next(error);
  }
};
