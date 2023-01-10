module.exports = (error, req, res, next) => {
    let message = 'Internal Server Error'
    let status = 500
    console.log(error);
    switch (error.name) {
        case 'Email is required':
            message = 'Email is required'
            status = 404
            break;
        case 'Password is required':
            message = 'Password is required'
            status = 404
            break;
        case 'InvalidCredentials':
            message = 'Email/Password Invalid'
            status = 401
            break;
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            message = error.errors[0].message
            status = 400
            break;
    }
    res.status(status).json({ message })
}