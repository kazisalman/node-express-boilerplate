const constant = require("../constant");
const service = require("../service");

module.exports = async (req, res, next) => {
  try {
    const { body } = req;

    // validate request/raise an exception
    //   const validatedBody = userModuleValidators.login(req.body);

    const validatedBody = {
      email: body.email,
      password: body.password,
    };
    // handle logic within service function
    const data = await service.login({
      email: validatedBody.email,
      password: validatedBody.password,
    });

    // return response/raise an exception
    res.status(201).json({
      ...constant.login.messages.ALIS0001,
      ...data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


 