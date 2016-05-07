(function ($) {
  var chosenArtist,
  userData={};

  /**
   * Loads data from the API.
   */
   function loadData() {
    $.ajax({
      url: "http://encore-api.herokuapp.com/approved/photos/30",
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
      var $item = $('<div>').attr('class','grid-item')
        .append($('<img>').attr('src',value.editedPhoto))
        .append($('<div>').attr('class','artistInfo')
          .append($('<div>')
            .append($('<p>').text(value.memory))));

        if(value.memory == ''){
          $item.find( ".artistInfo" ).hide();
        }

      $('.grid section').append($item);
    });

    var $grid = $('.grid').imagesLoaded( function() {
  		// init Packery after all images have loaded
  		$grid.packery({
  		  itemSelector: '.grid-item',
  		  percentPosition: true
  		});

	}); 


    function animate() {
      console.log("animate");
      getNewData();
      $('.grid section:first').remove();
      $('body').animate({scrollTop: $(document).height()}, 45000, animate);
    }

    animate();
  };

  function getNewData(){
    console.log("getNewData");
    $.ajax({
      url: "http://encore-api.herokuapp.com/approved/photos/30",
      method: 'GET',
      dataType: 'json',
      success: function(data){
        $newSection = $('<section>');
        $.each(data, function(i, value) {     
          var $item = $('<div>').attr('class','grid-item')
            .append($('<img>').attr('src',value.editedPhoto))
            .append($('<div>').attr('class','artistInfo')
              .append($('<div>')
                .append($('<p>').text(value.memory))));

            if(value.memory == ''){
              $item.find( ".artistInfo" ).hide();
            }

          $newSection.append($item);
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