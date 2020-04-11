const gamesController = require("../../controllers/v1").games;

module.exports = (app, baseUrl) => {
    app.get(`${baseUrl}/games`, gamesController.getAllGames);
    app.post(`${baseUrl}/games`, gamesController.getURL);
    app.get(`${baseUrl}/games/:game_id`, gamesController.getGameById);
    app.put(`${baseUrl}/games/:game_id`, gamesController.nextMove);
    app.delete(`${baseUrl}/games/:game_id`, gamesController.deleteGame);
};
