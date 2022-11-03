let sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback){
    if(assetsStillLoading){
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
    else{
        callback();
    }
}


function loadAssets(callback){
    function loadSprite(fileName){
        assetsStillLoading++;
        let spriteImage = new Image();
        spriteImage.src = "/static/game/assets/sprites/" + fileName;

        spriteImage.onload = function(){
            assetsStillLoading--;
        }

        return spriteImage;
    }

    sprites.background = loadSprite('table.png');
    sprites.stick = loadSprite('stick.png');

    sprites.whiteBall = loadSprite('whiteball.png');
    sprites.blackBall = loadSprite('blackball.png');

    sprites.redBall = loadSprite('redball.png');
    sprites.redBalls = loadSprite('redballs.png');
    sprites.yellowBall = loadSprite('yellowball.png');
    sprites.yellowBalls = loadSprite('yellowballs.png');
    sprites.pinkBall = loadSprite('pinkball.png');
    sprites.pinkBalls = loadSprite('pinkballs.png');
    sprites.blueBall = loadSprite('blueball.png');
    sprites.blueBalls = loadSprite('blueballs.png');
    sprites.purpleBall = loadSprite('purpleball.png');
    sprites.purpleBalls = loadSprite('purpleballs.png');
    sprites.greenBall = loadSprite('greenball.png');
    sprites.greenBalls = loadSprite('greenballs.png');
    sprites.orangeBall = loadSprite('orangeball.png');
    sprites.orangeBalls = loadSprite('orangeballs.png');


    assetsLoadingLoop(callback);
}


function getBallSpriteByColor(color){
    switch(color){
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.whiteBall;

        case COLOR.RED:
            return sprites.redBall;
        case COLOR.REDS:
            return sprites.redBalls;
        case COLOR.YELLOW:
            return sprites.yellowBall; 
        case COLOR.YELLOWS:
            return sprites.yellowBalls;
        case COLOR.GREEN:
            return sprites.greenBall; 
        case COLOR.GREENS:
            return sprites.greenBalls;
        case COLOR.ORANGE:
            return sprites.orangeBall; 
        case COLOR.ORANGES:
            return sprites.orangeBalls;
        case COLOR.BLUE:
            return sprites.blueBall; 
        case COLOR.BLUES:
            return sprites.blueBalls;
        case COLOR.PURPLE:
            return sprites.purpleBall; 
        case COLOR.PURPLES:
            return sprites.purpleBalls; 
        case COLOR.PINK:
            return sprites.pinkBall; 
        case COLOR.PINKS:
            return sprites.pinkBalls; 
        
    }
}