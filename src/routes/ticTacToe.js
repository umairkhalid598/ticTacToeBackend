const ticTacToeController = require("../controllers").ticTacToe;

module.exports = (app) => {
    app.get("/api/tic-tac-toe/url", ticTacToeController.getURL);
    app.post("/api/tic-tac-toe/move", ticTacToeController.nextMove);
};
