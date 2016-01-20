/*calc */
	function c(o)
	{
		o.parentNode.style.display='none';
		return false;
	}

	function calc()
	{

		var calc = {};

		calc.vars =
		{

			 hpd					: 8 * 0.7
			,rate					: 100

			,commons : {

					 recon			: 2
					,reporting		: 4
					,translation	: 4
					,presentation	: 2
					,factor			: 1.25
			}

			,specifics : {

				hosts : {

					 recon			: 1
					,scanning		: 1
					,validation		: 1
					,reporting		: 1
					,factor			: 1

				}

				,apps : {

					 recon			: 1
					,scanning		: 1
					,validation		: 2
					,reporting		: 2
					,factor			: 2
				}

				,services : {

					 recon			: 1
					,scanning		: 2
					,validation		: 1
					,reporting		: 1
					,factor			: 1.5
				}
			}

			,social : {

				employees : {

					 recon			: 0.25
					,pretexting		: 0.25
					,communication	: 0.1
					,reporting		: 0.15
					,factor			: 1
				}
			}

		};


		calc.hide = function()
		{
			var tmp = this.parentNode.parentNode.parentNode.parentNode;
			tmp.className = ('grp' == tmp.className ) ? 'grp-sel' : 'grp';
 			this.className = ('grp' == tmp.className ) ? '' : 'sel';

			calc.recalc();
			return false;
		};


		calc.bin = function()
		{
			var tmp = this.parentNode.parentNode.parentNode.parentNode.parentNode;
			if ('grp' == tmp.className )
				return false;

 			this.className = ('sel' == this.className ) ? '' : 'sel';

			calc.recalc();
			return false;
		};

		calc.check = function(o)
		{
			if((o.value * 1) !== o.value) o.value = o.value.replace(/[^0-9]/g, '');

			if(0 !== o.value && 0 == o.value.indexOf('0'))	o.value = +o.value;
			if('' == o.value) o.value = 0;
		};


		calc.recalc = function()
		{

			var
			time = [];
			tmp1 = g1.parentNode.parentNode.parentNode.parentNode,
			tmp2 = g2.parentNode.parentNode.parentNode.parentNode,
			tmp3 = g3.parentNode.parentNode.parentNode.parentNode;


			calc.check(v1);
			calc.check(v2);
			calc.check(v3);
			calc.check(v4);


			time[1] = 			(
			 (
			   calc.vars.specifics.hosts.recon
			 + calc.vars.specifics.hosts.scanning
			 + calc.vars.specifics.hosts.validation
			 + calc.vars.specifics.hosts.reporting
			 )
			 * calc.vars.specifics.hosts.factor
			 * v1.value
			 * (('grp-sel' == tmp1.className) ? 1 : 0)
			);

			time[2] =
			(
			 (
			   calc.vars.specifics.apps.recon
			 + calc.vars.specifics.apps.scanning
			 + calc.vars.specifics.apps.validation
			 + calc.vars.specifics.apps.reporting
			 )
			 * calc.vars.specifics.apps.factor
			 * v2.value
			 * (('grp-sel' == tmp1.className) ? 1 : 0)
			);

			time[3] =
			(
			 (
			   calc.vars.specifics.services.recon
			 + calc.vars.specifics.services.scanning
			 + calc.vars.specifics.services.validation
			 + calc.vars.specifics.services.reporting
			 )
			 * calc.vars.specifics.apps.factor
			 * v3.value
			 * (('grp-sel' == tmp1.className) ? 1 : 0)
			);

			time[4] =
			(
			 (
			   calc.vars.social.employees.recon
			 + calc.vars.social.employees.pretexting
			 + calc.vars.social.employees.communication
			 + calc.vars.social.employees.reporting
			 )
			 * calc.vars.social.employees.factor
			 * v4.value
			 * (('grp-sel' == tmp2.className) ? 1 : 0)
			);


			calc.vars.time = 
			(
			   time[1]
			 + time[2]
			 + time[3]
			 + time[4]
			);


			calc.vars.time1 = 
			(
			   ( time[1] * (('sel' == v5.className) ? 1.25 : 1) )
			 + ( time[2] * (('sel' == v5.className) ? 1.25 : 1) )
			 + ( time[3] * (('sel' == v5.className) ? 1.25 : 1) )
			 + ( time[4] * (('sel' == v6.className) ? 1.25 : 1) )
			);


			/* commons */
			time[0] = 
			(
			 (
			   calc.vars.commons.recon
			 + calc.vars.commons.reporting
			 + (('grp-sel' == tmp3.className) ? calc.vars.commons.translation : 0)
			 + calc.vars.commons.presentation
			 )
			 * (('grp-sel' == tmp1.className || 'grp-sel' == tmp2.className) ? 1 : 0)
			);


			if (0 !== calc.vars.time)
			{
				calc.vars.time  += time[0];
				calc.vars.time1 += time[0];
			}


			o1.value = Math.round(calc.vars.time / calc.vars.hpd);
			o2.value = (calc.vars.time1 * calc.vars.rate * calc.vars.commons.factor).toFixed(2);

		};


		calc.field = function()
		{

			var tmp = this.parentNode.parentNode.parentNode.parentNode.parentNode;

			if('grp-sel' == tmp.className )
			{
				var line = this.parentNode.parentNode.parentNode;
				line.className = 'sel';


				this.onkeyup = 
				this.onchange = calc.recalc;


				this.onblur = function()
				{
					line.className = '';
				};

			} else this.blur();
		};


		var
		g1 = document.getElementById('g1'),
		g2 = document.getElementById('g2'),
		g3 = document.getElementById('g3'),

		v1 = document.getElementById('v1'),
		v2 = document.getElementById('v2'),
		v3 = document.getElementById('v3'),
		v4 = document.getElementById('v4'),

		v5 = document.getElementById('v5'),
		v6 = document.getElementById('v6'),


		o1 = document.getElementById('o1'),
		o2 = document.getElementById('o2');

		g1.onclick =
		g2.onclick =
		g3.onclick = calc.hide;

		v1.onfocus = 
		v2.onfocus =
		v3.onfocus =
		v4.onfocus = calc.field;

		v5.onclick =
		v6.onclick = calc.bin;

		calc.recalc();

	};


/*calc ends*/
/* Smooth scrolling */
$(document).ready(function() { 

    $('.js-scroll').click(function(){
        var headerHeight = 72;

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - headerHeight
        }, 500);
        return false;
    });
/* go top */    
    $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();    
            } else {
                $('.scrollup').fadeOut();
            }
        }); 
 
        $('.scrollup').click(function(){
            $('html, body').animate({ scrollTop: 0 }, 600);
            return false;
    });
});

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=02fa71336fbf52cb84a5)
 * Config saved to config.json and https://gist.github.com/02fa71336fbf52cb84a5
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=7d2deab4da56f1442aa1)
 * Config saved to config.json and https://gist.github.com/7d2deab4da56f1442aa1
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);


/* COLLAPSE MENU ON TAP/SELECT on mobile and tablet devices ==== */

$('.nav a').on('click', function(){
  $(".navbar-toggle").click() //bootstrap 3.x
});