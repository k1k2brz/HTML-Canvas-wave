// 위 아래 움직임을 하나의 선으로 연결할 js

import { Wave } from "./wave.js";

export class WaveGroup {
  constructor() {
    this.totalWaves = 3;
    this.totalPoints = 6;

    this.color = [
      "rgba(0,199,235,0.4)",
      "rgba(0,146,199,0.4)",
      "rgba(0,87,158,0.4)",
    ];

    this.waves = [];

    // totalWaves만큼 new Wave로 새로 생성
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      // 초기화 보단 덮어씌우는 방식으로 waves배열안에 넣음
      this.waves[i] = wave;
    }
  }

  // wavegroup안에서도 totalWaves만큼 wave실행
  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
