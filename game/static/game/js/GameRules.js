function Rules(){
    this.turn = 0;
    this.firstCollision = true;
    let player1MatchScore = 0
    let player2MatchScore = 0

    this.players = [new Player(player1MatchScore), new Player(player2MatchScore)];
    this.foul = false;
    this.scored = false;
    this.won = false;
    this.turnPlayed = false;
    this.validBallsInsertedOnTurn = 0;
}

Rules.prototype.switchTurns = function(){
    this.turn++;
    this.turn%=2;
}


Rules.prototype.checkCollisionValidity = function(ball1,ball2){

    let currentPlayerColor = this.players[this.turn].type;

    if(this.players[this.turn].matchScore.value == 7 &&
       (ball1.type == 1 || ball2.type == 1)){
        this.firstCollision = false;
        return;
       }

    if(!this.firstCollision)
        return;

    if(currentPlayerColor == undefined){
        this.firstCollision = false;
        return;
    }

    if(ball1.type == 0){
        if(ball2.type != currentPlayerColor){
            this.foul = true;
        }
        this.firstCollision = false;
    }

    if(ball2.type == 0){
        if(ball1.type != currentPlayerColor){
            this.foul = true;
        }
        this.firstCollision = false;
    }
}

Rules.prototype.handleBallInHole = function(ball){

    let currentPlayer = this.players[this.turn];
    let secondPlayer = this.players[(this.turn+1)%2];

    if(currentPlayer.type == undefined){
        if(ball.type === 2){
            currentPlayer.type = 2;
            secondPlayer.type = 3;
        }
        else if(ball.type === 3){
            currentPlayer.type = 3;
            secondPlayer.type = 2;
        }
        else if(ball.type === 1){
            this.won = true; 
            this.foul = true;
        }
        else if(ball.type === 0){
            this.foul = true;
        }
    }

    if(currentPlayer.type === ball.type){
        currentPlayer.matchScore.increment();
        this.scored = true;
        this.validBallsInsertedOnTurn++;
    }
    else if(ball.type === 0){

        if(currentPlayer.type != undefined){
            this.foul = true;

            let ballsSet = Game.GameFunction.getBallsSetByColor(currentPlayer.type);

            let allBallsInHole = true;

            for (var i = 0 ; i < ballsSet.length; i++){
                if(!ballsSet[i].inHole){
                    allBallsInHole = false;
                }
            }

            if(allBallsInHole){
                this.won = true;
            }
        }
    }
    else if(ball.type === 1){

        if(currentPlayer.type != undefined){
            let ballsSet = Game.GameFunction.getBallsSetByColor(currentPlayer.type);

            for (var i = 0 ; i < ballsSet.length; i++){
                if(!ballsSet[i].inHole){
                    this.foul = true;
                }
            }
            
            this.won = true;
        }
    }
    else{
        secondPlayer.matchScore.increment();
        this.foul = true;
    }
}


Rules.prototype.updateTurnOutcome = function(){
    
    if(!this.turnPlayed){
        return;
    }

    if(this.firstCollision == true){
        this.foul = true;
    }

    // if(this.won){
        
    //     if(!this.foul){
    //         this.players[this.turn].totalScore.increment();
    //         if(AI.finishedSession){
    //             this.reset()
    //             setTimeout(function(){Game.GameFunction.reset();
    //             }, 1000);
    //         }
    //     }
    //     else{
    //         this.players[(this.turn+1)%2].totalScore.increment();
    //         if(AI.finishedSession){
    //             this.reset();
    //             setTimeout(function(){Game.GameFunction.reset();
    //             }, 1000);
    //         }
    //     }
    //     return;
    // }

    if(!this.scored || this.foul)
        this.switchTurns();

    this.scored = false;
    this.turnPlayed = false;
    this.firstCollision = true;
    this.validBallsInsertedOnTurn = 0;

    setTimeout(function(){Game.GameFunction.whiteBall.visible=true;}, 200);

    // if(AI_ON && this.turn === AI_PLAYER_NUM && AI.finishedSession){
    //     AI.startSession();
    // }
}

Rules.prototype.handleFoul = function(){

    if(!Mouse.left.down){
        Game.GameFunction.whiteBall.position = Mouse.position;
    }
}