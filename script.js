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
      var detr = Math.floor((Math.random() * 3) + 1);

      var $item = $('<div>').attr('class','grid-item').append($('<img>').attr('src',value.photoUrl)).append($('<div>').attr('class','artistInfo').append($('<div>').append($('<p>').text(value.bio))))

      if(detr == 1){
        $item.addClass('small');
      }      

      $('.grid section').append($item);

       $('grid').packery('layout');
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
      $('body').animate({scrollTop: $(document).height()}, 30000, animate);
    }

    animate();
  };

  function getNewData(){
    $.ajax({
      url: "data.json",
      method: 'GET',
      dataType: 'json',
      success: function(data){
        $newSection = $('<section>');
        $.each(data, function(i, value) {
          var detr = Math.floor((Math.random() * 3) + 1);
          
          var $item = $('<div>').attr('class','grid-item').append($('<img>').attr('src',value.photoUrl)).append($('<div>').attr('class','artistInfo').append($('<div>').append($('<p>').text(value.bio))))
          
          if(detr == 1){
            $item.addClass('small');
          }

          $newSection.append($item);

          $('grid').packery('layout');
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