//smooth scroll
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
// ---- //

// ----//
let cmsItem = $(".i_flow-scroll_item");
let zIndex = 1;

$(".i_flow-scroll_trigger-item").each(function (index) {
  let itemTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      toggleActions: "restart none none reverse",
    },
  });
  if (index > 0) {
    itemTimeline.from(cmsItem.eq(index), {
      opacity: 0,
      duration: 0.2,
    });
  }
  // Text timeline
  let textTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      onEnter: () => {
        zIndex = zIndex + 1;
        cmsItem.eq(index).css("z-index", zIndex);
      },
      onEnterBack: () => {
        zIndex = zIndex + 1;
        cmsItem.eq(index).css("z-index", zIndex);
      },
    },
  });
  textTimeline.from(cmsItem.eq(index).find(".i_flow-scroll_all_wrap"), {
    opacity: 0,
    y: "2rem",
    duration: 1,
  });
  if (index < cmsItem.last().index()) {
    textTimeline.to(cmsItem.eq(index).find(".i_flow-scroll_all_wrap"), {
      opacity: 0,
      duration: 0.2,
    });
  }
  textTimeline.to({}, { duration: 0.3 });
});

// ---- //
gsap.registerPlugin(ScrollTrigger);

$(".i_animation_trigger").each(function (index) {
  let childTriggers = $(this).find(".i_content_panel");
  // switch active class
  function makeItemActive(index) {
    childTriggers.removeClass("active");
    childTriggers.eq(index).addClass("active");
  }

  //makeItemActive(0);
  // create triggers
  childTriggers.each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "center 75%",
      end: "center 25%",
      onToggle: (props) => {
        if (props.isActive) {
          makeItemActive(index);
        } else {
          // If leaving the active state, remove the "active" class
          childTriggers.eq(index).removeClass("active");
        }
      },
      //markers: true,
    });
  });
});

//---//
//update nav text

// -----//
// slider
function slider1() {
  let splides = $(".slider1");
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      // Desktop on down
      perPage: 1,
      perMove: 1,
      focus: 0, // 0 = left and 'center' = center
      type: "slide", // 'loop' or 'slide'
      gap: "2rem", // space between slides
      arrows: "slider", // 'slider' or false
      pagination: false, // 'slider' or false
      speed: 600, // transition speed in miliseconds
      dragAngleThreshold: 30, // default is 30
      autoWidth: false, // for cards with differing widths
      rewind: false, // go back to beginning when reach end
      rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: false, // true removes empty space from end of list
      breakpoints: {
        991: {
          // Tablet
        },
        767: {
          // Mobile Landscape
        },
        479: {
          // Mobile Portrait
        },
      },
    }).mount();
  }
}
slider1();

function initializeSlider(index) {
  console.log("Initializing slider for index:", index);

  let siblingTrack = $(".i_storyboard_wrap").eq(index).siblings(".i_track");
  console.log("Sibling track:", siblingTrack);

  let wrapperId = "i_storyboard_wrap" + index;
  $(".i_storyboard_wrap").eq(index).attr("id", wrapperId);
  console.log("Wrapper ID:", wrapperId);

  let trackId = "i_track" + index;
  siblingTrack.attr("id", trackId);
  console.log("Track ID:", trackId);

  // create wrapper slider
  let wrapperSlider = new Dragdealer(wrapperId, {
    handleClass: "i_storyboard_list",
    loose: true,
    speed: 0.5,
    requestAnimationFrame: true,
    dragStopCallback(x, y) {
      handleSlider.setValue(x, 0, (snap = true));
    },
  });

  // create handle slider
  let handleSlider = new Dragdealer(trackId, {
    handleClass: "i_handle",
    speed: 0.5,
    requestAnimationFrame: true,
    animationCallback: function (x, y) {
      wrapperSlider.setValue(x, 0, (snap = false));
    },
  });
}

$(document).ready(function () {
  // Initialize slider for each tab
  $(".i_storyboard_wrap").each(function (index) {
    initializeSlider(index);
  });

  // Reinitialize slider when a tab becomes active
  $(".w-tab-link").on("click", function () {
    setTimeout(function () {
      $(".i_storyboard_wrap").each(function (index) {
        initializeSlider(index);
      });
    }, 300); // Adjust this delay based on your needs
  });
});

// -----//
let logoOpacity = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".i_intro_wrap",
      start: "top top",
      end: "bottom center",
    },
  })
  .set(".i_stickylogo_wrap", { opacity: 1 });

//hero animation //
let logoScale = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".i_logo_trigger",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
    defaults: {
      ease: "none",
    },
  })
  .set(".i_stickylogo_wrap", { opacity: 1 })
  .fromTo(
    ".i_sticky_logo",
    { color: "#86868b" }, // Initial text color
    {
      color: "#ffffff",
      duration: 0.1,
      ease: "power1.out",
    },
  )
  .fromTo(
    ".i_sticky_logo",
    { scale: 0.01, xPercent: 0 },
    {
      scale: 1,
      xPercent: 32.91,
      duration: 1,
      ease: "power4.in",
    },
  )
  .to(".i_sticky_logo", { opacity: 0 })
  .to(".i_stickylogo_wrap", { opacity: 0 });
// Amimation
let animationFadein = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".i_animation_trigger",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
  })
  .set(".i-main-visual", { opacity: 0 })
  .fromTo(
    ".i-main-visual",
    { opacity: 0 },
    {
      opacity: 1,
      ease: "none",
      duration: 0.5,
    },
  )
  .to(".i-main-visual", {
    opacity: 0.6,
    ease: "none",
    duration: 1.5,
  })
  .to(".i-main-visual", {
    opacity: 0.6,
    ease: "none",
    duration: 2.5,
  })
  .to(".i-main-visual", {
    opacity: 1,
    ease: "none",
    duration: 1,
  });

function setupVideoAnimation(mediaQuery, heightBefore, heightAfter) {
  ScrollTrigger.matchMedia({
    [mediaQuery]: function () {
      let videoElem1 = document.getElementById("hero");
      videoElem1.play();

      let videoFadein = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".i_animation_trigger",
            toggleActions: "play none none reset",
            start: "top bottom",
            end: "20% bottom",
            onEnter: () => {
              videoElem1.currentTime = 0;
              videoElem1.play();
            },
          },
        })
        .fromTo(
          ".i_hero_video",
          { height: heightBefore },
          {
            height: heightAfter,
          },
        );
    },
  });
}

// Usage
setupVideoAnimation("(max-width: 479px)", "65%", "42.5%");
setupVideoAnimation("(max-width: 767px)", "70%", "50%");
