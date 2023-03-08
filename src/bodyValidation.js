import Joi from 'joi'

const condition = Joi.object().keys({
    name : Joi.string().alphanum().min(3).max(20).required(),
    joiningYear : Joi.number().integer().min(2000).max(2023),
    age : Joi.number().integer().min(18).max(60)
})

const dataToValidate = {
    name : "Barathkumar",
    joiningYear : 2020,
    age : 22
}

const result = condition.validate(dataToValidate);

console.log(result);