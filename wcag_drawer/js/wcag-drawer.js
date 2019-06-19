(function ($, Drupal, drupalSettings) {

  //A class to make accessible drawers
  Drupal.WcagDrawer = function($drawer){
    var WcagDrawer = this;

    this.init = function($drawer) {
      WcagDrawer.$drawer = $drawer;
      var slideTime = $drawer.data('slideTime');
      if (Number(slideTime) === 0) {
        WcagDrawer.slideTime = 0;
      }
      else {
        WcagDrawer.slideTime = $drawer.data('slideTime') ? Number($drawer.data('slideTime')) : 400;
      }
      WcagDrawer.initHandles();
      WcagDrawer.initClosers();

      if ($drawer.hasClass('load-open')) {
        this.open();
      }
      else {
        this.close();
      }

    }

    this.initHandles = function(){
      var id = WcagDrawer.$drawer.attr('id');
      var $handles = $('.wcag-drawer-handle[aria-controls="' + id + '"]');
      $handles.off("click").click(function(){
        WcagDrawer.toggle();
      });
      WcagDrawer.$handles = $handles;
    }

    this.initClosers = function(){
      var id = WcagDrawer.$drawer.attr('id');
      var $closers = WcagDrawer.$drawer.find('.wcag-drawer-closer');
      $closers.off("click").click(function(){
        WcagDrawer.close();
      });
      $closers.attr('aria-controls', id).attr('aria-label', "Close drawer");
      WcagDrawer.$closers = $closers;
    }

    this.open = function(){
      WcagDrawer.$handles.attr('aria-expanded', 'true');
      WcagDrawer.$handles.addClass('open');
      WcagDrawer.$drawer.addClass('open');
      WcagDrawer.$drawer.attr('aria-hidden', 'false');
      WcagDrawer.$drawer.slideDown(WcagDrawer.slideTime, function(){
        if (WcagDrawer.$drawer.data('wcag-focus')) {
          WcagDrawer.$drawer.find('input, select, textarea').first().focus();
        }
      });
      WcagDrawer.isOpen = true;
    }

    this.close = function($handle){
      this.$handles.attr('aria-expanded', 'false');
      this.$handles.removeClass('open');
      this.$drawer.removeClass('open');
      this.$drawer.attr('aria-hidden', 'true');
      this.$drawer.slideUp(WcagDrawer.slideTime);
      this.isOpen = false;
    }

    this.toggle = function(){
      this.isOpen ? this.close() : this.open();
    }

    this.init($drawer);

  }

  Drupal.behaviors.wcagDrawer = {

    attach: function(context, settings) {
      console.log('wcag');
      // Init drawers
      $('.wcag-drawer').once('init-wcag-drawer').each(function(){
        var WcagDrawer = new Drupal.WcagDrawer($(this));
        $(this).data("WcagDrawer", WcagDrawer);
      });

      // Handle might load after the drawer. Try to connect a drawer to its
      // Closers live inside the drawer, so there's no extra script for them.
      $('.wcag-drawer-handle').once('find-wcag-drawer').each(function(){
        var id = $(this).attr('id');
        var $drawer = $('#' + id);
        if ($(this).data("WcagDrawer")) {
          $(this).data("WcagDrawer").initHandles();
        }
      });

    },
  }
})(jQuery, Drupal, drupalSettings);
