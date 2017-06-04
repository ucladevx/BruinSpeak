var searchModule = (function () {
    'use strict';

    // cache elements
    var $searchForm = $('#navbar-form');
    var $searchBtn = $('#search-btn');
    var $searchExit = $('#search-btn-exit');
    var $searchInput = $('#search');
    var $navRems = $('.nav-rem');

    var ESC = 27;
    var ENTER = 13;

    function closeSearch() {
      console.log('CLOSING SEARCH');
      $searchInput.val('');
      $searchForm.removeClass('active');

      $navRems.removeClass("nav-dis");

      $searchBtn.removeClass("search-btn-search");
      $searchBtn.addClass("search-btn-reg");
    }

    function openSearch() {
      console.log('OPENING SEARCH');
      $navRems.addClass("nav-dis");

      $searchBtn.removeClass("search-btn-reg");
      $searchBtn.addClass("search-btn-search");

      $searchForm.addClass('active');
      $searchInput.focus();
    }

    function handleKeyPress(e) {
      console.log('HANDLING FORM KEYPRESS');
      if(e.which === ESC && $searchForm.hasClass('active')) {
        e.preventDefault();
        closeSearch();
      } else if(e.which === ENTER && $searchInput.val === '') {
        e.preventDefault();
      }
    }

    function handleSearchClick(e) {
      console.log('HANDLING SEARCH CLICK');
      if(!$searchForm.hasClass('active')) {
        e.preventDefault();
        openSearch();
      }
    }

    function init() {
      console.log('Initializing Search');
      $searchBtn.on('click', handleSearchClick);
      $searchExit.on('click', closeSearch);
      $searchInput.on('keyup', handleKeyPress);
    }

    function recache() {
      $searchForm = $('#navbar-form');
      $searchBtn = $('#search-btn');
      $searchExit = $('#search-btn-exit');
      $searchInput = $('#search');
      $navRems = $('.nav-rem');
    }

    return {
      init: init,
      recache: recache
    }
})();


document.addEventListener("turbolinks:load", function() {
  searchModule.recache();
  searchModule.init();
})
