import { Ball } from './Ball.js';
import { Block } from './Block.js';

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

