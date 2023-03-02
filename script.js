// alert("js connected");
let ball = document.querySelector(".ball");

let board = document.querySelector(".board");
x = true;
y = true;

let leftplayerlives = 3;
let rightplayerlives = 3;
let boardcoord = board.getBoundingClientRect();

let leftpaddle = document.querySelector(".left");
let rightpaddle = document.querySelector(".right");



document.addEventListener("keydown", function (e) {

    if (e.key == "w") {

        movepaddle(leftpaddle, -window.innerHeight * 0.1)
    }
    else if (e.key == "s") {
        movepaddle(leftpaddle, window.innerHeight * 0.1)
    }

    else if (e.key == "ArrowUp") {
        movepaddle(rightpaddle, -window.innerHeight * 0.1)
    }

    else if (e.key == "ArrowDown") {
        movepaddle(rightpaddle, window.innerHeight * 0.1)
    }


})

function movepaddle(paddle, change) {

    let paddlebounds = paddle.getBoundingClientRect();
    if (paddlebounds.top + change >= boardcoord.top && paddlebounds.bottom + change <= boardcoord.bottom) paddle.style.top = paddlebounds.top + change + "px";

    // else if (paddlebounds.top + change < boardcoord.top) paddle.style.top = boardcoord.top + "px";
    // else if (paddlebounds.bottom + change > boardcoord.bottom) paddle.style.top = boardcoord.bottom - paddle.style.height + "px";

}


function resetgame() {

    ball.style.top = window.innerHeight * 0.45 + "px";
    ball.style.left = window.innerWidth * 0.45 + "px";
    requestAnimationFrame(moveball);
}

function moveball() {

    let ballcoord = ball.getBoundingClientRect();
    let balltop = ballcoord.top;
    let ballleft = ballcoord.left;
    let ballbottom = ballcoord.bottom;
    let ballright = ballcoord.right;


    let hastouchedleft = ballleft < boardcoord.left;
    let hastouchedright = ballright > boardcoord.right;
    if (hastouchedleft || hastouchedright) {
        if (hastouchedleft) {
            leftplayerlives--; document.querySelector(".leftlives").innerHTML = leftplayerlives;
            if (leftplayerlives == 0) { alert("game over, player b won"); document.location.reload(); }
            else return resetgame();
        }

        else { rightplayerlives--; document.querySelector(".rightlives").innerHTML = rightplayerlives; if (rightplayerlives == 0) { alert("game over, player a won"); document.location.reload(); } else return resetgame(); }


    }


    //handling vertical bound
    if (balltop <= boardcoord.top || ballbottom >= boardcoord.bottom) {

        y = !y;

    }



    let leftpaddlebounds = leftpaddle.getBoundingClientRect();
    let rightpaddlebounds = rightpaddle.getBoundingClientRect();


    if (ballleft <= leftpaddlebounds.right && ballright >= leftpaddlebounds.left && balltop + 30 >= leftpaddlebounds.top && ballbottom - 30 <= leftpaddlebounds.bottom) { x = !x; };

    if (ballleft <= rightpaddlebounds.right && ballright >= rightpaddlebounds.left && balltop + 30 >= rightpaddlebounds.top && ballbottom - 30 <= rightpaddlebounds.bottom) { x = !x; };


    //handling horizontal bound
    if (ballleft <= boardcoord.left || ballright >= boardcoord.right) { x = !x; }

    ball.style.top = y == true ? balltop + 4 + "px" : balltop - 4 + "px";

    ball.style.left = x == true ? ballleft + 4 + "px" : ballleft - 4 + "px";



    requestAnimationFrame(moveball);
}
requestAnimationFrame(moveball);


