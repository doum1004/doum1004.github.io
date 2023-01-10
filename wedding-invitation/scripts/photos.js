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
