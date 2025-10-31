//import nhung thu can thiet
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//logic dang ky

exports.register = async (req, res) => {
	try {
		// lay thong tin tu client gui len server
		const {
			username,
			name,
			dayOfBirth,
			sex,
			email,
			password,
		} = req.body
		// kiem tra xem username/email da ton tai chua

		const existingUser = await User.findOne({
			$or: [
				{ username: username }
			]
		})
		if (existingUser) {
			return res.status(400).json({ message: "username da ton tai" })
		}

		// ma hoa mat khau
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		// tao mot user moi
		const newUser = new User(
			{
				username: username,
				name: name,
				dayOfBirth: dayOfBirth,
				sex: sex,
				email: email,
				password: hashedPassword
			}
		)

		// luu user
		const savedUser = await newUser.save()

		//tra ve res 
		res.status(201).json({
			message: "Tạo tài khoản thành công",
			username: username
		})
	} catch (err) {
		console.log("loi:", err)
		res.status(500).json({
			message: "co loi xay ra",
			error: err.message
		})
	}
}

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });

		if (!user) {
			return res.status(404).json({ message: "tai khoan khong ton tai" })
		}

		const isPasswordCerrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCerrect) {
			return res.status(400).json({ message: "mat khau khong dung" })
		}

		// taoj JWT
		const payload = {
			userId: user._id,
			username: user.username
		}

		const secretKey = process.env.JWT_SECRET;

		const token = jwt.sign(payload, secretKey);

		const { password: userPassword, ...others } = user._doc;

		res.status(200).json({
			message: "dang nhap thanh cong",
			user: others,
			token: token
		})
	} catch (err) {
		console.log("loi:", err)
		res.status(500).json({
			message: "co loi xay ra",
			error: err.message
		})
	}
}