const { users } = require("../constants/users")
const { NotFoundError, UnauthorizedError } = require("../utils/errors")
const { sequelize } = require("../database/config")
const { QueryTypes } = require("sequelize")

exports.getAllUsers = async (req, res) => {
	const [users, metadata] = await sequelize.query("SELECT id, email FROM users")
	return res.json(users)
}

exports.getUserById = async (req, res) => {
	const userId = req.params.userId

	const [user, metadata] = await sequelize.query("SELECT id, email FROM users WHERE id = $userId", {
		bind: { userId },
		type: QueryTypes.SELECT,
	})
	if (!user) throw new NotFoundError("That user does not exist")

	return res.json(user)
}

exports.deleteUserById = async (req, res) => {
	const userId = req.params.userId

	if (userId != req.user?.userId && req.user.accontType !== users.ADMIN) {
		throw new UnauthorizedError('Unauthorized Access')
	}

	const [results, metadata] = await sequelize.query('DELETE FROM users WHERE id = $userId RETURNING *', {
		bind: { userId },
	})

	if (!results || !results[0]) throw new NotFoundError('That user does not exist')

	await sequelize.query('DELETE FROM users_lists WHERE fk_usersid = $userId', {
		bind: { userId },
	})

	return res.sendStatus(204)
}