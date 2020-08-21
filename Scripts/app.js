class Header {
  constructor() {
    this.handleHamburgerClick();
    this.liElementsClick();
    this.headerAnimation();
  }

  handleHamburgerClick() {
    const hamburgerBtn = document.getElementById("btn");
    const hamburgerBtnn = document.querySelector(".btn");
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtnn.classList.toggle("open");
      hamburgerBtn.classList.toggle("fixed");
      this.navbarDisplay();
    });
  }
  navbarDisplay() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("showNav");
  }
  liElementsClick() {
    const lis = [...document.querySelectorAll("li")];
    console.log(lis);
    lis.forEach((li) => {
      li.addEventListener("click", (e) => {
        lis.forEach((li) => li.classList.remove("active"));
        e.target.classList.add("active");
      });
    });
  }
  headerAnimation() {
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
      const docScrollTop = document.documentElement.scrollTop;
      if (window.innerWidth > 767) {
        if (docScrollTop > 100) {
          header.classList.add("headerFixed");
        } else {
          header.classList.remove("headerFixed");
        }
      }
    });
  }
}

new Header();
