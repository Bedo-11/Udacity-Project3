// Enemies our player must avoid

let scores =0;

const score = document.getElementById('score');

var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, Player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x >505) {
        this.x = -100;
        var RSpeed = Math.floor(Math.random() * 10 + 1);
        this.speed = 60 * RSpeed; 
    }
        var enemyXleftMax = this.x - 70;
        var enemyXRightMax = this.x +70;
        var enemyYTopMax = this.y - 60;
        var enemyYDown = this.y + 60; 
        if(player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYDown){
            player.resetPosition(); // reset position for the player
            scores =0; // reset the score to 0!
            score.innerText = scores; // update the score in page
        }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class

const Player = function(char) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400; 
    this.h_step = 101; // horizontal step 
    this.v_step = 83;  // vertical step
    this.water = 50; // position of water
};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(dt) {
    // Show winner box when the player got 3 point!
    if(scores >= 3) {
        ShowWinnerBox();
        Enemy.x =-100; 
      }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Call this function when Collision happend or when you get to water
Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;
};



Player.prototype.handleInput = function(direction) {
        // Control for shift in any direction
        switch(direction) {
            case 'left':
                this.x >= this.h_step ? this.x -= this.h_step : this.x -=0;
                break;
            case 'right':
                this.x <= (this.h_step * 3) ? this.x += this.h_step : this.x +=0;
                break;
            case 'up':
                this.y -= this.v_step;
                if(this.y <= this.water) {
                    scores +=1; // increamnt the score
                    score.innerText = scores; // update it in the page
                    this.resetPosition();
                }
                break;
            case 'down':
                this.y <= (this.v_step *4) ? this.y += this.v_step : this.y +=0;
        }
};


// Now instantiate your objects.
var enemy1 = new Enemy(-80, 60 + 80 *0,(Math.floor(Math.random() * 4 + 1)* 60));
var enemy2 = new Enemy(-80, 60 + 80 *1,(Math.floor(Math.random() * 4 + 1)* 60));
var enemy3 = new Enemy(-80, 60 + 80 *2,(Math.floor(Math.random() * 4 + 1)* 60)); 
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1,enemy2,enemy3];
// Place the player object in a variable called player
let player = new Player();

// set function for WinnerBox to call it in case player win
function ShowWinnerBox(){
    let dialogs = document.querySelector("#dialog-box");
    dialogs.showModal();
}



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




debugger;
let i =0;
while(i<3) {
    console.log(++i);
}