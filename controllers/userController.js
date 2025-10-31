// controllers/userController.js
const User = require('../Models/user');
const bcrypt = require('bcryptjs');

// === 1. LẤY THÔNG TIN USER ===
// (Dùng cho trang ProfilePage)
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "Không tìm thấy người dùng." });
		}
		// Lọc mật khẩu ra
		const { password, ...otherDetails } = user._doc;
		res.status(200).json(otherDetails);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// === 2. CẬP NHẬT USER ===
// (Dùng cho nút "Chỉnh sửa trang cá nhân")
exports.updateUser = async (req, res) => {
	// Kiểm tra xem có phải chính chủ không
	if (req.user.id !== req.params.id) {
		return res.status(403).json({ message: "Bạn chỉ có thể cập nhật tài khoản của mình!" });
	}

	try {

		if (req.body.password) {
			return res.status(403).json({ message: "Không thể cập nhật password!" });
		}

		if (req.body.username) {
			return res.status(403).json({ message: "Không thể cập nhật username!" });
		}

		// Tìm và cập nhật user
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body }, // $set: cập nhật mọi thứ trong body
			{ new: true }       // {new: true}: trả về user *sau khi* đã cập nhật
		);

		// Lọc mật khẩu ra
		const { password, ...otherDetails } = updatedUser._doc;
		res.status(200).json({
			message: "Cập nhật tài khoản thành công!",
			user: otherDetails
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};