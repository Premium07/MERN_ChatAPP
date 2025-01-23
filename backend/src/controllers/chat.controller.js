import User from "../models/auth.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in geting Users", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
