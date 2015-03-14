/* Engine.js will render the game board and provide the looping functionality that will update the positions
 * of the player and the enemy objects.
*/

var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);


// Create the time delta information for smooth animation can call the update and render functions
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    }

// When the resources have been loaded, let the games begin
    function init() {

//        reset();
        lastTime = Date.now();
        main();
    }

// Update the players and the enemies location
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

//  Call the ememy and player update functions.  These are location in app.js
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

// Draw the game board and the player and enemy objects to the screen
    function render() {
        
// These are the game board resources
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;

// Draw the resources to the screen according to the row they are assigned.
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    
// Draw the enemy and player objects to the screen
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

// This will reset the players locations.  I did not use this function and placed this functionality
// in app.js
//    function reset() {
        // noop
//    }

// Load the resources that will be available to the game from the images directory
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
