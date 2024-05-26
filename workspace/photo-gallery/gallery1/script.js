let switching = false;

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

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function updateGallery() {
  $('.gallery__core img, .gallery__bg img').attr('src',galleryItems[0].url);
  var tracks = $('.gallery__track');
  tracks.empty();
  $.each(galleryItems,function(index,item){
    let div = document.createElement('div');
    div.classList.add('gallery__track__item');
    if (index == 0)
      div.classList.add('active');

    var img = document.createElement('img');
    img.src = item.thumb;
    img.setAttribute('data-full', item.url);
    div.appendChild(img);

    tracks.append(div);

    //tracks.append('<div class="gallery__track__item '+(index==0 ? 'active' : '')+'"><img src="'+item.thumb+'" data-full="'+item.url+'" alt=""></div>');
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

// const para = document.createElement("article");
// const img = document.createElement("img");
// const node = document.createTextNode("This is new.");
// para.appendChild(img);
// para.appendChild(node);

// const element = document.getElementById("grid-container");
// element.appendChild(para);