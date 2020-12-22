import { GlowParticle } from './GlowParticle.js';

const COLORS = [
  { r: 45, g: 74, b: 227 }, //blue
  { r: 250, g: 255, b: 89 }, //yellow
  { r: 255, g: 101, b: 248 }, //pupple
  { r: 44, g: 209, b: 252 }, //skyblue
  { r: 54, g: 233, b: 84 } //green
];

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

    //총 파티클 수 지정 및 반지름 지정
    this.totalParticles = 15;
    this.particles = [];
    this.maxRadius = 900;
    this.minRadius = 400;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    //파티클 합성
    this.ctx.globalCompositeOperation = 'saturation';

    //파티클 생성
    this.createParticles();
  }

  //파티클 생성 함수
  createParticles() {
    let curColor = 0;
    this.particles = [];

    //파티클을 totalParticles만큼 생성
    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() *
        (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );

      //다음 컬러가 없다면 0으로 초기화
      if (++curColor >= COLORS.length) {
        curColor = 0;
      }

      this.particles[i] = item;
    }
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    window.requestAnimationFrame(this.animate.bind(this));

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}

window.onload = () => {
  new App();
};
