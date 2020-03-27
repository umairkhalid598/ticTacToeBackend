const expressJwt = require("express-jwt");
const errorHandler = require("./errorHandler");
const { secret } = require("../config/config.js")();
const { User, Role } = require("../models");

module.exports = (roles = []) => {
    let role = roles;
    if (typeof role === "string") {
        role = [role];
    }

    return [
        expressJwt({ secret }),

        // eslint-disable-next-line consistent-return
        async (req, res, next) => {
            const user = await User.findOne({
                where: {
                    id: req.user.sub,
                },
                include: [{
                    model: Role,
                    as: "roles",
                    where: { name: req.user.roles[0] },
                }],
            });
            if (!user || (role.length && !role.filter(e => req.user.roles.includes(e)).length)) {
                const error = new Error();
                error.name = "UnauthorizedError";
                error.status = 401;
                errorHandler(error, req, res);
                return;
            }

            next();
        },
    ];
};
