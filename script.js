const navLinks = document.querySelectorAll(
  "header nav .nav-product .nav-list .nav-item"
);
const logoLink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navBar = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navBar.classList.toggle("active");
});

const activePage = () => {
  const header = document.querySelector("header");
  const barsBox = document.querySelector(".bars-box");

  header.classList.remove("active");
  setTimeout(() => {
    header.classList.add("active");
  }, 1100);

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  barsBox.classList.remove("active");
  setTimeout(() => {
    barsBox.classList.add("active");
  }, 1100);

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  menuIcon.classList.remove("bx-x");
  navBar.classList.remove("active");
};

navLinks.forEach((link, idx) => {
  link.addEventListener("click", () => {
    if (!link.classList.contains("active")) {
      activePage();

      link.classList.add("active");

      setTimeout(() => {
        sections[idx].classList.add("active");
      }, 1100);
    }
  });
});

logoLink.addEventListener("click", () => {
  if (!navLinks[0].classList.contains("active")) {
    activePage();

    navLinks[0].classList.add("active");

    setTimeout(() => {
      sections[0].classList.add("active");
    }, 1100);
  }
});

const resumeBtns = document.querySelectorAll(".resume-btn");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");

    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    resumeDetails[idx].classList.add("active");
  });
});

const arrowRight = document.querySelector(
    ".portfolio-box .navigation .arrow-right"
  ),
  arrowLeft = document.querySelector(".portfolio-box .navigation .arrow-left");

let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
  const portfolioDetails = document.querySelectorAll(".portfolio-detail");

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  portfolioDetails.forEach((detail) => {
    detail.classList.remove("active");
  });

  portfolioDetails[index].classList.add("active");
};

arrowRight.addEventListener("click", () => {
  if (index < 2) {
    index++;
    arrowLeft.classList.remove("disabled");
  } else {
    index = 3;
    arrowRight.classList.add("disabled");
  }

  activePortfolio();
});

arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove("disabled");
  } else {
    index = 0;
    arrowLeft.classList.add("disabled");
  }

  activePortfolio();
});

/*========= SmtpJS Mail =========*/
const form = document.getElementById("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phoneNum = document.getElementById("number");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phoneNum.value}<br> Message: ${mess.value}`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "darwinzky01@gmail.com",
    Password: "BBEC89D2BA2924C943B588BF8535A48D77DE",
    To: "darwinzky01@gmail.com",
    From: "darwinzky01@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success",
        text: "Your message sent successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");
  let hasEmptyField = false;

  for (const item of items) {
    const errorMessage = item.parentElement.querySelector(".error-text");

    //Check input's value
    if (item.value === "") {
      //Construct error message with placeholder's name
      placeholderName = item.getAttribute("placeholder");

      //Show error message only for empty fields
      errorMessage.textContent = `${placeholderName} is required.`;

      hasEmptyField = true;

      //Remove the error message after three seconds
      setTimeout(() => {
        errorMessage.textContent = "";
      }, 3000);
    } else {
      setTimeout(() => {
        item.value = "";
      }, 3000);
    }
  }

  //If no empty fields found, then send the email
  if (!hasEmptyField) {
    sendEmail();
  }
}

//Delete the whitespace in text-area
window.addEventListener("load", () => {
  const textarea = document.getElementById("message");
  textarea.value = textarea.value.trim();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});
