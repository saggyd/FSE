import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	employeeId: {
        type: String,
		unique: true
	},
	projectId: {
        type: Array
	},
	taskId: {
        type: Array
	}
});

export default mongoose.model('users', UserSchema);