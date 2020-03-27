const ticTacToeService = require("../../service/ticTacToe");
const errorHandler = require("../../helper/errorHandler");

module.exports = {
    getURL: (req, res) => {
        try {
            res.json({ status: res.statusCode, data: "/ticTacToe" });
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
    nextMove: (req, res) => {
        try {
            const result = ticTacToeService.nextMove(req.body.data);
            res.json({ status: res.statusCode, data: result });
        } catch (e) {
            errorHandler(e, req, res);
        }
    },
};
