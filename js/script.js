const links = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  const href = link.getAttribute("href");

  // الحالة العادية
  if (href === currentPage) {
    link.classList.add("active");
  }

  // حالة خاصة: result.html تعتبر movie.html
  if (currentPage === "result.html" && href === "movie.html") {
    link.classList.add("active");
  }
});



 // دخول الصفحة (Animation In)
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// التعامل مع الروابط
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {

    // تجاهل روابط خارجية أو خاصة
    if (
      this.target === "_blank" ||
      this.href.includes("#") ||
      this.hostname !== window.location.hostname
    ) return;

    e.preventDefault();

    // Animation Out
    document.body.classList.remove("loaded");
    document.body.classList.add("slide-out");

    // الانتقال بعد انتهاء الأنيميشن
    setTimeout(() => {
      window.location.href = this.href;
    }, 350); // نفس مدة CSS
  });
});


