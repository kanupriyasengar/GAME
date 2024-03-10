class Obstacle {
    constructor(game, x) {
        this.game = game;
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.x = x;
        this.y = Math.random()*(this.game.height - this.scaledHeight);
        this.collisionX;
        this.collisionY;
        this.collisionRadius = this.scaledWidth * 0.5;
        this.speedY=Math.random() < 0.5 ? -1 * this.game.ratio : 1*this.game.ratio ;
        this.markedfordeletion=false;
    }
    update() {
        this.x -= this.game.speed;
        this.y+=this.speedY;
        this.collisionX=this.x;
        this.collisionY=this.y;
        if (this.y<=0 || this.y>= this.game.height - this.scaledHeight)
        {
            this.speedY*=-1;
        }
        if(this.isoffscreen()){
            this.markedfordeletion=true;
            this.game.obstacles=this.game.obstacles.filter(obstacles => !obstacles.markedfordeletion);
            console.log(this.game.obstacles.length);
            this.game.score++;
            if (this.game.obstacles.length<=0)this.game.gameover=true;
        }
    }
    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
        this.game.ctx.beginPath()
        this.game.ctx.arc(this.collisionX,this.collisionY,this.collisionRadius,0,Math.PI *2);
        this.game.ctx.stroke();
    }
    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }
    isoffscreen(){
        return this.x < -this.scaledWidth;
    }
}