import users from '../models/User';

const sendError = (res, err) => {
	res.status(500).json({
		err
	});
};

const sendSuccess = (res, data) => {
	res.status(200).json({
		data
	});
};

export const getAllUsers = async (req, res, next) => {
	try {
		await users.find().exec((err, data) => {
			if (err) sendError(res, err);
			sendSuccess(res, data);
		});
	} catch (err) {
		sendError(res, err);
	}
}

export const getUserById = async (req, res, next) => {
	try {
		const id = req.params.id;
		await users.findById(id, (err, data) => {
			if (err) sendError(res, err);
			sendSuccess(res, data);
		});
	} catch (err) {
		sendError(res, err);
	}
}


export const addUser = async (req, res, next) => {
	try {
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
        const employeeId = req.body.employeeId;
        
		const postUser = new users({
			firstName,
			lastName,
			employeeId
		});

		await postUser.save((err, details) => {
			if (err) { sendError(res, err); }
			else {
				sendSuccess(res, 'success');
			}
		});
	} catch (err) {
		sendError(res, err);
	}
}

export const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		await users.findByIdAndUpdate(id, req.body, (err, user) => {
			if (err) sendError(res, err);
			sendSuccess(res, user);
		});
	} catch (err) {
		sendError(res, err);
	}
}


export const deleteUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		await users.findById(userId, (err, user) => {
			if (err) sendError(res, err);
			users.findByIdAndRemove(userId, (err, userData) => {
				sendSuccess(res, userData);
			});
		});
	} catch (err) {
		sendError(res, err);
	}
}