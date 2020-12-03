import { Text } from './Text.js';
import { Particle } from './Particle.js';
import { hslToHex } from './utils.js';

export class Visual {
  constructor() {
    this.text = new Text();

    this.particle = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 100
    };

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(stageWidth, stageHeight) {
    this.pos = this.text.setText('W', 20, stageWidth, stageHeight);
    this.posTotal = this.pos.length - 1;
  }

  animate(ctx) {
    if (!this.pos) {
      return;
    }

    for (let i = 0; i < 10; i++) {
      const myPos = this.pos[(Math.random() * this.posTotal) | 0];
      this.particle.push(new Particle(myPos, this.getColor()));
    }

    for (let i = 0; i < this.particle.length; i++) {
      const item = this.particle[i];
      if (item.radius <= 1) {
        this.particle.splice(i, 1);
      }

      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        item.progress += 100;
      }

      item.draw(ctx);
    }
  }

  getColor() {
    const minHue = 80;
    const maxHue = 340;
    const hue = (maxHue - minHue) * Math.random() + minHue;
    return hslToHex(hue, 84, 50);
  }

  onMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}