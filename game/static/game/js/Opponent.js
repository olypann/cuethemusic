function Opponent(power, rotation){
    this.power = power || (Math.random() * 75 + 1);
    this.rotation = rotation || (Math.random()*6.283)-3.141;
    this.evaluation = 0;
}

Opponent.prototype.playTurn = function(){

    Game.GameFunction.stick.rotation = rotation;
    Game.GameFunction.stick.trackMouse = false;

    setTimeout(() => {

        Game.GameFunction.stick.visible = true;
        Canvas2D.clear();
        Game.GameFunction.draw();

        DISPLAY = true;
        
        requestAnimationFrame(Game.mainLoop);

        Game.GameFunction.stick
        .shoot(
            power, 
            rotation
        );
        Game.GameFunction.stick.trackMouse = true;

    }, 1000);
}