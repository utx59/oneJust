document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const scrollLength = gallery.scrollWidth - window.innerWidth;

  // 使用 GSAP 設置橫向滾動
  gsap.to(".gallery", {
    x: -scrollLength, // 往左滾動總長度
    ease: "none",
    scrollTrigger: {
      trigger: ".galleryWrapper",
      start: "top top",
      end: `+=${scrollLength}`, // 滾動範圍
      pin: true, // 固定畫面
      scrub: 1, // 平滑滾動
    },
  });
});
