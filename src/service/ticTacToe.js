const _ = require("lodash");

function checkWin(data, moves) {
    const winCombos = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "4", "7"],
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
        console.log(movesAvailable);
        return { game: { ...data, [selectedMove]: "ai" } };
    }
    return { game: data, gameOver: "Draw. Game Over" };
}

module.exports = {
    nextMove: (data) => {
        const userMoves = Object.keys(data).filter(move => data[move] === "user");
        const aiMoves = Object.keys(data).filter(move => data[move] === "ai");
        if (checkWin(data, userMoves).length) {
            return { game: data, gameOver: "Congratulations! User Wins" };
        }
        const d = aiNextMove(data);

        if (!d.gameOver && checkWin(d.game, aiMoves).length) {
            return { game: data, gameOver: "You Lose" };
        }
        return d;
    },
};
