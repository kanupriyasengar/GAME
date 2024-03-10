class Game {
        constructor(canvas, context) {
            this.canvas = canvas;
            this.ctx = context;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.baseheight = 720;
            this.ratio = this.height / this.baseheight;
            this.player = new Player(this);
            this.obstacles = [];
            this.noofobstacles=3;
            this.background=new Background(this);
            
            this.gravity;
            // this.resize(window.innerHeight, window.innerWidth);
            this.speed;
            this.score;
            this.gameover;
            this.resize(window.innerHeight, window.innerWidth);
            window.addEventListener('resize', e => {

                this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
            });
            //mouse controls
            this.canvas.addEventListener('mousedown',e =>  {
                this.player.flap();
            });
            //keyboard controls.....
            window.addEventListener('keydown',e=>
            {
                console.log(e.key);
                if(e.key==' ' || e.key === 'Enter')
                this.player.flap();
            });
            //touch controls
            this.canvas.addEventListener('touchstart',e => {
                console.log(e);
            })
        }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'blue';
        this.ctx.font='15px  sans-serif'
        this.ctx.textAlign='right';
        this.ctx.lineWidth=3;
        this.ctx.lineWidth='white'
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseheight;

        this.gravity=0.15 * this.ratio;
        this.speed=3 * this.ratio;
        this.background.resize();
        this.player.resize();
        this.createobstacles();
        this.obstacles.forEach(obstacles => {
            obstacles.resize();
        });
        this.score=0;
        this.gameover=false;
        this.timer=0;
       
    }
    render(deltaTime) {
        if (!this.gameover)this.timer+=deltaTime;
        // console.log(deltaTime);
      
       this.background.update();
       this.background.draw();
       this.drawstatustext()
        this.player.update();
        this.player.draw();
        this.obstacles.forEach(obstacles => {
            obstacles.update();
            obstacles.draw();
        });

    }
    createobstacles(){
        this.obstacles=[];
        const firstX=this.baseheight * this.ratio;
        const obstaclespacing=600 * this.ratio;
        for(let i =0;i<this.noofobstacles;i++){
            this.obstacles.push(new Obstacle(this,firstX+i*obstaclespacing));
        }
    }
    formattimer(){
        return (this.timer * 0.001).toFixed(1);
    }
    drawstatustext(){
        this.ctx.save();

        this.ctx.fillText('Score:'+this.score,this.width-10,30);
        this.ctx.textAlign='left';
        this.ctx.fillText('Timer :' + this.formattimer() , 10,30);
        if(this.gameover){
            this.ctx.textAlign='center';
            this.ctx.font = '30px sans-serif'
            this.ctx.fillText('GAME-OVER',this.width * 0.5,this.height *0.5);
        }
                this.ctx.restore();
    }

}

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx);
    let lasttime=0;
    function animate(timeStamp) {
        const deltaTime =timeStamp-lasttime
        lasttime=timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        // if (!game.gameover)requestAnimationFrame(animate);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});