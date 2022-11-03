function Game(){

}

Game.prototype.init = function(){
    this.GameFunction = new GameFunction();
    this.policy = new Rules();
}

Game.prototype.start = function(){

    PoolGame.init();
    PoolGame.mainLoop();


}

Game.prototype.mainLoop = function(){

    Canvas.clear();
    PoolGame.GameFunction.update();
    PoolGame.GameFunction.draw();

    // console.log(this.rules.turn);

    Mouse.reset();

    requestAnimationFrame(PoolGame.mainLoop);

}

let PoolGame = new Game();