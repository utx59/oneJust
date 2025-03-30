// 取得畫布
const canvas = document.getElementById("footerCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const footer = document.querySelector(".footer"); // 選取 footer
  canvas.width = footer.offsetWidth; // 設定 canvas 寬度與 footer 相同
  canvas.height = footer.offsetHeight; // 設定 canvas 高度與 footer 相同
}
resizeCanvas();

// 監聽視窗大小變化
window.addEventListener("resize", resizeCanvas);

// 雪花與積雪陣列
const snowflakes = [];
const snowPiles = []; // 用於存儲積雪

// 雪花類別
class Snowflake {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 4 + 1; // 雪花大小
    this.speedY = Math.random() * 4 + 2; // 更快的速度範圍 2 ~ 6
    this.opacity = Math.random() * 0.8 + 0.2; // 透明度
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(241, 240, 233, ${this.opacity})`;
    ctx.fill();
  }

  update() {
    this.y += this.speedY; // 雪花下落

    // 當雪花到達底部，轉為積雪
    if (this.y + this.radius >= canvas.height) {
      snowPiles.push({ x: this.x, y: canvas.height - this.radius, radius: this.radius });
      this.reset();
    }
  }

  reset() {
    // 雪花重置位置，從頂部重新掉落
    this.x = Math.random() * canvas.width;
    this.y = -this.radius;
  }
}

// 初始化雪花
function init() {
  for (let i = 0; i < 200; i++) {
    snowflakes.push(new Snowflake());
  }
}

// 繪製積雪
function drawSnowPiles() {
  snowPiles.forEach((snow) => {
    ctx.beginPath();
    ctx.arc(snow.x, snow.y, snow.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#F1F0E9";
    ctx.fill();
  });
}

// 動畫循環
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 繪製積雪
  drawSnowPiles();

  // 更新雪花
  snowflakes.forEach((snowflake) => {
    snowflake.update();
    snowflake.draw();
  });

  requestAnimationFrame(animate);
}

// 啟動
init();
animate();
