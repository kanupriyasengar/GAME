class Player {
    constructor(game) {
        this.game = game;
        this.x = 20;
        this.y;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width;
        this.height;
        this.speedY;
        this.flapspeed;
    }

    draw() {
        this.game.ctx.fillStyle = 'blue'; // Set color for better visibility
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speedY;

        if (!this.istouchingbottom()) {
            this.speedY+=this.game.gravity;
            
         }
        if (this.istouchingbottom()) {
            this.y=this.game.height-this.height;
        }
    }

    resize() {
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speedY = -5 * this.game.ratio;
        this.flapspeed = 5 * this.game.ratio;
    }

    istouchingtop() {
        return this.y <= 0;
    }

    istouchingbottom() {
        return this.y >= this.game.height - this.height;
    }

    flap() {
        if (!this.istouchingtop()) {
            this.speedY = -this.flapspeed;
        }
    }}