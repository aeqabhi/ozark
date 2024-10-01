(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Hero Slider Active 
    08. Global Slider
    09. Ajax Contact Form
    10. Popup Sidemenu   
    11. Magnific Popup
    12. Section Position
    13. Filter
    14. One Page Nav
    15. WOW.js Animation
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });

  /*---------- 02. Preloader ----------*/
  if ($(".preloader").length > 0) {
    $(".preloaderCls").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".preloader").css("display", "none");
      });
    });
  }

  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";
  var scrollToTopBtn = ".scrollToTop";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }
  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass("show");
    } else {
      $(scrollToTopBtn).removeClass("show");
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      console.log("scroll to top clicked");
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1000
      );
      return false;
    });
  });

  /*---------- 06.Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }

  /*----------- 07. Hero Slider Active ----------*/
  $(".vs-hero-carousel").each(function () {
    var vsHslide = $(this);

    // Get Data From Dom
    var d = (data) => {
      return vsHslide.data(data);
    };

    vsHslide
      .on("sliderDidLoad", function (event, slider) {
        var customNav = ".ls-custom-dot";
        var navDom = "data-slide-go";
        var currentSlide = slider.slides.current.index; // current Slide index
        var i = 1;
        // Set Attribute
        $(customNav).each(function () {
          $(this).attr(navDom, i);
          i++;
          // On Click Thumb, Change slide
          $(this).on("click", function (e) {
            e.preventDefault();
            var target = $(this).attr(navDom);
            vsHslide.layerSlider(parseInt(target));
          });
        });

        // custom arrow js
        setTimeout(() => {
          vsHslide.find(".ls-custom-arrow").each(function () {
            $(this).on("click", function (e) {
              e.preventDefault();
              var gotarget = $(this).attr("data-change-slide");
              vsHslide.layerSlider(gotarget);
            });
          });
        }, 1000);

        // Add class To current Thumb
        var currentNav = customNav + "[" + navDom + '="' + currentSlide + '"';
        $(currentNav).addClass("active");
      })
      .on("slideChangeDidComplete", function (event, slider) {
        var currentActive = slider.slides.current.index; // After change Current Index
        var currentNav = '.ls-custom-dot[data-slide-go="' + currentActive + '"';
        $(currentNav).addClass("active").siblings().removeClass("active");
      });

    vsHslide.layerSlider({
      allowRestartOnResize: true,
      maxRatio: d("maxratio") ? d("maxratio") : 1,
      type: d("slidertype") ? d("slidertype") : "responsive",
      pauseOnHover: d("pauseonhover") ? true : false,
      navPrevNext: d("navprevnext") ? true : false,
      hoverPrevNext: d("hoverprevnext") ? true : false,
      hoverBottomNav: d("hoverbottomnav") ? true : false,
      navStartStop: d("navstartstop") ? true : false,
      navButtons: d("navbuttons") ? true : false,
      loop: d("loop") === false ? false : true,
      autostart: d("autostart") ? true : false,
      height: d("height") ? d("height") : 1080,
      responsiveUnder: d("responsiveunder") ? d("responsiveunder") : 1220,
      layersContainer: d("container") ? d("container") : 1220,
      showCircleTimer: d("showcircletimer") ? true : false,
      skinsPath: "layerslider/skins/",
      globalBGColor: d("ls-bg") ? d("ls-bg") : false,
      globalBGImage: d("ls-bg-img") ? d("ls-bg-img") : false,
      thumbnailNavigation: d("thumbnailnavigation") === false ? false : true,
    });
  });

  /*----------- 08. Global Slider ----------*/
  $(".vs-carousel").each(function () {
    var vsSlide = $(this);

    // Collect Data
    var d = (data) => {
      return vsSlide.data(data);
    };

    // Custom Arrow Button
    var prevButton =
        '<button type="button" class="slick-prev"><i class="' +
        d("prev-arrow") +
        '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d("next-arrow") +
        '"></i></button>';

    // Function For Custom Arrow Btn
    $("[data-slick-next]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });

    $("[data-slick-prev]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!vsSlide.closest(".arrow-wrap").length) {
        vsSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    vsSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 1000,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == true ? true : false,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 5000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") ? true : false,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow")
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>',
      nextArrow: d("next-arrow")
        ? nextButton
        : '<button type="button" class="slick-next"><i class="fal fa-long-arrow-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show")
              ? d("xl-slide-show")
              : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show")
              ? d("ml-slide-show")
              : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show")
              ? d("lg-slide-show")
              : d("slide-show"),
            centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? d("md-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
            centerPadding: 0,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });

  /*----------- 09. Ajax Contact Form ----------*/
  function ajaxContactForm(selectForm) {
    var form = selectForm;
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
      '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(selectForm).next(".form-messages");

    function sendContact() {
      var formData = $(form).serialize();
      var valid;
      valid = validateContact();
      if (valid) {
        jQuery
          .ajax({
            url: $(form).attr("action"),
            data: formData,
            type: "POST",
          })
          .done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            formMessages.removeClass("error");
            formMessages.addClass("success");
            // Set the message text.
            formMessages.text(response);
            // Clear the form.
            $(form + ' input:not([type="submit"]),' + form + " textarea").val(
              ""
            );
          })
          .fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            formMessages.removeClass("success");
            formMessages.addClass("error");
            // Set the message text.
            if (data.responseText !== "") {
              formMessages.html(data.responseText);
            } else {
              formMessages.html(
                "Oops! An error occured and your message could not be sent."
              );
            }
          });
      }
    }

    function validateContact() {
      var valid = true;
      var formInput;
      function unvalid($validation) {
        $validation = $validation.split(",");
        for (var i = 0; i < $validation.length; i++) {
          formInput = form + " " + $validation[i];
          if (!$(formInput).val()) {
            $(formInput).addClass(invalidCls);
            valid = false;
          } else {
            $(formInput).removeClass(invalidCls);
            valid = true;
          }
        }
      }
      unvalid($validation);

      if (
        !$(form + " " + $email).val() ||
        !$(form + " " + $email)
          .val()
          .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      ) {
        $(form + " " + $email).addClass(invalidCls);
        valid = false;
      } else {
        $(form + " " + $email).removeClass(invalidCls);
        valid = true;
      }
      return valid;
    }

    $(form).on("submit", function (element) {
      element.preventDefault();
      sendContact();
    });
  }

  ajaxContactForm(".ajax-contact");
  ajaxContactForm(".ajax-contact2");
  ajaxContactForm(".ajax-contact3");

  /*---------- 10. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*----------- 11. Magnific Popup ----------*/
  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*---------- 12. Section Position ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10);
  }

  $.fn.sectionPosition = function (mainAttr, posAttr, getPosValue) {
    $(this).each(function () {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posValue = convertInteger(section.attr(getPosValue)), // positioning value
          posData = section.attr(mainAttr), // how much to position
          posFor = section.attr(posAttr), // On Which section is for positioning
          parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

        if (posData === "top-half") {
          $(posFor).css("padding-bottom", parentPB + sectionHeight + "px");
          section.css("margin-top", "-" + sectionHeight + "px");
        } else if (posData === "bottom-half") {
          $(posFor).css("padding-top", parentPT + sectionHeight + "px");
          section.css("margin-bottom", "-" + sectionHeight + "px");
        } else if (posData === "top") {
          $(posFor).css("padding-bottom", parentPB + posValue + "px");
          section.css("margin-top", "-" + posValue + "px");
        } else if (posData === "bottom") {
          $(posFor).css("padding-top", parentPT + posValue + "px");
          section.css("margin-bottom", "-" + posValue + "px");
        }
      }
      setPosition(); // Set Padding On Load
    });
  };

  var postionHandler = "[data-sec-pos]";
  if ($(postionHandler).length) {
    $(postionHandler).imagesLoaded(function () {
      $(postionHandler).sectionPosition(
        "data-sec-pos",
        "data-pos-for",
        "data-pos-amount"
      );
    });
  }

  /*----------- 13. Filter ----------*/
  $(".filter-active, .filter-active2").imagesLoaded(function () {
    var $filter = ".filter-active",
      $filter2 = ".filter-active2",
      $filterItem = ".filter-item",
      $filterMenu = ".filter-menu-active";

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1,
        },
      });
    }

    if ($($filter2).length > 0) {
      var $grid = $($filter2).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: $filterItem,
        },
      });
    }

    // Menu Active Class
    $($filterMenu).on("click", "button", function (event) {
      event.preventDefault();
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass("active");
      $(this).siblings(".active").removeClass("active");
    });
  });

  /*----------- 14. One Page Nav ----------*/
  function onePageNav(element) {
    if ($(element).length > 0) {
      $(element).each(function () {
        $(this)
          .find("a")
          .each(function () {
            $(this).on("click", function (e) {
              var target = $(this.getAttribute("href"));
              if (target.length) {
                e.preventDefault();
                event.preventDefault();
                $("html, body")
                  .stop()
                  .animate(
                    {
                      scrollTop: target.offset().top - 10,
                    },
                    1000
                  );
              }
            });
          });
      });
    }
  }
  onePageNav(".onepage-nav, .main-menu, .vs-mobile-menu");

  /*----------- 15. WOW.js Animation ----------*/
  var wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "wow-animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: false, // reset animation on end (default is true)
  });
  wow.init();

  /*----------- 15. Indicator Position ----------*/
  function setPos(element) {
    var indicator = element.siblings(".indicator"),
      btnWidth = element.css("width"),
      btnHiehgt = element.css("height"),
      btnLeft = element.position().left,
      btnTop = element.position().top;
    element.addClass("active").siblings().removeClass("active");
    indicator.css({
      left: btnLeft + "px",
      top: btnTop + "px",
      width: btnWidth,
      height: btnHiehgt,
    });
  }

  $(".login-tab a").each(function () {
    var link = $(this);
    if (link.hasClass("active")) setPos(link);
    link.on("mouseover", function () {
      setPos($(this));
    });
  });

  /*----------- 16. Color Plate Js ----------*/
  if ($(".vs-color-plate").length) {
    var oldValue = $("#plate-color").val();
    $("#plate-color").on("change", function (e) {
      var color = e.target.value;
      $("body").css("--theme-color", color);
    });

    $("#plate-reset").on("click", function () {
      $("body").css("--theme-color", "");
      $("#plate-color").val(oldValue);
    });

    $("#plate-toggler").on("click", function () {
      $(".vs-color-plate").toggleClass("open");
    });
  }

  /*----------- 17. package tab ----------*/

  const tabs = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll("[data-tab-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
      target.classList.add("active");
    });
  });

  /*----------- 16. Testimonial Nav  ----------*/
  $(".testi-nav").each(function () {
    var tabBtnIndex = 0;
    $(this)
      .find(".tab-btn")
      .each(function () {
        var btnCurrent = $(this);
        btnCurrent.attr("data-goto", tabBtnIndex);
        tabBtnIndex++;
        btnCurrent.on("click", function () {
          $("#testislide2").slick("slickGoTo", btnCurrent.data("goto"));
        });
      });
  });

  var testiSlide = $("#testislide2");
  testiSlide
    .on("init", function (event, slick, currentSlide) {
      var cur = $(slick.$slides[slick.currentSlide]);
      var currentIndex = cur.data("slick-index");
      var prevIndex = cur.prev().data("slick-index");
      var nextIndex = cur.next().data("slick-index");
      $(`.testi-nav .tab-btn[data-goto="${currentIndex}"]`).addClass("active");
      $(`.testi-nav .tab-btn[data-goto="${nextIndex}"]`).addClass("next");
      $(`.testi-nav .tab-btn[data-goto="${prevIndex}"]`).addClass("prev");
      slick.$prevIndex = prevIndex;
      slick.$nextIndex = nextIndex;
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var cur = $(slick.$slides[nextSlide]);
      var currentIndex = cur.data("slick-index");
      $(`.testi-nav .tab-btn[data-goto="${slick.$prevIndex}"]`).removeClass(
        "prev"
      );
      $(`.testi-nav .tab-btn[data-goto="${slick.$nextIndex}"]`).removeClass(
        "next"
      );
      var prevIndex = cur.prev().data("slick-index");
      var nextIndex = cur.next().data("slick-index");
      $(`.testi-nav .tab-btn[data-goto="${nextIndex}"]`).addClass("next");
      $(`.testi-nav .tab-btn[data-goto="${prevIndex}"]`).addClass("prev");
      slick.$prevIndex = prevIndex;
      slick.$nextIndex = nextIndex;
      $(`.testi-nav .tab-btn[data-goto="${currentIndex}"]`)
        .addClass("active")
        .removeClass("next")
        .removeClass("prev")
        .siblings()
        .removeClass("active");
    });

  testiSlide.slick({
    speed: 600,
    arrows: false,
    fade: true,
    dots: false,
    autoplay: true,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false, // Infinite should set be false
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
        },
      },
    ],
  });

  /*---------- 11. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on("click", function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on("click", function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox)
      .find("form")
      .on("click", function (e) {
        e.stopPropagation();
        $($searchBox).addClass($toggleCls);
      });
    $($searchCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  }
  popupSarchBox(
    ".popup-search-box",
    ".searchBoxTggler",
    ".searchClose",
    "show"
  );

  /**************************************
   ***** 14. Counter Activation
   **************************************/
  // Counter Animation
  function animateCounter(counter) {
    const targetValue = parseInt(counter.getAttribute("data-counter"));
    const animationDuration = 1000; // Set the desired animation duration in milliseconds
    const startTimestamp = performance.now();

    function updateCounter(timestamp) {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / animationDuration, 1);

      const currentValue = Math.floor(targetValue * progress);
      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function startCounterAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".counter-media__number");
        animateCounter(counter);
        // observer.unobserve(entry.target);
      }
    });
  }

  const counterObserver = new IntersectionObserver(startCounterAnimation, {
    rootMargin: "0px",
    threshold: 0.2, // Adjust the threshold value as needed (0.2 means 20% visibility)
  });

  const counterBlocks = document.querySelectorAll(".counter-media");
  counterBlocks.forEach((counterBlock) => {
    counterObserver.observe(counterBlock);
  });

  // Circle Animation
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Your existing code to animate the circle percent
        var $this = $(entry.target),
          $dataV = $this.data("percent"),
          $dataDeg = $dataV * 3.6,
          $round = $this.find(".round_per");

        $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
        $this.append(
          '<div class="circle_inbox"><span class="percent_text"></span></div>'
        );

        $this.prop("Counter", 0).animate(
          { Counter: $dataV },
          {
            duration: 2000,
            easing: "swing",
            step: function (now) {
              $this.find(".percent_text").text(Math.ceil(now) + "%");
            },
          }
        );

        if ($dataV >= 51) {
          $round.css("transform", "rotate(" + 360 + "deg)");
          setTimeout(function () {
            $this.addClass("percent_more");
          }, 1000);
          setTimeout(function () {
            $round.css(
              "transform",
              "rotate(" + parseInt($dataDeg + 180) + "deg)"
            );
          }, 1000);
        }
        // Disconnect the observer after triggering the animation
        observer.unobserve(entry.target);
      }
    });
  }

  var circleObserver = new IntersectionObserver(handleIntersection, {
    threshold: 0.5, // Adjust the threshold as needed
  });

  $(".circle_percent").each(function () {
    circleObserver.observe(this);
  });
})(jQuery);
