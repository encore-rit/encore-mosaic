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

    var animate = function(){
    	$('body').animate({scrollTop: $(document).scrollTop() + $(document).height()}, 15000, function(){
    		var $clone = $('.grid section:last').clone();
    		$('.grid').append($clone).packery('appended', $clone);
    		$('.grid section:first').remove();
    		animate();
    	}); 
    }

    animate();
  };

      // Load first data from the API.
  loadData();
})(jQuery);