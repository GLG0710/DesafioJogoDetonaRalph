const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector(".menu-lives h2"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        endGame("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = (10 * state.values.result);
                state.values.hitPosition = null;
            } else {
                state.values.lives--;
                state.view.lives.textContent = "x" + state.values.lives; 
                if (state.values.lives === 0) {
                    setTimeout(() => {
                        endGame("Game Over! Suas vidas acabaram. O seu resultado foi: " + state.values.result)
                    }, 100); 
                }
            }
        });
    });
}

function endGame(message) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert(message);
    resetGame();
}

function resetGame() {
    state.values.curretTime = 60;
    state.values.result = 0;
    state.values.lives = 3;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = "x" + state.values.lives;
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function init() {
    randomSquare();
    addListenerHitBox();
}

init();