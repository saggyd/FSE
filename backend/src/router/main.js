import express from 'express';
import {
	postValidation,
	putValidation,
	taskIdValidation
} from '../helper/validationHelper';

import {
	getAllTasks,
	getTaskById,
	getAllParentTasks,
	addTask,
	updateTask,
	deleteTask
} from '../controllers/TaskController';

import {
	addUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser
} from '../controllers/UserController';

import {
	addProject,
	getAllProjects,
	getProjectById,
	updateProject,
	deleteProject
} from '../controllers/ProjectController';

export default (app) => {
	const apiRoutes = express.Router();
	const TaskRoutes = express.Router();
	const ParentRoutes = express.Router();
	const UserRoutes = express.Router();
	const ProjectRoutes = express.Router();

	TaskRoutes.use((req, res, next) => {
		switch (req.method) {
			case 'GET':
				next();
				break;
			case 'POST':
				postValidation(req, res, next);
				break;
			case 'PUT':
				putValidation(req, res, next);
				break;
			case 'DELETE':
				taskIdValidation(req, res, next);
				break;
		}
	});

	app.use('/api', apiRoutes);
	apiRoutes.use('/tasks', TaskRoutes);
	apiRoutes.use('/parents', ParentRoutes);
	apiRoutes.use('/users', UserRoutes);
	apiRoutes.use('/projects', ProjectRoutes);

	TaskRoutes.get('/', getAllTasks);
	TaskRoutes.get('/:id', getTaskById);
	ParentRoutes.get('/', getAllParentTasks);
	TaskRoutes.post('/', addTask);
	TaskRoutes.put('/:id', updateTask);
	TaskRoutes.delete('/:id', deleteTask);

	UserRoutes.get('/', getAllUsers);
	UserRoutes.get('/:id', getUserById);
	UserRoutes.post('/', addUser);
	UserRoutes.put('/:id', updateUser);
	UserRoutes.delete('/:id', deleteUser);

	ProjectRoutes.get('/', getAllProjects);
	ProjectRoutes.get('/:id', getProjectById);
	ProjectRoutes.post('/', addProject);
	ProjectRoutes.put('/:id', updateProject);
	ProjectRoutes.delete('/:id', deleteProject);
	
} 