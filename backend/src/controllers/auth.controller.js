import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: `User with this ${email} already exists` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        userId: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        message: "User registered successfully",
      });
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
