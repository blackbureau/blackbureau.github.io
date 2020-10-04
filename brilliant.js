//Dexter Edwards made this http://dexteredwards.com/

$(document).ready(function() {

// Detects if two elements are colliding
var is_colliding = function($div1, $div2) {

  // Div 1 data
  var d1_offset = $div1.offset();
  var d1_height = $div1.outerHeight(true);
  var d1_width = $div1.outerWidth(true);
  var d1_distance_from_top = d1_offset.top + d1_height;
  var d1_distance_from_left = d1_offset.left + d1_width;

  // Div 2 data
  var d2_offset = $div2.offset();
  var d2_height = $div2.outerHeight(true);
  var d2_width = $div2.outerWidth(true);
  var d2_distance_from_top = d2_offset.top + d2_height;
  var d2_distance_from_left = d2_offset.left + d2_width;
  var not_colliding = (d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left);

  // Return whether it IS colliding
  return !not_colliding;
};


var collidingCheck1;
var collidingCheck2;
var collidingCheck3;

var getDirection = function(ev, obj) {
  var w = obj.offsetWidth,
    h = obj.offsetHeight,
    x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
    y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
    d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

  return d;
};

var a = {};

a.settings = {
  url: null
}

a.metrics = {
  cursorX: null,
  cursorY: null
}

a.ui = {
  window: $(window),
  document: $(document),
  body: $('body')
}

a.site = {
  titleState: 1,
  title1: 'Extended Whānau',
  title2: 'cousin@extendedwhanau.com',
  titleTiming: 3000,

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    a.site.toggleDocumentTitle();
  },

  toggleDocumentTitle: function() {
    setInterval(function(){
      if (a.site.titleState === 1) {
        document.title = a.site.title2;
        a.site.titleState = 2;
      } else {
        document.title = a.site.title1;
        a.site.titleState = 1;
      }
    }, a.site.titleTiming);
  }

};


a.slipButtons = {
  el: $('.js-slip-button'),
  emailEl: $('.js-email-contact'),
  x: 50,
  y: 50,
  allQuadrants: [],
  quadrantsOccupied: [],
  elementsRemoved: 0,
  freeQuadrants: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'],

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    this.position();
    this.positionEmail();
    this.fadeInEach();

    $('.js-slip-button [data-side]').on('mouseover', a.slipButtons.calculatedPing);
    $('.js-slip-button [data-side]').on('touchstart', a.slipButtons.calculatedPing);
  },

  listQuadrants: function() {
    a.slipButtons.allQuadrants = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'];
    a.slipButtons.quadrantsOccupied = [];
    a.slipButtons.freeQuadrants = [];

    $('.js-slip-button[data-on-screen="true"]').each(function(i) {
      var $el = $(this);

      var stringx = $el.attr('data-x');
      var stringy = $el.attr('data-y');

      var floatx = parseFloat(stringx);
      var floaty = parseFloat(stringy);

      var xQuadrant;
      var yQuadrant;

      if (floatx < 30) {
        xQuadrant = 'A';
      } else if (floatx < 50) {
        xQuadrant = 'B';
      } else if (floatx < 70) {
        xQuadrant = 'C';
      } else if (floatx > 70) {
        xQuadrant = 'D';
      };

      if (floaty < 30) {
        yQuadrant = '1';
      } else if (floaty < 50) {
        yQuadrant = '2';
      } else if (floaty < 70) {
        yQuadrant = '3';
      } else if (floaty > 70) {
        yQuadrant = '4';
      };

      var quadrantData = xQuadrant + yQuadrant;
      $el.attr('data-quadrant', quadrantData);

      a.slipButtons.quadrantsOccupied.push(quadrantData);
    });

    a.slipButtons.freeQuadrants = a.slipButtons.allQuadrants.filter(function(el) {
      return a.slipButtons.quadrantsOccupied.indexOf(el) < 0;
    });

  },

  calculatedPing: function() {
    var $button = $(this).closest('.js-slip-button');

    // get random quadrant to place item
    var randomQuadrant = a.slipButtons.freeQuadrants[Math.floor(Math.random() * a.slipButtons.freeQuadrants.length)];

    var randomQuadrantX = randomQuadrant.charAt(1);
    var randomQuadrantY = randomQuadrant.charAt(0);

    $('[data-quadrant=' + randomQuadrant + ']').addClass('picked-at-random');


    if (randomQuadrantX === '1') {
      var leftPos = a.helpers.random(10, 30);
    } else if (randomQuadrantX === '2') {
      var leftPos = a.helpers.random(35, 45);
    } else if (randomQuadrantX === '3') {
      var leftPos = a.helpers.random(55, 65);
    } else if (randomQuadrantX === '4') {
      var leftPos = a.helpers.random(75, 90);
    };

    if (randomQuadrantY === 'A') {
      var topPos = a.helpers.random(20, 30);
    } else if (randomQuadrantY === 'B') {
      var topPos = a.helpers.random(35, 45);
    } else if (randomQuadrantY === 'C') {
      var topPos = a.helpers.random(55, 65);
    } else if (randomQuadrantY === 'D') {
      var topPos = a.helpers.random(75, 80);
    };

    var currentRotate = $button.attr('data-rotate');
    var randomRotate = a.helpers.random(-180, 180);
    var newRotate = parseInt(currentRotate) + randomRotate;
    var transformCSS = 'translate3d(-50%, -50%, 0) rotate(' + newRotate + 'deg)';


    // catch for mobile overflow
    if (($(window).innerWidth() < 720) && $button.hasClass('longer-text')) {
      console.log('extended whanau saved from edge');
      if (topPos < 25) {
        topPos = 25;
      }
      if (leftPos < 33) {
        leftPos = 33;
      }
      if (topPos > 75) {
        topPos = 75;
      }
      if (leftPos > 66) {
        leftPos = 66;
      }
    }

    var offChance = parseInt(a.helpers.random(0, 200));

    if (a.slipButtons.elementsRemoved < 3) {
      if ($button.attr('id') != 'extended') {
        if (offChance === 1) {
          topPos = -50;
        };
        if (offChance === 2) {
          leftPos = -50;
        };

        if (offChance === 3) {
          leftPos = 150;
        };

        if (offChance === 4) {
          topPos = 150;
        };
        if (offChance > 0 && offChance < 5) {
          $button.addClass('is-leaving');
          $button.attr('data-on-screen', 'false');
          a.slipButtons.elementsRemoved++;
          console.log(a.slipButtons.elementsRemoved);
        }
      }
    } else {
      if (offChance === 1) {
        topPos = -50;
      };
      if (offChance === 2) {
        leftPos = -50;
      };

      if (offChance === 3) {
        leftPos = 150;
      };

      if (offChance === 4) {
        topPos = 150;
      };
      if (offChance > 0 && offChance < 5) {
        $button.addClass('is-leaving');
        $button.attr('data-on-screen', 'false');
        a.slipButtons.elementsRemoved++;
        console.log(' *** ENTER EMAIL *** ');
        setTimeout(a.slipButtons.enterEmail(), 333);
      }
    }

    $button.addClass('is-moving');
    $button.css('top', topPos + '%');
    $button.css('left', leftPos + '%');
    $button.css('transform', transformCSS);
    $button.attr('data-x', topPos);
    $button.attr('data-y', leftPos);
    $button.attr('data-rotate', leftPos);
    setTimeout(function() {
      $button.removeClass('is-moving');
      $('[data-quadrant=' + randomQuadrant + ']').removeClass('picked-at-random');

    }, 333);

    a.slipButtons.listQuadrants();
  },

  fadeInEach: function() {
    $(".js-slip-button").each(function(i) {
      var $el = $(this);
      setTimeout(function() {
        $el.addClass('is-visible');
      }, i * 333 + 333); // delay 100 ms
    });
  },

  collisionCheck: function(index) {
    var $button = a.slipButtons.el.eq(index);

    setTimeout(function() {
      var collidingCheck1 = is_colliding($button, a.slipButtons.el.eq(index - 1));
      var collidingCheck2 = is_colliding($button, a.slipButtons.el.eq(index - 2));
      var collidingCheck3 = is_colliding($button, a.slipButtons.el.eq(index - 3));

      if (collidingCheck1 === true) {
        // $button.css('border-color', 'yellow');
        a.slipButtons.placement(index);
      } else if (collidingCheck2 === true) {
        a.slipButtons.placement(index);
        // $button.css('border-color', 'lime');
      } else if (collidingCheck3 === true) {
        a.slipButtons.placement(index);
        // $button.css('border-color', 'pink');
      }
    }, 22);
  },

  placement: function(index) {
    var $button = a.slipButtons.el.eq(index);

    if (a.slipButtons.freeQuadrants.length > 2) {
      var randomQuadrant = a.slipButtons.freeQuadrants[Math.floor(Math.random() * a.slipButtons.freeQuadrants.length)];
    } else {
      a.slipButtons.freeQuadrants = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'];
      var randomQuadrant = a.slipButtons.freeQuadrants[Math.floor(Math.random() * a.slipButtons.freeQuadrants.length)];

    }
    // get random quadrant to place item

    var randomQuadrantX = randomQuadrant.charAt(1);
    var randomQuadrantY = randomQuadrant.charAt(0);

    $('[data-quadrant=' + randomQuadrant + ']').addClass('init-position');


    if (randomQuadrantX === '1') {
      var leftPos = a.helpers.random(10, 30);
    } else if (randomQuadrantX === '2') {
      var leftPos = a.helpers.random(35, 45);
    } else if (randomQuadrantX === '3') {
      var leftPos = a.helpers.random(55, 65);
    } else if (randomQuadrantX === '4') {
      var leftPos = a.helpers.random(75, 90);
    };

    if (randomQuadrantY === 'A') {
      var topPos = a.helpers.random(20, 30);
    } else if (randomQuadrantY === 'B') {
      var topPos = a.helpers.random(35, 45);
    } else if (randomQuadrantY === 'C') {
      var topPos = a.helpers.random(55, 65);
    } else if (randomQuadrantY === 'D') {
      var topPos = a.helpers.random(75, 80);
    };


    // catch for mobile overflow
    if (($(window).innerWidth() < 720) && $button.hasClass('longer-text')) {
      console.log('extended whanau saved from edge');
      if (topPos < 25) {
        topPos = 25;
      }
      if (leftPos < 33) {
        leftPos = 33;
      }
      if (topPos > 75) {
        topPos = 75;
      }
      if (leftPos > 66) {
        leftPos = 66;
      }
    }


    $button.css('top', topPos + '%');
    $button.css('left', leftPos + '%');
    $button.attr('data-x', topPos);
    $button.attr('data-y', leftPos);
    $button.attr('data-rotate', '0');

    a.slipButtons.collisionCheck(index);

  },

  replacement: function(index) {

    var $button = a.slipButtons.el.eq(index);
    var topPos = a.helpers.random(15, 85);
    var leftPos = a.helpers.random(15, 85);

    // catch for mobile overflow
    if (($(window).innerWidth() < 720) && $button.hasClass('longer-text')) {
      console.log('extended whanau saved from edge');
      if (topPos < 25) {
        topPos = 25;
      }
      if (leftPos < 33) {
        leftPos = 33;
      }
      if (topPos > 75) {
        topPos = 75;
      }
      if (leftPos > 66) {
        leftPos = 66;
      }
    }

    $button.css('top', topPos + '%');
    $button.css('left', leftPos + '%');
    $button.attr('data-x', topPos);
    $button.attr('data-y', leftPos);
    $button.attr('data-rotate', '0');

    setTimeout(function() {

      var collidingRecheck1 = is_colliding($button, a.slipButtons.el.eq(index - 1));
      var collidingRecheck2 = is_colliding($button, a.slipButtons.el.eq(index - 2));
      var collidingRecheck3 = is_colliding($button, a.slipButtons.el.eq(index - 3));
      console.log('collidingRecheck #' + index);

      if (collidingRecheck1 === true) {
        $button.css('border-color', 'red');
        a.slipButtons.placement(index);
      } else if (collidingRecheck2 === true) {
        a.slipButtons.placement(index);
        $button.css('border-color', 'red');
      } else if (collidingRecheck3 === true) {
        a.slipButtons.placement(index);
        $button.css('border-color', 'red');
      }
    }, 22);

  },

  position: function() {
    a.slipButtons.el.each(function(index) {
      a.slipButtons.placement(index);
    });
    a.slipButtons.listQuadrants();
  },

  positionEmail: function() {
    var randomX = a.helpers.random(0, 100);
    var randomY = a.helpers.random(0, 100);

    if (randomX < 25) {
      var topPos = a.helpers.random(-75, -50);
      var leftPos = a.helpers.random(0, 100);
    } else if (randomX < 75) {
      var leftPos = a.helpers.random(-75, -50);
      var topPos = a.helpers.random(0, 100);
    } else if (randomX < 75) {
      var leftPos = a.helpers.random(150, 175);
      var topPos = a.helpers.random(0, 100);
    } else {
      var topPos = a.helpers.random(150, 175);
      var leftPos = a.helpers.random(0, 100);
    }

    var randomRotate = a.helpers.random(-180, 180);
    var newRotate = randomRotate;
    var transformCSS = 'translate3d(-50%, -50%, 0) rotate(' + newRotate + 'deg)';

    a.slipButtons.emailEl.addClass('is-visible');
    a.slipButtons.emailEl.css('top', topPos + '%');
    a.slipButtons.emailEl.css('left', leftPos + '%');
    a.slipButtons.emailEl.css('transform', transformCSS);
    a.slipButtons.emailEl.attr('data-rotate', newRotate);
  },

  enterEmail: function() {
    console.log('** enterEmail funciton');
    var topPos = a.helpers.random(33, 66);
    var leftPos = a.helpers.random(33, 66);

    var randomRotate = a.helpers.random(-180, 180);
    var newRotate = randomRotate;
    var transformCSS = 'translate3d(-50%, -50%, 0) rotate(' + newRotate + 'deg)';

    a.slipButtons.emailEl.css('top', topPos + '%');
    a.slipButtons.emailEl.css('left', leftPos + '%');
    a.slipButtons.emailEl.css('transform', transformCSS);
    a.slipButtons.emailEl.attr('data-rotate', newRotate);
  }


}

