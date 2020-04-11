const _ = require("lodash");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const GAME_STATE = require("../../constants/game");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ games: [] }).write();

function checkWin(moves) {
    const winCombos = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "5", "7"],
    ];


    let gameOver = [];
    winCombos.forEach((combination) => {
        const intersection = _.intersectionWith(combination, moves, _.isEqual);
        if (intersection.length === 3 && !gameOver.length) {
            gameOver = intersection;
        }
    });
    return gameOver;
}

function aiNextMove(data) {
    const movesAvailable = Object.keys(data).filter(move => data[move] === "");
    if (movesAvailable.length) {
        const selectedMove = movesAvailable[Math.floor(Math.random() * movesAvailable.length)];
        return { board: { ...data, [selectedMove]: "ai" }, status: GAME_STATE.running };
    }
    return { board: data, status: GAME_STATE.draw };
}

function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

module.exports = {
    getAllGames: () => db.get("games").value(),
    getGameById: async (id) => {
        const game = await db.get("games").find({ id }).value();
        if (!game) {
            const error = new Error("Resource not found");
            error.name = "PageNotFound";
            throw error;
        }
        return game;
    },
    nextMove: async (id, data) => {
        const game = db.get("games").find({ id });
        if (game.value().status === GAME_STATE.running) {
            const userMoves = Object.keys(data).filter(move => data[move] === "user");

            if (checkWin(userMoves).length) {
                await game.assign({ board: data, status: GAME_STATE.user_win }).write();
                return game.value();
            }
            const d = aiNextMove(data);
            const aiMoves = Object.keys(d.board).filter(move => d.board[move] === "ai");
            if (d.status === GAME_STATE.running && checkWin(aiMoves).length) {
                await game.assign({ board: d.board, status: GAME_STATE.ai_win }).write();
                return game.value();
            }
            await game.assign({ board: d.board, status: d.status }).write();
            return game.value();
        }
        return game.value();
    },
    createGame: async (board) => {
        const games = await db.get("games");
        const id = uuid();
        await games.push({
            id,
            board,
            status: GAME_STATE.running,
        }).write();
        return id;
    },
    deleteGame: id => db.get("games").remove({ id }).write(),
};
