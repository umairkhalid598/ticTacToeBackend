const gamesService = require("../../../service/v1/games");
const errorHandler = require("../../../helper/errorHandler");

module.exports = {
    getAllGames: async (req, res) => {
        try {
            const games = await gamesService.getAllGames();
            res.json(games);
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
    getGameById: async (req, res) => {
        try {
            const games = await gamesService.getGameById(req.params.game_id);
            res.json(games);
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
    getURL: async (req, res) => {
        try {
            const gameId = await gamesService.createGame(req.body.board);
            res.json({ url: `/games/${gameId}` });
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
    nextMove: async (req, res) => {
        try {
            const result = await gamesService.nextMove(req.params.game_id, req.body.board);
            res.json(result);
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
    deleteGame: async (req, res) => {
        try {
            await gamesService.deleteGame(req.params.game_id);
            res.send("Game successfully deleted ");
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
};
