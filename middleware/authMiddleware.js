const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authHeader = req.header.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1]

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				return res.status(403).json({
					message: "Token không hợp lệ"
				})
			}

			req.user = user

			next()
		})
	} else {
		return res.status(401).json({
			message: "Bạn cần đăng nhập để truy cập tài nguyên này"
		})
	}
}

module.exports = { verifyToken };