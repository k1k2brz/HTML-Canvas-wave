export class Point {
  // 각각 좌표를 만들어 아래위로 이동시킬 것
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.08;
    // 현재 포인트가 몇번째 포인트인지
    this.cur = index;
    this.max = Math.random() * 10 + 100;
  }

  update() {
    this.cur += this.speed;
    // 사인 함수를 사용해 위아래 이동
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
