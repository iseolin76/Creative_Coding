# Kinetic_Typography

[Creative Coding Tutorial (PIXI.js) : Kinetic Typography #1](https://www.youtube.com/watch?v=HMQ9fEX28fk&t=335s)

## error

- document.body.clientHeight return 0
  - 처음 높이는 아무것도 표시되지 않기 때문에 0이 된다.
  - 해결 : `Math.max( window.innerHeight, document.body.clientHeight )`
