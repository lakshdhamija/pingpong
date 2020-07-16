// SELECTING ITEMS
var ball = document.querySelector('.ball');
var rod1 = document.querySelector('.rod1');
var rod2 = document.querySelector('.rod2');

//local storage
const sName = "Your Name";
const sScore = "0";

var gameStart = false, windowW = window.innerWidth, windowH = window.innerHeight, score, maxScore, maxName, motion;
let ballChangeX = 1, ballChangeY = 1;

(function () {
    maxName = localStorage.getItem(sName);
    maxScore = localStorage.getItem(sScore);

    if (maxName === null || maxScore === null) {
        alert("This is the first game");
        maxScore = 0;
        maxName = "Your Name"
    } else {
        alert(maxName + " has the heightest score of " + maxScore * 100);
    }

    reset();
})();

window.addEventListener('keydown', function (event) {
    let change = 15;
    let rodSquare = rod1.getBoundingClientRect();
    if (event.code ==='ArrowRight' && ((rodSquare.x + rodSquare.width) < window.innerWidth)) { // rod cannot go beyond screen
        rod1.style.left = (rodSquare.x) + change + 'px'; // move rod1 right
        rod2.style.left = rod1.style.left; // move rod2 right
    } else if (event.code ==='ArrowLeft' && (rodSquare.x > 0)) { // moving to the left side
        rod1.style.left = (rodSquare.x) - change + 'px'; // changing position towards left side
        rod2.style.left = rod1.style.left;
    }


    if (event.code === "Enter") { // to start game
        if (!gameStart) { // if game has not started
            gameStart = true; // start the game
            let ballSquare = ball.getBoundingClientRect(); // get position of ball
            let xBall = ballSquare.x; // x coordinates of ball
            let yBall = ballSquare.y; // y coordinates of ball
            let ballWidth = ballSquare.width; // width of ball

            // getting position of rods
            let rod1H = rod1.offsetHeight;
            let rod1W = rod1.offsetWidth;
            let rod2H = rod2.offsetHeight;
            let rod2W = rod2.offsetWidth;
            motion = setInterval(function () { // moving ball every 15 ms
                // changing position of ball
                xBall += ballChangeX;
                yBall += ballChangeY;
                ball.style.left = xBall + 'px';
                ball.style.top = yBall + 'px';

                // curr position of rods
                rod1X = rod1.getBoundingClientRect().x;
                rod2X = rod2.getBoundingClientRect().x;


                if ((xBall + ballWidth) > windowW || xBall < 0) { // ball going out of bounds of screen on left and right
                    ballChangeX = -ballChangeX; // Reverse direction
                }
                let ballPos = xBall + ballWidth / 2; // main center x coordinate of ball

                if (yBall <= rod1H) { // if it reaches rod 1
                    ballChangeY = -ballChangeY; // Reverses the direction
                    score++;
                    if ((ballPos < rod1X) || (ballPos > (rod1X + rod1W))) { // if ball does not hit rod
                        gameEnd(score);
                    }
                }

                else if ((yBall + ballWidth) >= (windowH - rod2H)) {
                    ballChangeY = -ballChangeY; 
                    score++;
                    if ((ballPos < rod2X) || (ballPos > (rod2X + rod2W))) {
                        gameEnd(score);
                    }
                }
            }, 10);

        }
    }

});

function gameEnd(score) {
    var name = prompt('Please enter your name','Your Name');
    if (score > maxScore) {
        maxScore = score;
        if (name != null && name != "") {
            localStorage.setItem(sName, name);
        }
        localStorage.setItem(sScore, maxScore);
    }
    clearInterval(motion);
    reset();
    alert(name + " scored " + (score * 100) + ". Max score: " + (maxScore * 100));
}

function reset() {

    // resetting position of ball and rods
    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowW - ball.offsetWidth) / 2 + 'px';
    ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
    ballChangeY = 1;

    // resetting score
    score = 0;
    gameStart = false;

}