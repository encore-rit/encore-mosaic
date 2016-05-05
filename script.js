(function ($) {
  var chosenArtist,
  userData={};

  /**
   * Loads data from the API.
   */
   function loadData() {
    $.ajax({
      url: "data.json",
      method: 'GET',
      dataType: 'json',
      success: function(result){
        onLoadData(result);
      },
      error: function(err) {
        console.log('err', err)
      }
    });
  };

  /**
  * Receives data from the API, creates HTML for images and updates the layout
  */
  function onLoadData(data) {
    $.each(data, function(i, value) {
      $('.grid section').append($('<div>').attr('class','grid-item').append($('<img>').attr('src',value.photoUrl)).append($('<div>').attr('class','artistInfo').append($('<div>').append($('<p>').text(value.bio)))));
    });

    var $grid = $('.grid').imagesLoaded( function() {
  		// init Packery after all images have loaded
  		$grid.packery({
  		  itemSelector: '.grid-item',
  		  percentPosition: true
  		});
	}); 

    function animate() {
      getNewData();
      $('.grid section:first').remove();
      $("body").animate({scrollTop: $(document).height()}, 30000, animate);
    }

    animate()
  };

  function getNewData(){
    $.ajax({
      url: "data.json",
      method: 'GET',
      dataType: 'json',
      success: function(data){
        $newSection = $('<section>');
        $.each(data, function(i, value) {
          $newSection.append($('<div>').attr('class','grid-item').append($('<img>').attr('src',value.photoUrl)).append($('<div>').attr('class','artistInfo').append($('<div>').append($('<p>').text(value.bio)))));
        });
        $('.grid').append($newSection).packery('appended', $newSection);
      },
      error: function(err) {
        console.log('err', err)
      }
    });
  }

      // Load first data from the API.
  loadData();
})(jQuery);