const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });


  

  window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    if (this.href && this.target !== "_blank") {
      e.preventDefault();
      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location.href = this.href;
      }, 100);
    }
  });
});