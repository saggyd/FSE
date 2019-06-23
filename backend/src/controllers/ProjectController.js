import projects from '../models/Project';
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

export const getAllProjects = async (req, res, next) => {
	try {
		await projects.find((err, data) => {
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

export const getProjectById = async (req, res, next) => {
	try {
		const id = req.params.id;
		await projects.findById(id, (err, data) => {
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

export const addProject = async (req, res, next) => {
	try {
		const projectName = req.body.projectName;
		const priority = req.body.priority;
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const managerId = req.body.managerId;

		

		const postProject = new projects({
			projectName,
			priority,
			startDate,
			endDate,
			tasks: 0,
			completed: 0,
			managerId
		});
		await postProject.save((err, details) => {
			if (err) { sendError(res, err); }
			else {				
				users.findOneAndUpdate({"_id": managerId},  { $push: { projectId:  details._id }}, (err, user) => {
					console.log("user", user);
					if (err) sendError(res, err);
					sendSuccess(res, 'success');
				});
				
				//sendSuccess(res, 'success');
			}
		});
	} catch (err) {
		sendError(res, err);
	}
}

export const updateProject = async (req, res, next) => {
	try {
		const id = req.params.id;

		await projects.findByIdAndUpdate(id, req.body, (err, project) => {
			if (err) sendError(res, err);
			users.findOneAndUpdate({},  { $pull: { projectId:  id }}, (err, user) => {
				if (err) sendError(res, err);
				users.findOneAndUpdate({"_id": req.body.managerId},  { $push: { projectId:  id }}, (err, user) => {
					if (err) sendError(res, err);
					sendSuccess(res, 'success');
				});
				 
			});
		});
	} catch (err) {
		sendError(res, err);
	}
}


export const deleteProject = async (req, res, next) => {
	try {
		const projectId = req.params.id;
		await projects.findById(projectId, (err, project) => {
			if (err) sendError(res, err);
			projects.findByIdAndRemove(projectId, (err, projectData) => {
				/* parents.find({ parentName: project.projectName }).remove().exec((err, parentData) => {
					sendSuccess(res, parentData);
				}); */
				sendSuccess(res, "success");
			});
		});
	} catch (err) {
		sendError(res, err);
	}
}