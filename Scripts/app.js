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
    lis.forEach((li, index) => {
      li.addEventListener("click", (e) => {
        lis.forEach((li) => {
          if (li.querySelector("a")) {
            li.querySelector("a").classList.remove("acttive");
          }
          li.classList.remove("active");
        });
        if (e.target.nodeName === "A") {
          e.target.parentElement.classList.add("active");
          e.target.classList.add("acttive");
        } else {
          e.target.classList.add("active");
        }
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
class Cart {
  constructor() {
    this.cartButtons = document.querySelectorAll(".cartItems button");
    this.table = document.querySelector(".cartItems table");

    this.cartDisplay();
    this.removeProductUI();
    this.addProductUI();
  }

  cartDisplay() {
    const cartDrawer = document.querySelector(".cartDrawer");
    const cartIcon = document.querySelector(".cart");
    const cancel = document.querySelector(".cancel p");

    cartIcon.addEventListener("click", () => {
      cartDrawer.classList.toggle("cartShow");
    });
    cancel.addEventListener("click", () => {
      cartDrawer.classList.toggle("cartShow");
    });
  }

  removeProductUI() {
    this.cartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const tr = e.target.parentElement.parentElement;
        tr.remove();
      });
    });
  }

  addProductUI() {
    const addButtons = document.querySelector(".prodOverlay button");
    console.log(addButtons);
  }
}
class FetchData {
  constructor(url) {
    this.url = url;
  }
  fetchApi(url) {
    return fetch(url).then((response) => response.json());
  }
  async fetchData_RendersData() {
    try {
      const responseData = await this.fetchApi(this.url);
      return responseData;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
class Carousel {
  constructor() {
    this.carouselSlide = document.querySelector(".carousel");
    this.carouselImages = this.carouselSlide.querySelectorAll("img");

    this.nextBtn = document.getElementById("nextSlideBtn");
    this.counter = 1;
    this.size = this.carouselImages[0].clientWidth;
    this.intervalTime = 5000;
    this.nextButtonListener();
    this.previousButtonListener();

    setInterval(this.autoSlide, this.intervalTime);
  }
  //Button Listeners
  nextButtonListener() {
    this.nextBtn.addEventListener("click", () => {
      if (this.counter === this.carouselImages.length) {
        this.counter = 0;
      }
      this.changeSlide();
      this.counter++;
      this.intervalTime = 5000;
    });
  }

  previousButtonListener() {
    this.previousBtn = document.getElementById("previousSlideBtn");
    this.previousBtn.addEventListener("click", () => {
      if (this.counter === 0) {
        this.counter = this.carouselImages.length - 1;
      }
      this.changeSlide();
      this.counter--;
      this.intervalTime = 5000;
    });
  }

  changeSlide = () => {
    this.carouselSlide.style.transform =
      "translateX(" + -this.size * this.counter + "px";
  };

  autoSlide() {
    if (this.counter === this.carouselImages.length) {
      this.counter = 0;
    } else if (this.counter < 0) {
      this.counter = this.carouselImages.length - 1;
    }

    this.changeSlide();
    this.counter++;
  }
}
class Products {
  async getProducts() {
    let results = new FetchData("store.json");
    results = await results.fetchData_RendersData();
    let products = results.store;
    products = products.map((product) => {
      // const { category, categoryImage, categoryId } = product;
      const category = product.category;
      const categoryImage = product.categoryImg;
      const categoryId = product.categoryId;
      const categoryTitle = category.title;
      const productsAvailble = category.productsAvailable;
      return { categoryImage, categoryId, categoryTitle, productsAvailble };
    });
    return products;
  }
}
class Store {}
//There comes a time in your life when the people of the world, will
new Header();
new Cart();
new Carousel();

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  products.getProducts().then((data) => console.log(data));
});
