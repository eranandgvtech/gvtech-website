
// .... for mobile menu toggle

    document.addEventListener("DOMContentLoaded", function () {
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn a");
        const mobileNavbarMenu = document.getElementById("mobile-navbar-menu");
        const closeBtn = document.getElementById("nav-close2");
        const menuLinks = mobileNavbarMenu.querySelectorAll("ul li a");

        // Open menu
        mobileMenuBtn.addEventListener("click", function (e) {
            e.preventDefault();
            mobileNavbarMenu.classList.add("open");
        });

        // Close menu
        closeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            mobileNavbarMenu.classList.remove("open");
        });

        // Close menu when clicking a menu item
        menuLinks.forEach(link => {
            link.addEventListener("click", function () {
                mobileNavbarMenu.classList.remove("open");
            });
        });
    });


// ..... for sliding effect in testimonials

document.addEventListener("DOMContentLoaded", () => {

  const sliderRoot = document.querySelector('.slider-content.slick-slider');
  if (!sliderRoot) return;

  const slickList = sliderRoot.querySelector('.slick-list');
  const slickTrack = sliderRoot.querySelector('.slick-track');
  const prevBtn = sliderRoot.querySelector('.slick-prev');
  const nextBtn = sliderRoot.querySelector('.slick-next');

  // collecting the original slides of slider content
  let originalSlides = Array.from(slickTrack.children).filter(s => !s.classList.contains('slick-cloned'));

  // clear and rebuild clean track
  slickTrack.innerHTML = '';
  originalSlides.forEach(slide => slickTrack.appendChild(slide.cloneNode(true)));

  // cloning the first and last for continous infinite loop of sliding content
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
  firstClone.classList.add('slick-cloned');
  lastClone.classList.add('slick-cloned');
  slickTrack.insertBefore(lastClone, slickTrack.firstChild);
  slickTrack.appendChild(firstClone);

  // state variables referenced from source page of original website
  let slides = Array.from(slickTrack.children);
  let currentIndex = 1;
  let slideWidth = slickList.clientWidth;
  let isAnimating = false;
  let autoPlayTimer = null;
  const transitionSpeed = 600; // ms
  const autoPlayDelay = 5000; // ms

  // setting widths for different layouts 
  function setSlideWidths() {
    slideWidth = slickList.clientWidth;
    slides.forEach(slide => {
      slide.style.width = slideWidth + 'px';
      slide.style.flex = '0 0 ' + slideWidth + 'px';
    });
    slickTrack.style.transition = 'none';
    slickTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    requestAnimationFrame(() => {
      slickTrack.style.transition = `transform ${transitionSpeed}ms ease`;
    });
  }
  setSlideWidths();
  window.addEventListener('resize', setSlideWidths);

  // slide movement using array indexing
  function moveTo(index) {
    if (isAnimating) return;
    isAnimating = true;
    slickTrack.style.transition = `transform ${transitionSpeed}ms ease`;
    slickTrack.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
  }

  // handle looping after transition
  slickTrack.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
      slickTrack.style.transition = 'none';
      currentIndex = slides.length - 2;
      slickTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    if (currentIndex === slides.length - 1) {
      slickTrack.style.transition = 'none';
      currentIndex = 1;
      slickTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    requestAnimationFrame(() => {
      slickTrack.style.transition = `transform ${transitionSpeed}ms ease`;
    });
    isAnimating = false;
  });

  // next / prev buttons transition if cursor press on these buttons
  function nextSlide() {
    moveTo(currentIndex + 1);
  }
  function prevSlide() {
    moveTo(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });

  // autoplay if there is no prev/next button is used
  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
  }
  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }
  startAutoPlay();

  // pause on hover when cursor will be on content
  sliderRoot.addEventListener('mouseenter', stopAutoPlay);
  sliderRoot.addEventListener('mouseleave', startAutoPlay);

});






