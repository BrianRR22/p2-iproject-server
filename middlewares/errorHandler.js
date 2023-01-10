module.exports = (error, req, res, next) => {
    let message = 'Internal Server Error'
    let status = 500

    switch (error.name) {
        case '':

            break;
    }
    res.status(status).json({ message })
}