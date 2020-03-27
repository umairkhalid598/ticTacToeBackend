module.exports = (err, req, res) => {
    const status = err.status ? err.status : err.code;

    if (typeof (err) === "string") {
        // custom application error
        return res.status(400)
            .json({ status: 400, errors: [{ msg: err }] });
    }

    if (err.name === "UnauthorizedError") {
        // jwt authentication error
        return res.status(401)
            .json({ status: 401, errors: [{ msg: "You are not authorized to access this route" }] });
    }
    if (err.name === "IllegalArgumentException") {
        return res.status(422)
            .json({ status: 422, errors: [{ msg: err.message }] });
    }
    if (err.errors && err.errors.length) {
        const errors = err.errors.map(error => ({
            param: error.path,
            msg: error.message,
        }));
        return res.status(422).json({
            status: 422,
            errors,
        });
    }

    // default to 500 server error
    return res.status(status || 500)
        .json({ status: status || 500, errors: [{ msg: err.message }] });
};
