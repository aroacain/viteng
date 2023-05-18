class AnimateOnScroll {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.scroll = document.querySelector(".scroll-up-btn");
    this.y = window.pageYOffset;
    this.events();
  }

  events() {
    window.addEventListener("scroll", () => this.scrollingMagic());
    this.scroll.addEventListener("click", () => this.scrollUp());
  }

  scrollingMagic() {
    ("use strict");
    if (
      document.body.scrollTop >= 200 ||
      document.documentElement.scrollTop >= 200
    ) {
      this.navbar.classList.add("navbar__sticky");
      this.scroll.classList.add("show");
    } else {
      this.navbar.classList.remove("navbar__sticky");
      this.scroll.classList.remove("show");
    }
  }

  scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default AnimateOnScroll;
