// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.speed = getRandomInt(80, 250);
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 550) {
        this.x = -100;
        }
    // Collison with enemy
    if (Math.abs(this.x - player.x) < 75 && Math.abs(this.y - player.y) < 78) {
        player.x = 202;
        player.y = 405;
        player.lives -= 1;
        }   
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lives = 3;
        this.score = 0;
        this.sprite = 'images/char-boy.png';
        this.gameOver = false;
        this.stopKey = false;

    }
    update() {
        // Once the player hits water, get back him to start line
        if (this.y < 0) {
            this.stopKey = true;
            setTimeout(() => {
                this.stopKey = false;
            }, 800);
            setTimeout(() => {
                this.x = 202;
                this.y = 405;
            }, 400);
        }
    }
    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
        this.lives === 0 ? this.gameOver = true : this.gameOver = false;
        if(player.gameOver || player.stopKey) return;
        switch(key) {
            case 'up':
                this.y -= 85;
                break;
            case 'down':
                this.y += 85;
                break;
            case 'left':
                this.x -= 100;
                break;
            case 'right':
                this.x += 100;
        };
        // fix the player in the canvas
        if(this.x <= 2) {this.x = 2;}
        if(this.x >= 400) {this.x = 400;}
        if(this.y >= 405 || this.y <= -85) {this.y = 405;}
        if(this.y < 0) {
            this.score += 1;
                }
        }
    }
    

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    enemy1 = new Enemy(10, 60),
    enemy2 = new Enemy(135, 145),
    enemy3 = new Enemy(350, 230)
];
// Place the player object in a variable called player
const player = new Player(202, 405);



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

// This returns a random integer between the specified values (from W3School)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}