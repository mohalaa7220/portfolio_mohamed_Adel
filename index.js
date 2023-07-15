// Dark Button
const dark = document.querySelector("#dark");
dark.addEventListener("click", () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
  if (element.classList.contains("dark-mode")) {
    dark.innerHTML = `<i class="uil uil-sun"></i>`;
  } else {
    dark.innerHTML = `<i class="uil uil-moon"></i>`;
  }
});

/*-------------------------Change Background Of NavBar When Scroll-----------*/
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    navbar.classList.add("nav-active");
  } else {
    navbar.classList.remove("nav-active");
  }
});

const navLink = document.querySelectorAll(".collapse .nav-link");
let collapse = document.querySelector(".collapse ");

navLink.forEach((n) => n.addEventListener("click", closeMenu));
navLink.forEach((n) => n.addEventListener("click", removeActive));

function removeActive() {
  navLink.forEach((li) => {
    li.classList.remove("active_link");
    this.classList.add("active_link");
  });
}

function closeMenu() {
  collapse.classList.remove("show");
  collapse.classList.remove("show");
}

/*---------------Fetch DATA--------*/
const response = await fetch("data.json");
const data = await response.json();

/*======================Skills=================*/

let skillAbout = document.querySelector("#pills-skills .skills");

const skill = data.skills
  .map((item, index) => {
    return `
                  <div class="single_skill">
                      <h4>${item.title}</h4>
                      <div class="progress">
                        <div
                          role="progressbar"
                          class="progress-bar"
                          aria-valuenow="${item.progress}"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: ${item.progress}"
                        >
                          ${item.progress}
                        </div>
                      </div>
                  </div>
        `;
  })
  .join("");

try {
  skillAbout.innerHTML = skill;
} catch (error) {}

/*======================Projects=================*/

let rowProjects = document.querySelector("#portfolio .row");

const projects = data.projects
  .map((item, index) => {
    return `
              <div class="col-4" >
                  <div class="card mb-3" data-aos=${
                    index % 2 == 0 ? "zoom-in-up" : "fade-right"
                  } data-aos-easing="ease-in" data-bs-toggle="modal" data-bs-target="#${
      item.model
    }">
                      <div class="card_inner">
                          <div class="front">
                              <div class="img"> <img src="${item.img}" 
                                 class="card-img-top" 
                                 alt="${item.title}">
                                </div>
                              <div class="card-body">
                                  <span class="subtitle mb-2">${item.cat}</span>
                                  <h5 class="card-title">${item.title}</h5>
                                  <p class="card-text">${item.desc}</p>
                              </div>
                          </div>
                          <div class="back">
                            <p >${item.desc}</p>
                            ${
                              item.link !== ""
                                ? `<div class="btns">
                                        <a href="${item.git_link}" target="_blank"> Github</a>
                                        <a href="${item.link}" class="google" target="_blank"> Google Play</a>
                                </div>`
                                : `<div class="btns">
                                        <a href="${item.git_link}" target="_blank"> Github</a>
                                  </div>`
                            }
                          </div>
                      </div>
                  </div>
              </div>
              
        `;
  })
  .join("");

try {
  rowProjects.innerHTML = projects;
} catch (error) {
  console.log(error);
}

/*-----------

-----------*/

/*======================Features=================*/

let rowFeatures = document.querySelector("#features .row");

const features = data.features
  .map((item, index) => {
    return `
                  <div class="col-4">
                      <div class="card card_feat mb-5" data-aos=${
                        index % 2 == 0 ? "zoom-in-up" : "fade-down"
                      }>
                          <div class="icon">
                          <i class="uil ${item.icon}"></i>
                          </div>
                          <div class="content">
                              <h3>${item.title}</h3>
                              <p class="description">${item.desc}</p>
                          </div>
                      </div>
                  </div>
        `;
  })
  .join("");

try {
  rowFeatures.innerHTML = features;
} catch (error) {
  console.log(error);
}

/*======================RESUME=================*/

let rowResume = document.querySelector("#resume .swiper-wrapper");

const resume = data.resume
  .map((item, index) => {
    return `
                <div class="swiper-slide col-4">
                        <h3 class="inner_title">${item.main_title}</h3>
                        <h3 class="date">${item.date}</h3>    
                        <div class="resume_card" data-aos="fade-left"
                          data-aos-easing="ease-out-cubic"
                          data-aos-duration="2000">
                          <div class="resume-head">
                              <span class="icon-exp"><i class="uil ${item.icon}"></i></span>
                              <div class="content">
                                  <h3>${item.cat}</h3>
                                  <p class="">${item.dep}</p>
                              </div>
                          </div>
                          <div class="resume-footer">
                              <p class="">${item.desc}</p>
                          </div>                      
                        </div>
                </div>
        `;
  })
  .join("");

try {
  rowResume.insertAdjacentHTML("afterbegin", resume);
} catch (error) {
  console.log(error);
}

/*------------Get Age------*/

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let age = getAge("2000-12-10");

document.getElementById("age").innerHTML = age;

/*--------------------------*/
AOS.init({
  duration: 1200,
});

/*--------------------swiper JS-------------------*/

try {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 60,
      stretch: 0,
      depth: 100,
      modifier: 0.7,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
} catch (error) {
  console.log("Swiper Is not define");
}

/*-------------Scroll To Top----------------*/

function toTop() {
  let buttonUp = document.querySelector(".scroll-to-top img");
  window.onscroll = () => {
    if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
      buttonUp.style.display = "block";
      buttonUp.classList.add("translate2");
    } else {
      buttonUp.style.display = "none";
    }
  };

  buttonUp.onclick = () => {
    scrollTo(0, 0);
  };
}
toTop();

const image = document.querySelectorAll("img");
image.forEach((img) => {
  img.setAttribute("loading", "lazy");
});
