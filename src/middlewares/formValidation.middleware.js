import Joi from "Joi";

const fName = Joi.string().max(30).required();
const lName = Joi.string().max(30).required();
const email = Joi.string().email({ minDomainSegments: 2 }).required();
const phone = Joi.string().max(15).allow("");
const password = Joi.string().max(50).required();

export const newAdminUserFormValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      fName,
      lName,
      email,
      phone,
      password,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const loginAdminUserFormValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: email.required(),
      password,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const createNewTicketValidation = (req, res, next) => {
  const schema = Joi.object({
    fileNo: shortStr.required(),
    closeDate: dt.required(),
    fundDate: dt.required(),
    dealType: shortStr.required(),
    closerOne: shortStr.required(),
    commishClOne: num.required(),
    closerTwo: shortStr,
    commishClTwo: num1,
    mobCloser: shortStr,
    mobFee: num1,
    overage: num1.required(),
    processorOne: shortStr.required(),
    commishPrOne: num1.required(),
    processorTwo: shortStr,
    commishPrTwo: num1,
    clientRefOne: shortStr.required(),
    clientRefTwo: shortStr,
    realAgentOne: shortStr.required(),
    realAgentTwo: shortStr,
    lnOfficer: shortStr.required(),
    salesRepOne: shortStr.required(),
    salesTypeOne: shortStr.required(),
    salesRepTwo: shortStr,
    salesTypeTwo: shortStr,
    discount: shortStr.required(),
    discountApproval: shortStr,
    freedomCheck: num.required(),
    message: longStr,
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};
