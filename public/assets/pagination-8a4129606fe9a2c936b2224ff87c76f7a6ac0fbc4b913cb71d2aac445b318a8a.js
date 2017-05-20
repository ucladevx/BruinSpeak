(function() {
  jQuery(function() {
    if ($('#infinite-scrolling').size() > 0) {
      $(window).on('scroll', function() {
        var more_petitions_url;
        more_petitions_url = $('.pagination .next_page').attr('href');
        if (more_petitions_url && $(window).scrollTop() > $(document).height() - $(window).height() - 10) {
          $('.pagination').html('<img src="/assets/ajax-loader.gif" alt="Loading..." title="Loading..." />');
          console.log($.getScript(more_petitions_url));
        }
      });
    }
  });

}).call(this);
