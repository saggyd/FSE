import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ParentTaskSchema = new Schema({
	parentName: {
		type: String,
		unique: true
	}
});

export default mongoose.model('parents', ParentTaskSchema);