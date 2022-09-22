let switching = false;

function updateGallery() {
  $('.gallery__core img, .gallery__bg img').attr('src',galleryItems[0].url);
  $('.gallery__track').empty();
  $.each(galleryItems,function(index,item){
    $('.gallery__track').append('<div class="gallery__track__item '+(index==0 ? 'active' : '')+'"><img src="'+item.thumb+'" data-full="'+item.url+'" alt=""></div>');
  });
}

function getNewImages() {
  $.get('https://api.unsplash.com/search/photos?client_id=j0z73f4p5WNBe2OK28CHq-GY9kN2GxPj2DpS_bV6nFs&page=1&per_page=9&orientation=squarish&query='+$('.gallery__search input').val(),function(data){
    let items = [];
    $.each(data.results,function(index, item){
      console.log(item);
      let newItem = {
        id: item.id,
        url: item.urls.regular,
        thumb: item.urls.thumb
      }
      items.push(newItem);
    });
    console.log(items);
    galleryItems = items;
    updateGallery();
  });
}

$('.gallery__search input').on('keyup',debounce(() => getNewImages()));
$('.gallery__track').on('click','.gallery__track__item',function(){
  if (!switching) {
    switching = true;
    $(this).addClass('active').siblings().removeClass('active');
    // animate in new core image and background image
    const $oldBGImg = $('.gallery__bg img'); 
    const $oldImg = $('.gallery__core img');
    const newImg = $(this).find('img').data('full');
    const $newImg = $('<img class="slide-in" src="'+newImg+'">');
    const $newBGImg = $('<img class="fade-in" src="'+newImg+'">');
    $('.gallery__core').append($newImg);
    $('.gallery__bg').append($newBGImg);
    setTimeout(function(){
      $newImg.addClass('shift-up');
      $oldImg.addClass('shift-up');
      $oldBGImg.addClass('fade-out');
      $newBGImg.addClass('fading');
      setTimeout(function(){
        $('.gallery__core img').eq(0).remove();
        $('.gallery__bg img').eq(0).remove();
        $('.slide-in').removeClass('slide-in shift-up');
        $('.fade-in').removeClass('fade-in fading');
        switching = false;
      },400);
    },10);
  }
});

let galleryItems = [];

var len = 2;//How long you want to wait.
var pics=[];
for(var i=0;i<len;i++){
  var path = './../images/'+i+'.jpg';
  galleryItems.push({
    "id": i,
    "url": path,
    "thumb": path
  });
}

updateGallery(); // once on load

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}