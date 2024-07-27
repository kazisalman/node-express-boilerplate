const {User} = require("../model");
const passwordUtil = require("../utils/passwordUtil");

// Login service
module.exports = async ({ email, password }) => {
  // Find the user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
      // If the user does not exist, throw an error
      throw new Error('User not found');
  }
    // Compare password
    const isValidPassword = await passwordUtil.comparePassword(
      password,
      user?.password
    );
  
  if (!isValidPassword) {
      // If the password is incorrect, throw an error
      throw new Error('Invalid password');
  }

  // Generate a JWT token
  const token = passwordUtil.getJWT(
    { userId: user.id },
    process.env.JWT_SECRET
  );

  // Return the user data (excluding the password for security reasons)
  // const { id, name } = user;
  // return { id, name, email };

  return {token}


};

