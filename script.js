const cardImage = document.querySelector(".awards-card img");
const menuBar = document.querySelector("#menu-bar")
const menuSection = document.querySelector(".menu-section")
const menuLinks = document.querySelectorAll(".menu-item a")
const images = [
  {
    src: "https://images.unsplash.com/photo-1703081397398-6156621d25ce?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1633112263954-d0743a301eec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1625516838246-ff33acad73ec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1703081397398-6156621d25ce?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


// const scroll = new LocomotiveScroll({
//   el: document.querySelector('#main'),
//   smooth: true
// });



var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  autoplay: {
    delay: 1200,
  },
});




// menu()

function card1() {
  setInterval(function () {
    for (var i = 0; i < images.length; i++) {
      let ranImg = images[Math.floor(Math.random() * 3) + 1];
      // cardImage.classList.remove("anime")
      cardImage.src = ranImg.src;
      cardImage.classList.add("anime");
      if (images.length === 4) {
        continue;
      }
    }
  }, 3000);
}

// card1();


// code to stop the brand slide animation
const slideTrack = document.querySelector(".slider .slide-track");

slideTrack.addEventListener("mouseenter", () => {
  slideTrack.style.animationPlayState = "paused";
});

slideTrack.addEventListener("mouseleave", () => {
  slideTrack.style.animationPlayState = "running";
});



$('.testimonials-container').owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 6000,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
      nav: false
    },
    600: {
      items: 1,
      nav: true
    },
    768: {
      items: 2
    },
    // 768: {
    //     items: 3
    // },
  }
})



function protofolioSlider() {
  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const carouselChildrens = [...carousel.children];

  let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Insert copies of the last few cards to beginning of carousel for infinite scrolling
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  // Insert copies of the first few cards to end of carousel for infinite scrolling
  carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");



  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  }

  const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  }

  const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  }

  const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  }
  autoPlay();

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);
}




function heroAnimation(){
  let tl = gsap.timeline();
  
  tl.from(".head-title h1", {
    y: "105%",
    duration: 1,
    ease: Power1,
    stagger: .5,
  })
  
  tl.from(".left-hero p", {
    opacity: 0,
    y: "5%",
    duration: .5,
    ease: Power1,
  })
  tl.from(".hero-btns", {
    opacity: 0,
    ease: Power1,
    // duration: 1
  })

}



// contact form validation and Form submission to Google Sheets
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-right form");
  const errorMessage = document.querySelector(".error-message");
  const submitButton = form.querySelector("#submit");

  const scriptURL = "add lens media web app key ";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = form.querySelector('input[placeholder="Full Name"]').value;
    const email = form.querySelector('input[placeholder="Email"]').value;
    const phoneNumber = form.querySelector(
      'input[placeholder="Phone Number"]'
    ).value;
    const linkedInUsername = form.querySelector(
      'input[placeholder="LinkedIn Username"]'
    ).value;


    // Check for empty fields
    if (
      fullName === "" ||
      email === "" ||
      phoneNumber === "" ||
      linkedInUsername === ""
    ) {
      errorMessage.textContent = "Please fill in all fields.";
      errorMessage.style.display = "block";
      return;
    }


    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMessage.textContent = "Please enter a valid email address.";
      errorMessage.style.display = "block";
      return;
    }


    // Phone number validation - checking if it contains only numbers

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      errorMessage.textContent = "Please enter a valid phone number.";
      errorMessage.style.display = "block";
      return;
    }

    // Form submission to Google Sheets
    let requestBody = new FormData(form);
    submitButton.disabled = true;

    fetch(scriptURL, { method: "POST", body: requestBody })
      .then((response) => {
        alert("Success!", response);
        submitButton.disabled = false;
        errorMessage.style.display = "none";
        form.reset();
      })
      .catch((error) => {
        alert("Error!", error.message);
        submitButton.disabled = false;
      });
  });
});

// protofolioSlider()
heroAnimation();
