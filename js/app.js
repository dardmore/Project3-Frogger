var canvasHeight = 606, canvasWidth = 505;
var numRows = 6, numCols = 5;
var colWidth = canvasWidth / numCols;
var rowHeight = 75;
var playerStartingXPos = colWidth * 2;
var playerStartingYPos = rowHeight * 5;

var numEnemies = 3;
var enemyStartingYPos = [rowHeight * 1, rowHeight * 2, rowHeight * 3];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * canvasWidth;
    this.y = enemyStartingYPos[numBug];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (100 * dt);
    if (this.x >= canvasWidth) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = playerStartingXPos;
    this.y = playerStartingYPos;
    this.keyPress = ' ';
};

Player.prototype.update = function () {

// On keyPress, move player left, right, up or down.  The player will move one square.  The if statements are used to make sure the player does not move off of the canvas.
    switch (this.keyPress) {
        case 'up' :
            if (this.y - rowHeight >= 0) {
                this.y = this.y - rowHeight;
            };
        break;
        case 'down' :
            if (this.y + rowHeight < rowHeight * numRows) {
                this.y = this.y + rowHeight;
            };
        break;
        case 'left' :
            if (this.x - 101 >= 0) {
                this.x = this.x - 101;
            };
        break;
        case 'right' :
            if (this.x + 101 < colWidth * numCols) {
                this.x = this.x + 101;
            };
        break;
    }
    this.keyPress = ' ';
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

// Check to see if there was a collision between player and enemy    
    checkCollision();
    
// Check to see if the player made it to the finish line
    checkFinish();
};

Player.prototype.handleInput = function (key) {
    this.keyPress = key;
};

// Check for a collision.  If the ememy and player 'y' position is the same and the player 'x' position is within the range of the enemy 'x' position, then reset the player to the starting position.
function checkCollision() {
    for (i = 0; i < numEnemies; i++) {
        if ((player.x >= allEnemies[i].x - 50) && (player.x <= allEnemies[i].x + 80) && (player.y === allEnemies[i].y)) {
            player.x = playerStartingXPos;
            player.y = playerStartingYPos;
            player.keyPress = ' ';
        }
    }
}

// If player reaches the water, reset the player position to the starting position
function checkFinish() {
    if (player.y === 0) {
        player.x = playerStartingXPos;
        player.y = playerStartingYPos;

// Reset the horizontal positions of the enemies
        for (numBug = 0; numBug < numEnemies; numBug++) {
            allEnemies[numBug].x = Math.random() * canvasWidth;
        }
        player.keyPress = ' ';
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (numBug = 0; numBug < numEnemies; numBug++) {
    allEnemies[numBug] = new Enemy;
}var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
