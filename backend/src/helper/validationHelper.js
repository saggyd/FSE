import * as Joi from 'joi';

const sendError = (res, err) => {
	res.status(500)
		.json({
			err
		});
}

const postSchema = () => {
	return Joi.object().keys({
		projectId: Joi.string().required(),
		userId: Joi.string().required(),
		taskName: Joi.string().required(),
		priority: Joi.number().min(1).max(100).required(),
		parentId: Joi.string().allow('').required(),
		startDate: Joi.string().required(),
		endDate: Joi.string().required()
	})
}

const putSchema = () => {
	return Joi.object().keys({
		_id: Joi.string().required(),
		projectId: Joi.string().required(),
		userId: Joi.string().required(),
		taskName: Joi.string().required(),
		priority: Joi.number().min(1).max(100).required(),
		parentId: Joi.string().allow('').required(),
		startDate: Joi.string().required(),
		endDate: Joi.string().required()
	})
}

const taskIdSchema = () => {
	return Joi.object().keys({
		_id: Joi.string().required()
	})
}

export const postValidation = (req, res, next) => {
	Joi.validate(req.body, postSchema(), (err, result) => {
		if (err) {
			sendError(res, err);
		} else {
			next();
		}
	});
}

export const putValidation = (req, res, next) => {
	Joi.validate(req.body, putSchema(), (err, result) => {
		if (err) {
			sendError(res, err);
		} else {
			next();
		}
	});
}

export const taskIdValidation = (req, res, next) => {
	const getPath = req.path.split('/');
	Joi.validate({
		'_id': getPath[1]
	}, taskIdSchema(), (err, result) => {
		if (err) {
			sendError(res, err);
		} else {
			next();
		}
	});
}