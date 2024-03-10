import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/Token.js';
import User from '../model/User.js';

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword
    };

    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ msg: 'Signup successfull' });
  } catch (error) {
    return response.status(500).json({ msg: 'Error while signing up user' });
  }
};

export const loginUser = async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username });

    if (!user) {
      return response.status(400).json({ msg: 'Username does not match' });
    }

    const match = await bcrypt.compare(request.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {
        expiresIn: '7d'
      });
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response.status(200).json({
        accessToken,
        refreshToken,
        name: user.name,
        username: user.username
      });
    } else {
      response.status(400).json({ msg: 'Password does not match' });
    }
  } catch (error) {
    response.status(500).json({ msg: 'error while login the user' });
  }
};

export const logoutUser = async (request, response) => {
  try {
    const { token } = request.body;
    await Token.deleteOne({ token });
    response.status(204).json({ msg: 'logout successfull' });
  } catch (error) {
    response.status(500).json({ msg: 'error while logging out' });
  }
};
