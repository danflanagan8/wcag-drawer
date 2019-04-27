(function ($, Drupal, drupalSettings) {

  //A class to make accessible drawers
  Drupal.WcagDrawer = function($handle){
    var WcagDrawer = this;
    this.$handle = $handle;
    this.$drawer = $('#' + $handle.attr('aria-controls'));

    this.open = function(){
      this.$handle.attr('aria-expanded', 'true');
      this.$handle.addClass('open');
      this.$drawer.addClass('open');
      this.$drawer.attr('aria-hidden', 'false');
      this.$drawer.slideDown(function(){
        if (WcagDrawer.$handle.data('wcag-focus')) {
          WcagDrawer.$drawer.find('input, select, textarea').first().focus();
        }
      });
      this.isOpen = true;
    }

    this.close = function(){
      this.$handle.attr('aria-expanded', 'false');
      this.$handle.removeClass('open');
      this.$drawer.removeClass('open');
      this.$drawer.attr('aria-hidden', 'true');
      this.$drawer.slideUp();
      this.isOpen = false;
    }

    this.toggle = function(){
      this.isOpen ? this.close() : this.open();
    }

    this.$drawer.addClass('wcag-drawer');
    //drawer starts closed always.
    this.close();
  }

  Drupal.behaviors.wcagDrawer = {

    attach: function(context, settings) {

      //init the drawer handle
      $('.wcag-drawer-handle').once('init-wcag-drawer').each(function(){
        var WcagDrawer = new Drupal.WcagDrawer($(this));
        $(this).data("WcagDrawer", WcagDrawer);
        $(this).click(function(){
          $(this).data("WcagDrawer").toggle();
        });
      });

      //a drawer might load after the handle. Try to connect a drawer to its handle
      $('.wcag-drawer').once('find-wcag-drawer-handle').each(function(){
        var id = $(this).attr('id');
        var $handle = $('.wcag-drawer-handle[aria-controls="' + id + '"]');
        if($handle.length){
          $handle.data('WcagDrawer').$drawer = $(this);
        }
      });

    },
  }
})(jQuery, Drupal, drupalSettings);
