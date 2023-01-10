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
    $('section').append('<div class="card"><img src="'+item.url+'" class="img-fluid"/></div>');
  });
}

function loadGallery(){
  var len = 26;//How long you want to load.
  var pics = [];
  for(var i=1;i<=len;i++){
    var src = './images/pic'+i+'.jpg';
    pics.push({
      "id": i,
      "url": src
    });
  }
  return pics;
}

let galleryItems = loadGallery();
updateGallery(); // once on load
