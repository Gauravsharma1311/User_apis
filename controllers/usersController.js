const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { firstName, lastName, maidenName, email, phone, username, password } =
    req.body;

  try {
    const user = await userService.createUser(
      firstName,
      lastName,
      maidenName,
      email,
      phone,
      username,
      password
    );
    res.status(201).json({
      message: "User successfully created",
      user,
      status: 201,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message,
      status: 400,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userService.loginUser(username, password);
    res.json({ message: "Login successful", token, status: 200 });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
      status: 500,
    });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await userService.fetchUsers();
    res.json({
      message: "Users fetched successfully",
      users,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
      status: 500,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
    res.json({
      message: "User fetched successfully",
      user,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
      status: 500,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, maidenName, email, phone, username } = req.body;

  try {
    const updatedUser = await userService.updateUser(
      id,
      firstName,
      lastName,
      maidenName,
      email,
      phone,
      username
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
    res.json({
      message: "User updated successfully",
      user: updatedUser,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
      status: 500,
    });
  }
};

const updateUserPartial = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await userService.updateUserPartial(id, updateData);
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
    res.json({
      message: "User updated successfully",
      user: updatedUser,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
      status: 500,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
    res.json({
      message: "User deleted successfully",
      user: deletedUser,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
      status: 500,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  fetchUsers,
  getUserById,
  updateUser,
  updateUserPartial,
  deleteUser,
};
