

function GameFunction(){
    // this.score1 = 0
    // this.score2 = 0
    // this.whiteBall = new Ball(new Direction(413, 413), COLOR.WHITE);
    
    this.balls = CONSTANTS.ballsParams.map(params => new Ball(...params));

    // this.whiteBall = this.balls[this.balls.length - 1];
    this.whiteBall = this.balls.find(ball => ball.color === COLOR.WHITE);
    this.blackBall = this.balls.find(ball => ball.color === COLOR.BLACK);
    this.fullBall = this.balls.find(ball => ball.color === COLOR.RED);
    this.strippedBall = this.balls.find(ball => ball.color === COLOR.YELLOW);
    
    this.stick = new Stick(
        new Direction(413, 413), 
        this.whiteBall.shoot.bind(this.whiteBall),

    );

    this.table = {
        TopY: 90,
        RightX: 1418,
        BottomY: 743,
        LeftX: 90,
    }

    this.gameOver = false;
}

GameFunction.prototype.getBallsSetByColor = function(color){

    if(color === 2){
        return this.redBalls;
    }
    if(color === 3){
        return this.yellowBalls;
    }
    if(color === 0){
        return this.whiteBall;
    }
    if(color === 1){
        return this.blackBall;
    }
}

GameFunction.prototype.handleCollisions = function(){
    for(let i=0 ; i < this.balls.length ; i++){
        this.balls[i].handleBallInPocket();


        this.balls[i].collideWithTable(this.table);
        for(let j = i + 1 ; j < this.balls.length ; j++){
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWithBall(secondBall);
        }
    }
}

GameFunction.prototype.update = function(){

    this.handleCollisions();

    this.stick.update();

    // this.whiteBall.handleBallInPocket();
    // if (!this.whiteBall.visible){
        
    //     this.whiteBall.visible = true;
    //     this.whiteBall.position = new Direction(413, 413);
    // }

    // this.whiteBall.update(CONSTANTS.delta);


    for (let i = 0 ; i < this.balls.length ; i++) {
        this.balls[i].update(CONSTANTS.delta);
    }




    if(!this.ballsMoving() && this.stick.shot){

        this.stick.reposition(this.whiteBall.position);
        
    }

    
}

GameFunction.prototype.draw = function(){
    Canvas.drawImage(sprites.background, {x:0,y:0});

    // this.whiteBall.draw();

    for (let i = 0 ; i < this.balls.length; i++) {
        this.balls[i].draw();
    }

    this.stick.draw();

}

GameFunction.prototype.ballsMoving = function(){
    let ballsMoving = false;
    // return this.whiteBall.moving;
    for(let i = 0; i < this.balls.length ; i++){
        if(this.balls[i].moving){
            ballsMoving = true;
            break;
        }
    }

    return ballsMoving;
}