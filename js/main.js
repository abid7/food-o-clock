import { foodData } from "./data.js";

window.addEventListener("DOMContentLoaded", runAfterLoad);

function runAfterLoad() {
  // navbar section
  {
    const nav = document.querySelector("nav");

    (function fixedNav() {
      window.addEventListener("scroll", (e) => {
        // const headerHeight = header.getBoundingClientRect().height;
        const navHeight = nav.getBoundingClientRect().height;
        const totalHeight = navHeight + 100;
        const scrollHeight = window.pageYOffset;

        if (scrollHeight > totalHeight) {
          nav.classList.add("fixed-nav");
        } else {
          nav.classList.remove("fixed-nav");
        }
      });
    })();
  }

  // info section image slide
  {
    const infoImg = document.querySelectorAll(".info-images");

    setInterval(infoImgSlider, 9000);
    infoImgSlider();

    function infoImgSlider() {
      infoImg.forEach((item) => {
        item.classList.add("img-swap-1");
        setTimeout(() => {
          item.classList.remove("img-swap-1");
          item.classList.add("img-swap-2");

          setTimeout(() => {
            item.classList.remove("img-swap-2");
          }, 3000);
        }, 3000);
      });
    }
  }

  // Review Section slide

  {
    const nextBtn = document.querySelector(".nextBtn");
    const prevBtn = document.querySelector(".prevBtn");
    const slideBox = document.querySelector(".review__slide-wrapper");

    let counter = 0;

    nextBtn.addEventListener("click", (e) => {
      counter++;
      prevBtn.style.display = "block";
      slideBox.style.transform = `translateX(calc(-${counter} * 100%))`;

      if (counter === 4) {
        counter = 4;
        nextBtn.style.display = "none";
      }
    });

    prevBtn.addEventListener("click", (e) => {
      if (counter === 0) {
        return;
      }
      counter--;
      nextBtn.style.display = "block";
      slideBox.style.transform = `translateX(calc(-${counter} * 100%))`;
      if (counter === 0) {
        counter = 0;
        prevBtn.style.display = "none";
      }
    });
  }

  // chef's choice*************
  {
    const chefChoiceTable = document.getElementById("chefChoice-table");

    foodData.slice(-6).forEach((item) => {
      const trElement = `<tr>
                        <td>${item.title}</td>
                        <td>${item.price}$</td>
                      </tr>`;

      chefChoiceTable.insertAdjacentHTML("beforeend", trElement);
    });
  }

  // O'clock special***************
  {
    const oclockSpecialTable = document.getElementById("oclockSpecial-table");

    foodData.slice(0, 6).forEach((item) => {
      const trElement = `<tr>
                        <td>${item.title}</td>
                        <td>${item.price}$</td>
                      </tr>`;

      oclockSpecialTable.insertAdjacentHTML("beforeend", trElement);
    });
  }

  // gallery section

  {
    const mainImg = document.querySelectorAll(".gallery .img-box img");
    const viewImg = document.querySelector(".gallery .viewImg");
    const ImgElement = document.querySelector(".gallery .viewImg img");
    const closeImgView = document.querySelector(".viewImg p");
    let counter = 1;

    mainImg.forEach((img) => {
      img.addEventListener("click", (e) => {
        const imgToShow = e.currentTarget.src;

        ImgElement.src = imgToShow;
        counter = 1;

        viewImg.classList.add("boxOpen");
        ImgElement.classList.add("imgOpen");
        imgZoom(counter);
      });
    });

    closeImgView.addEventListener("click", (e) => {
      viewImg.classList.remove("boxOpen");
      ImgElement.classList.remove("imgOpen");
    });

    viewImg.addEventListener("click", (e) => {
      if (e.target.classList.contains("viewImg")) {
        viewImg.classList.remove("boxOpen");
        ImgElement.classList.remove("imgOpen");
      }
    });

    viewImg.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY == 100) {
        if (counter < 0) {
          return;
        }
        counter = counter - 0.05;
      } else {
        counter = counter + 0.05;
      }
      imgZoom(counter);
    });

    function imgZoom(index) {
      ImgElement.style.transform = `scale(${index})`;
    }
  }

  // home to Food-menu toggle

  {
    const homeMenu = document.querySelector(".homeMenu");
    const foodMenu = document.querySelector(".foodMenu");
    const mainSection = document.querySelector(".mainSection");
    const menuSection = document.querySelector(".full-menu");

    homeMenu.addEventListener("click", (e) => {
      menuSection.classList.add("menuSectionhide");
      mainSection.classList.remove("mainSectionhide");
    });

    foodMenu.addEventListener("click", (e) => {
      mainSection.classList.add("mainSectionhide");
      menuSection.classList.remove("menuSectionhide");
    });
  }

  // food menu section
  {
    const menuAppeteasers = document.querySelector(".menu-appeteasers");
    const menuMainDish = document.querySelector(".menu-mainDish");
    const menuDessert = document.querySelector(".menu-dessert");
    const menuDrinks = document.querySelector(".menu-drinks");

    foodData.slice(0, 9).forEach((food) => {
      insertTo(menuAppeteasers, food);
    });
    foodData.slice(7, 16).forEach((food) => {
      insertTo(menuMainDish, food);
    });
    foodData.slice(6, 15).forEach((food) => {
      insertTo(menuDessert, food);
    });
    foodData.slice(10, 19).forEach((food) => {
      insertTo(menuDrinks, food);
    });

    function insertTo(item, food) {
      let insertItem = `<div class="dishes">
    <div class="item">
      <div class="info">
        <h2>${food.title}</h2>
        <p>
          ${food.desc}
        </p>
      </div>
      <div class="price">
        <p>$${food.price}</p>
      </div>
    </div>
  </div>`;

      item.insertAdjacentHTML("beforeend", insertItem);
    }
  }
}
