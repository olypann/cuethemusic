x = 1022;
y = 413;

const CONSTANTS = {


    ballsParams: [
        [new Direction(413,413),COLOR.WHITE],
        [new Direction(x,y),COLOR.BLUES],

        [new Direction(x+34,y+20),COLOR.RED],
        [new Direction(x+34,y-20),COLOR.PINK],
        
        [new Direction(x+68,y-35),COLOR.REDS],
        [new Direction(x+68,y),COLOR.BLACK],
        [new Direction(x+68,y+43),COLOR.PINKS],

        [new Direction(x+104,y+39),COLOR.YELLOWS],
        [new Direction(x+104,y),COLOR.PURPLE],
        [new Direction(x+104,y-40),COLOR.YELLOW],
        [new Direction(x+104,y-79),COLOR.ORANGES],
        
    
        [new Direction(x+140,y+58),COLOR.ORANGE],
        [new Direction(x+140,y+19),COLOR.BLUE],
        [new Direction(x+140,y),COLOR.PURPLES],
        [new Direction(x+140,y-59),COLOR.GREENS],
        [new Direction(x+140,y-98),COLOR.GREEN],
        
        
    ],
    

    ballOrigin: new Direction(25, 25),
    // pocketRadius: 46,
    pocketRadius: 100,



    pockets: [
        new Direction(750, 5),
        new Direction(750, 821),
        new Direction(62, 35),
        new Direction(1435, 35),
        new Direction(62, 789),
        new Direction(1435, 789),

    ],

    delta: 1/177,
    maxShotPower: 7500,
    powerInterval: 120,
    originXInterval: 5,
    stickOrigin: new Direction(970, 11),
    stickShotOrigin: new Direction(950, 11),

    whiteBallInitialPos: new Direction(413, 413),
    ballOrigin: new Direction(25, 25),
    ballDiameter: 50,
    ballRadius: 19,
    minVelocityLength: 5,
    frictionEnergyLoss: 0.016,
    collisionEnergyLoss: 0.02,

    

    // const BALL_DIAMETER = 38,
    // const BALL_RADIUS = BALL_DIAMETER/2,
}