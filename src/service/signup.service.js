const {User} = require("../model");
const passwordUtil = require("../utils/passwordUtil");


module.exports = async ({ name, email, password }) => {
    try {
      // Hash the password and store in DB
      console.log(name,email,password)
  
      const hashedPassword = await passwordUtil.getPasswordHash(password);
  
      // Create a user in DB

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      return { message: "Successfull" };
    } catch (error) {
      console.log("from service", JSON.stringify(error));
      throw new Error("something went wrong", JSON.stringify(error));
    }
  
    // Check if email already exists
    //   const emailExists = await sharedModels.users.read({ email });
  
    //   if (emailExists.length) {
    //     return new Error("Email already exist")
    //   }
  
    //   return { userId: user.insertId };
  };