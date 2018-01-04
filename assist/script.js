


// Smooth scrolling
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        // $('html, body') no longer working in Safari anymore (2017-09-29).
        $('html, body').animate({
          scrollTop: target.offset().top - $('#navigation-wrapper').height()
          // scrollTop: target.offset().top - ( $(window).height() - target.outerHeight(true) ) / 2
        }, 250);
        // target.addClass('animated bounceIn');
        return false;
      }
    }
  });
});

// Copyright
document.body.addEventListener('copy', function(e) {
  if (window.getSelection().toString() && window.getSelection().toString().length > 42) {
    setClipboardText(e);
  }
});

function setClipboardText(event) {
  var clipboardData = event.clipboardData || window.clipboardData;
  if (clipboardData) {
    event.preventDefault();
    var htmlData = ''
      + '著作权归作者所有。<br>'
      + '商业转载请联系作者获得授权，非商业转载请注明出处。<br>'
      + '作者：太空小孩<br>'
      + '链接：' + window.location.href + '<br><br>'
      + window.getSelection().toString();
    var textData = ''
      + '著作权归作者所有。\n'
      + '商业转载请联系作者获得授权，非商业转载请注明出处。\n'
      + '作者：太空小孩\n'
      + '链接：' + window.location.href + '\n\n'
      + window.getSelection().toString();
    clipboardData.setData('text/html', htmlData);
    clipboardData.setData('text/plain', textData);
  }
}

// Toogle header
// var mq = window.matchMedia('(min-width: 768px)');
// if (mq.matches) {
  $(window).scroll(function() {
    // Chrome 61 doesn't support document.body scrolling (2017-09-29).
    if ($('html').scrollTop() > $('#navigation-wrapper nav').height() || $('body').scrollTop() > $('#navigation-wrapper nav').height()) {
      $('#navigation-wrapper').addClass('floated');
      $('#navigation-wrapper .navbar').removeClass('navbar-inverse').addClass('navbar-light');
    } else {
      $('#navigation-wrapper').removeClass('floated');
      $('#navigation-wrapper .navbar').removeClass('navbar-light').addClass('navbar-inverse');
    }
  });
// }
// else {
//   $('#navigation-wrapper').addClass('floated');
// }

// Wechat share thumbnail image
$(function() {
  if (navigator.userAgent.match(/MicroMessenger/i)) {
    var wechat_img = $('#intro-wrapper').css('background-image');
    wechat_img = wechat_img.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
    $('body').prepend('<div style="overflow: hidden; width: 0; height: 0; margin: 0 auto;"><img src="' + wechat_img + '" /></div>');
  };
});

// Console
if (!window.console) {
  window.console = {
    log : function(){},
    info: function(){}
  };
};
// console.log(
//   '%c\u592a\u7a7a\u5c0f\u5b69',
//   'color: #404040; font-family: "Avenir Next", "Avenir", "Segoe UI", "Helvetica Neue", "Helvetica", "HanHei SC", "PingFang SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif; font-size: 2rem; -webkit-font-smoothing: antialiased; letter-spacing: 10px;'
// );
// console.log(
//   '%c\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0073\u0070\u0061\u0063\u0065\u006b\u0069\u0064\u002e\u006d\u0065\u002f',
//   'color: #bfbfbf; font-family: "Avenir Next", "Avenir", "Segoe UI", "Helvetica Neue", "Helvetica", "HanHei SC", "PingFang SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif; font-size: .875rem;'
// );
// console.info(
//   '%c\u0043\u0072\u0065\u0061\u0074\u0069\u0076\u0065\u0020\u0043\u006f\u006d\u006d\u006f\u006e\u0073\u300c\u7f72\u540d\u0020\u002d\u0020\u975e\u5546\u4e1a\u6027\u4f7f\u7528\u0020\u002d\u0020\u7981\u6b62\u6f14\u7ece\u0020\u0034\u002e\u0030\u300d\u8bb8\u53ef\u534f\u8bae',
//   'color: #404040; font-family: "Avenir Next", "Avenir", "Segoe UI", "Helvetica Neue", "Helvetica", "HanHei SC", "PingFang SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif; font-size: .875rem;'
// );

// Plug-ins
$(document).ready(function() {
  // Bootstrap Popover
  $('#button-reward').popover({
    trigger: 'hover'
  });
  $('[data-toggle="popover"]').popover();

  // FancyBox
  $('[data-fancybox]').fancybox({
    clickContent: 'close'
  });
});
