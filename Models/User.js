//import mongoose
const mongoose = require('mongoose');

//tao schema
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			min: 3,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			max: 50,
		},
		dateOfBirth: {
			type: String,
			require: true,
		},
		sex: {
			type: String,
			enum: ['male', 'female', 'other'],
			require: true,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6, // Mật khẩu ít nhất 6 ký tự
		},
		profilePicture: {
			type: String,
			default: '', // Ảnh đại diện, mặc định là rỗng
		},
		coverPicture: {
			type: String,
			default: '', // Ảnh bìa
		},
		friends: {
			type: Array, // Sẽ lưu một danh sách các ID của user khác
			default: [],
		},
	}, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);