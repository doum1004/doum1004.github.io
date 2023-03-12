let option = 1;

function updateGallery() {
  $('section').empty();
  $.each(galleryItems,function(index,item){
    if (option == 0)
      $('section').append('<div class="card"><img src="'+item.url+'" class="img-fluid"/></div>');
    else if (option == 1)
      $('section').append('<div class="card"><a class="gallery-link" href="'+item.url+'"><img src="'+item.url+'" class="img-fluid"/></a></div>');
  });
}

function loadGallery(){
  var len = 27;//How many you want to load.
  var pics = [];
  for(var i=0;i<=len;i++){
    var src = './images/pic'+i+'.jpg';
    pics.push({
      "id": i,
      "url": src,
      "caption": i
    });
  }
  return pics;
}

let galleryItems = loadGallery();
updateGallery(); // once on load


(function() {
  $('.gallery-link').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom',
    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el.find('figcaption').text() || item.el.attr('title');
      }
    },
    zoom: {
      enabled: false
    },
    // duration: 300
    gallery: {
      enabled: true,
      navigateByImgClick: false,
      tCounter: ''
    },
    // disableOn: function() {
    //   return $(window).width() > 640;
    // }
  });

}).call(this);