a.debug = {
  init: function() {
    this.all();
    this.layout();
    this.outline();
    this.baseline();
  },

  all: function() {
    if (window.location.href.indexOf("?debug") > -1) {
      a.ui.body.attr('data-debug-layout', 'true');
      a.ui.body.attr('data-debug-outline', 'true');
      a.debug.title();
      a.debug.fontSize();
    }
  },

  fontSize: function() {
    var el = document.documentElement;
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseInt(style);
    console.log('fs: ' + fontSize + 'px');
    $('.js-fs-helper').html(fontSize + 'px');

    $(window).on('resize load', function() {
      var el = document.documentElement;
      var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
      var fontSize = parseInt(style);
      console.log('fs: ' + fontSize + 'px');
      $('.js-fs-helper').html(fontSize + 'px');
    });
  },

  layout: function() {
    if (window.location.href.indexOf("?layout") > -1) {
      a.ui.body.attr('data-debug-layout', 'true');
      a.debug.title();
    }
  },

  outline: function() {
    if (window.location.href.indexOf("?outline") > -1) {
      a.ui.body.attr('data-debug-outline', 'true');
      a.debug.title();
    }
  },

  baseline: function() {
    if (window.location.href.indexOf("?baseline") > -1) {
      a.ui.body.attr('data-debug-baseline', 'true');
      a.debug.title();
    }
  },

  title: function() {
    $(window).on('resize load', function() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      document.title = w + ' ✕ ' + h;
    });
  },

}

a.helpers = {

  init: function() {
    $("body").on('mousemove', a.helpers.onMousemove)
  },

  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  onKeyPress: function(keyCode, functionName) {
    a.ui.document.keyup(function(e) {
      if (e.keyCode == keyCode) {
        functionName.call();
      }
    });
  },

  onMousemove: function(e) {
    a.metrics.cursorX = e.pageX;
    a.metrics.cursorY = e.pageY;

  },


}

a.slipButtons.init();
a.debug.init();
a.helpers.init();
a.site.init();

});
