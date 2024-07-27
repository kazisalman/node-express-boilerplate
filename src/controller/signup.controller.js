const constant = require("../constant");
const services = require("../service");



module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    // validate request/raise an exception
    //   const validatedBody = userModuleValidators.signup(req.body);
    const validate = {
      name: body.name,
      email: body.email,
      password: body.password,
    };

    // handle logic within service function
    const data = await services.signup({
      name: validate?.name,
      email: validate?.email,
      password: validate?.password,
    });

    // return response/raise an exception
    res.status(201).json({
      ...constant.signup.messages.ASUS0001,
      result: "Success",
    });
  } catch (error) {
    // next(JSON.parse(error.message));
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};