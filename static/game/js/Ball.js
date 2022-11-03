

function Ball(position, color){
    this.position = position;
    this.velocity = new Direction();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
    this.color = color;
    this.visible = true;
    this.type = 2;
    // types: 
    //         white-0
    //         black-1
    //         full-2
    //         stripped-3
}

Ball.prototype.update = function(delta){

    // this.position.addTo(this.velocity);

    if(!this.visible){
        return;
    }

    this.position.addTo(this.velocity.mult(delta));
    this.velocity = this.velocity.mult(0.984);

    if(this.velocity.length() < 5){
        this.velocity = new Direction();
        this.moving = false;
    }
}

Ball.prototype.draw = function(){
    if(!this.visible){
        return;
    }
    Canvas.drawImage(this.sprite, this.position, CONSTANTS.ballOrigin);
}


Ball.prototype.shoot = function(power, rotation){

    this.velocity = new Direction(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving = true;
}

Ball.prototype.collideWithBall = function(ball){

    if(!this.visible || !ball.visible){
        return;
    }

    const n = this.position.subtract(ball.position);

    const dist = n.length();

    if(dist > CONSTANTS.ballDiameter){
        return;
    }

    //preventing balls from colliding with each other
    const mtd = n.mult((CONSTANTS.ballDiameter - dist)/dist);
    this.position = this.position.add(mtd.mult(0.5));
    ball.position.subtract(mtd.mult(0.5));


    const un = n.mult(1/n.length());

    const ut = new Direction(-un.y, un.x);

    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    let v1nTag = v2n;
    let v2nTag = v1n;

    v1nTag = un.mult(v1nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);

    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;
}

Ball.prototype.handleBallInPocket = function(){

    if(!this.visible){
        if(this.color === 3){
            this.moving = false;
            this.visible = true;
            this.position = new Direction(413, 413);
        }
        return;
    }

    let inPocket = CONSTANTS.pockets.some(pocket => {
        return this.position.distFrom(pocket) < CONSTANTS.pocketRadius;
    });

    if(!inPocket){

        return;
    }
    

    this.visible = false;
    this.moving = false;
}


Ball.prototype.collideWithTable = function(table){
    if(!this.moving || !this.visible){
        return;
    }

    let collided = false;

    if(this.position.y <= table.TopY + CONSTANTS.ballRadius){
        this.position.y = table.TopY + CONSTANTS.ballRadius;
        this.velocity = new Direction(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x >= table.RightX - CONSTANTS.ballRadius){
        this.position.x = table.RightX - CONSTANTS.ballRadius;
        this.velocity = new Direction(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(this.position.y >= table.BottomY - CONSTANTS.ballRadius){
        this.position.y = table.BottomY - CONSTANTS.ballRadius;
        this.velocity = new Direction(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x <= table.LeftX + CONSTANTS.ballRadius){
        this.position.x = table.LeftX + CONSTANTS.ballRadius;
        this.velocity = new Direction(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(collided){
        this.velocity = this.velocity.mult(0.98);
    }
}

Ball.prototype.collideWith = function(object){
    if(object instanceof Ball){
        this.collideWithBall(object);
    }
    else{
        this.collideWithTable(object);
    }

}

// if(this.color === 3){
//     this.visible = true
//     this.position = new Direction(413, 413);
//     return;
// }