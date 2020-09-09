import Joi from "joi";
import messagesValidations from "./globalConfig/messages/messagesValidations";
export default Joi.object({
  fullname: Joi.string().required().messages(messagesValidations),
  email: Joi.string().min(3).max(30).required().messages(messagesValidations),
  mobile: Joi.string().required().messages(messagesValidations),
  city: Joi.string().required().messages(messagesValidations),
  gender: Joi.string().required().messages(messagesValidations),
  departamentId: Joi.number().required().messages(messagesValidations),
  date: Joi.date().required().messages(messagesValidations),
  isParament: Joi.boolean().invalid(false).messages(messagesValidations),
});
