// @desc    Get current user
// @route   GET /users/my-profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.email,
    username: req.user.username,
    email: req.user.email,
  }

  res.status(200).json(user)
}

module.exports = { getUserProfile }
