import tasks from '../models/Task';
import parents from '../models/Parent';

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

export const getAllTasks = async (req, res, next) => {
	try {
		await tasks.find().populate('parentId').exec((err, data) => {
			if (err) sendError(res, err);
			sendSuccess(res, data);
		});
	} catch (err) {
		sendError(res, err);
	}
}

export const getAllParentTasks = async (req, res, next) => {
	try {
		await parents.find((err, data) => {
			if (err) sendError(res, err);
			if (data.length === 0) {
				addDefaultparent(req, res);
			} else {
				sendSuccess(res, data);
			}
		});
	} catch (err) {
		sendError(res, err);
	}
}

export const getTaskById = async (req, res, next) => {
	try {
		const id = req.params.id;
		await tasks.findById(id, (err, data) => {
			if (err) sendError(res, err);
			sendSuccess(res, data);
		});
	} catch (err) {
		sendError(res, err);
	}
}


const addDefaultparent = async (req, res, next) => {
	try {
		const postParentTask = new parents({
			parentName: 'No parent'
		});
		await postParentTask.save((err, details) => {
			if (err) sendError(res, err);
			parents.find((err, parent) => {
				if (err) sendError(res, err);
				sendSuccess(res, parent);
			});
		});
	} catch (err) {
		sendError(res, err);
	}
}

export const addTask = async (req, res, next) => {
	try {
		const projectId = req.body.projectId;
		const taskName = req.body.taskName;
		const priority = req.body.priority;
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const parentId = req.body.parentId;
		const userId = req.body.userId;
		const parentName = taskName;

		const postParentTask = new parents({
			parentName
		});
		const postTask = new tasks({
			projectId,
			taskName,
			priority,
			parentId,
			startDate,
			endDate,
			userId
		});

		await postTask.save((err, details) => {
			if (err) { sendError(res, err); }
			else {
				postParentTask.save((err, task) => {
					if (err) sendError(res, err);
					sendSuccess(res, 'success');
				});
			}
		});
	} catch (err) {
		sendError(res, err);
	}
}

export const updateTask = async (req, res, next) => {
	try {
		const id = req.params.id;
		await tasks.findByIdAndUpdate(id, req.body, (err, task) => {
			if (err) sendError(res, err);
			sendSuccess(res, task);
		});
	} catch (err) {
		sendError(res, err);
	}
}


export const deleteTask = async (req, res, next) => {
	try {
		const taskId = req.params.id;
		await tasks.findById(taskId, (err, task) => {
			if (err) sendError(res, err);
			tasks.findByIdAndRemove(taskId, (err, taskData) => {
				parents.find({ parentName: task.taskName }).remove().exec((err, parentData) => {
					sendSuccess(res, parentData);
				});
			});
		});
	} catch (err) {
		sendError(res, err);
	}
}