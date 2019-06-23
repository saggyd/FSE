import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	projectName: {
		type: String,
		required: true,
		unique: true
	},
	managerId: {
		type: String,
		required: true,
	},
	priority: {
		type: String,
		required: true
	},
	startDate: {
		type: String
	},
	endDate: {
		type: String
	},
	tasks: {
		type: Number,
		required: true
	},
	completed: {
		type: Number,
		required: true
	}
});

export default mongoose.model('projects', ProjectSchema);