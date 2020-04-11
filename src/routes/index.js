const v1 = require("./v1");

module.exports = (app) => {
    v1(app, "/api/v1");
};
