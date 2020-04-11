const games = require("./games");

module.exports = (app, baseUrl) => {
    games(app, baseUrl);
};
