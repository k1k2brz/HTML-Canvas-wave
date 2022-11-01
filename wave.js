import { Point } from "./point.js";

export class Wave {
  constructor(index, totalPoints, color) {
    // 고유 index Number를 주어서 시간차 wave
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  // 애니메이션 크기를 가져온다
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    // 화면 중간에 그려지기 때문에 반
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    // totalPoints로 몇개의 wave를 생성할 것인지 넘겨줌
    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  // Point 생성하고 가운데서 이벤트 발생 시킴
  init() {
    // this.point = new Point(this.centerX, this.centerY);
    // point의 간격은 스테이지 넓이에서 totalPoints만큼을 나눈 값이 된다.
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
      this.points[i] = point;
    }
  }

  // 실제로 캔버스를 그리는 함수
  // 가운데 point들만 위아래로 움직일 것
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i++) {
      // index 0이거나 마지막 index이면 업데이트 실행 X
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      // 곡선 웨이브를 위해 현재 point가 아닌 이전 x,y 좌표에 현재 point x,y좌표를 반으로 나눈 값을 적어준다
      // 가운데 값이 찍혀야 휘는 점을 잡을 수 있기 때문.
      //   ctx.lineTo(cx, cy);
      // lineTo에서 곡선으로 바꿔줌
      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();

    // this.point.update();

    // ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
    // ctx.fill();
  }
}
