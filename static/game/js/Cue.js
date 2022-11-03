// const STICK_ORIGIN = new Direction(970, 11);
// const STICK_SHOOT_ORIGIN = new Direction(950, 11);


function Stick(position, onShoot){
    this.position = position;
    this.origin = (new Direction(970, 11)).copy();
    this.rotation = 0;
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
}

Stick.prototype.update = function(){

    if(this.shot){
        return;
    }

    if(Mouse.left.down){
        this.increasePower();
    }
    else if(this.power > 0){
        this.shoot();
    }

    this.updateRotation();
    
    
}

Stick.prototype.draw = function(){
    Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
}

Stick.prototype.updateRotation = function(){
    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;

    this.rotation = Math.atan2(opposite, adjacent);
}

Stick.prototype.increasePower = function(){
    if(this.power > CONSTANTS.maxShotPower){
        return;
    }
    this.power += 120;
    this.origin.x += 5;
}

Stick.prototype.shoot = function(){
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.origin = (new Direction(953, 11)).copy();
    this.shot = true;
}

Stick.prototype.reposition = function(position){
    this.position = position.copy();
    this.origin = (new Direction(970, 11)).copy();
    this.shot = false;
}