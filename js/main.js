
//h1 클릭
$(function () {
  $('h1').click(function (e) {
    e.preventDefault()
    // 이벤트 막기 
    $('html,body').stop().animate({
      scrollTop: 0
    }, 500)
  })

})
$(function () {
  // 모바일 햄버거 메뉴 토글
  $('.menu-toggle').on('click', function () {
    $('#mobileMenu').toggleClass('show');
  });

  // 메뉴 복제해서 모바일 메뉴에 넣기 (한 번만)
  var $menuClone = $('header nav ul').clone();
  $('#mobileMenu').append($menuClone);

  // 모바일 메뉴 내 버튼 클릭 시 메뉴 닫기
  $('#mobileMenu').on('click', 'ul li button', function () {
    $('#mobileMenu').removeClass('show');
  });





  // 스무스 스크롤
  $('[data-animation-scroll="true"]').on('click', function () {
    const target = $(this).data('target');
    const $el = $(target);
    if ($el.length === 0) return;

    const headerH = $('header').outerHeight() || 0;
    const top = $el.offset().top - headerH;
    $('html, body').stop().animate({ scrollTop: top }, 500, 'swing');
  });

  // 스크롤 시 버튼 활성화
  function updateActiveNav() {
    const headerH = $('header').outerHeight() || 0;
    const scrollY = $(window).scrollTop() + headerH + 10;

    let activeBtn = null;

    $('[data-animation-scroll="true"]').each(function () {
      const target = $(this).data('target');
      const $section = $(target);
      if ($section.length === 0) return;

      const top = $section.offset().top;
      const bottom = top + $section.outerHeight();

      if (scrollY >= top && scrollY < bottom) {
        activeBtn = $(this);
        return false; // 현재 섹션 찾았으면 루프 종료
      }
    });

    $('[data-animation-scroll="true"]').removeClass('active');
    if (activeBtn) activeBtn.addClass('active');
  }

  $(window).on('scroll', updateActiveNav);
  $(window).on('load', updateActiveNav);
  updateActiveNav(); // 초기 1회

  // 다크모드 토글 (한 번만)
  window.toggleDarkMode = function () {
    $('body').toggleClass('dark-mode');
  };
});
$(function () {
  // 팝업 열기
  $('.main7 .detailpage a').on('click', function (e) {
    e.preventDefault();

    const idx = $(this).closest('.detailpage').index();
    $('.main7popup img').removeClass('on');
    $('.main7popup img').eq(idx).addClass('on');
    $('.main7popup').show();
  });

  // 팝업 외부 클릭 시 닫기
  $(document).on('mousedown', function (e) {
    const $popup = $('.main7popup');

    // 팝업이 열려 있고, 클릭한 곳이 팝업 영역 밖일 때
    if ($popup.is(':visible') && !$(e.target).closest('.main7popup').length) {
      $popup.hide();
      $popup.find('img').removeClass('on');
    }
  });
  // 팝업 닫기 버튼 기능
  $('.main7popup .close-btn').on('click', function () {
    const $popup = $('.main7popup');
    $popup.hide();
    $popup.find('img').removeClass('on');
  });
});


// webbutton

$(function () {
  // 초기: WEB 버튼 활성화
  $('.webbutton div').removeClass('active');
  $('.webbutton div:contains("WEB")').addClass('active');

  $('.webbutton div').on('click', function () {
    const btnText = $(this).text().trim();

    $('.webbutton div').removeClass('active');
    $(this).addClass('active');

    $('.webdummy').each(function () {
      const $buttons = $(this).find('.projectbutton a');
      let show = false;

      if (btnText === 'WEB') {
        show = true;
      } else if (btnText === 'DESIGN') {
        $buttons.each(function () {
          if ($(this).text().includes('리디자인')) {
            show = true;
            return false; // 반복 종료
          }
        });
      } else if (btnText === 'CODING') {
        $buttons.each(function () {
          if ($(this).text().includes('클론코딩')) {
            show = true;
            return false; // 반복 종료
          }
        });
      }

      if (show) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});


// gotop
$(function () {
  $('.gotop').click(function (e) {
    e.preventDefault()
    // 이벤트 막기 
    $('html,body').stop().animate({
      scrollTop: 0
    }, 500)
  })

})

// cardnews
$(document).ready(function () {
  $('#cardPopup').hide();  // 페이지 로드 시 팝업 숨김

  // 기존 코드 계속 유지
  $('.main8 .swiper-slide a').on('click', function (e) {
    e.preventDefault();
  });

  $('.main8 .swiper-slide').on('click', function () {
    var imgSrc = $(this).find('img').attr('src');
    $('#popupImage').attr('src', imgSrc).on('error', function () {
      $(this).attr('src', 'images/default.png');
    });
    $('#cardPopup').fadeIn();
  });

  $('.card-popup-close').on('click', function () {
    $('#cardPopup').fadeOut();
  });

  $('#cardPopup').on('click', function (e) {
    if (e.target === this) {
      $(this).fadeOut();
    }
  });
});


// EmailJS 
emailjs.init("jaQ2FWerNvREnPEHT");

$(document).ready(function () {
  // gomail 버튼 클릭 시 폼 토글
  $('.gomail').on('click', function () {
    $('#mailForm').toggleClass('show');
  });

  // 메일 보내기 버튼 클릭 시
  $('#send-mail-btn').on('click', function () {
    const name = $('#sender-name').val();
    const email = $('#sender-email').val();
    const message = $('#sender-message').val();

    if (!name || !email || !message) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // EmailJS 보내기
    emailjs.send('service_j5ue8ug', 'template_iem26x4', {
      user_name: name,
      user_email: email,
      message: message
    })
      .then(function (response) {
        alert('메일이 성공적으로 전송되었습니다!');
        // 입력 폼 초기화
        $('#sender-name, #sender-email, #sender-message').val('');
        $('#mailForm').removeClass('show');
      }, function (error) {
        alert('메일 전송 실패: ' + JSON.stringify(error));
        console.error('EmailJS error:', error);
      });
  });
});