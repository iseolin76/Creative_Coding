// import Ball from './Ball.js';
fu

class App {
  constructor() {
    //canvas element를 추가 후 Context를 2d로 지정
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    //body에 canvas element를 자식요소로 추가
    document.body.appendChild(this.canvas);

    //resize 이벤트를 생성 및 호출
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
    this.block = new Block(700, 30, 300, 450);

    //animation을 구동시키는 함수 호출
    window.requestAnimationFrame(this.animate.bind(this));
  }

  //브라우저는 사이즈가 가변적이기 때문에 브라우저 크기를 받아오고 canvas크기를 지정
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  //animation 효과를 주는 함수
  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    //현재 시점 전의 그림을 지워줌
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.block.draw(this.ctx);
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }
}

//화면이 로드되었을 때 새로운 App class를 생성
window.onload = () => {
  new App();
}

class Ball {
  //Ball 생성자
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;
    this.x = diameter + (Math.random() * stageWidth - diameter);
    this.y = diameter + (Math.random() * stageHeight - diameter);
  }

  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx;
    this.y += this.vy;

    //화면에 닿으면 튕기는 함수 호출
    this.bounceWindow(stageWidth, stageHeight);

    //Block에 닿으면 튕기는 함수 호출
    this.bounceBlock(block);

    ctx.fillStyle = '#fdd700';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  //화면에 닿으면 튕기는 함수
  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  //Block에 닿으면 튕기는 함수
  bounceBlock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min == min1) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (min == min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}

class Block {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.maxX = width + x;
    this.maxY = height + y;
  }

  draw(ctx) {
    const xGap = 80;
    const yGap = 60;

    //Block 그리기
    ctx.fillStyle = '#ff384e'
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();

    //밑 그림자 그리기
    ctx.fillStyle = '#190f3a';
    ctx.beginPath();
    ctx.moveTo(this.maxX, this.maxY);
    ctx.lineTo(this.maxX - xGap, this.maxY + yGap);
    ctx.lineTo(this.x - xGap, this.maxY + yGap);
    ctx.lineTo(this.x, this.maxY);
    ctx.fill();

    //옆 그림자 그리기
    ctx.fillStyle = '#9d0919'
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.maxY);
    ctx.lineTo(this.x - xGap, this.maxY + yGap);
    ctx.lineTo(this.x - xGap, this.maxY + yGap - this.height);
    ctx.fill()
  }
}
