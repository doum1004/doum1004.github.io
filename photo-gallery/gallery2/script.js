$( function() {
  var $grid = $('.grid').isotope({
    itemSelector: 'article'
  });

  // filter buttons
  $('.filters-button-group').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
});

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
  }
}

$(window).bind("load", function() {
  $('#all').click();
});


function updateGallery() {
  $('section').empty();
  $.each(galleryItems,function(index,item){
    console.log(item);
    $('section').append('<article><img src="'+item.thumb+'" class="img-responsive"/></article>');
  });
}

function loadGallery(){
  var len = 10;//How long you want to load.
  var pics = [];
  for(var i=0;i<=len;i++){
    var src = './../images/src/'+i+'.jpg';
    var thumb = './../images/thumb/'+i+'.jpg';
    pics.push({
      "id": i,
      "url": src,
      "thumb": thumb
    });
  }
  return pics;
}

let galleryItems = loadGallery();
updateGallery(); // once on load
