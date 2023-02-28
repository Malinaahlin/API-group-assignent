const { fn } = require("sequelize");

const catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next)
    }
}

class CustomAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = 404
        this.name = "NotFoundError"
    }
}

class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = 403
        this.name = "UnauthorizedError"
    }
}

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = 401
        this.name = "UnauthenticatedError"
    }
}

module.exports = {
    catchErrors,
    NotFoundError,
    UnauthorizedError,
    UnauthenticatedError
}
