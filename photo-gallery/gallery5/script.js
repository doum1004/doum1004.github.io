var autorotate = true;
function rotate(el) {
  $(".stack .imagewrap.selected").removeClass("selected");
  el.addClass("selected");
  setTimeout(function () {
    $(".stack").prepend($(".stack .imagewrap.selected"));
    setTimeout(function () {
      $(".stack .imagewrap.selected").removeClass("selected");
    }, 200);
  }, 250);
}
function loadactions() {
  $("body")
    .off("click", ".stack .imagewrap:not(:first-child)")
    .on("click", ".stack .imagewrap:not(:first-child)", function () {
      $(".stack .imagewrap.selected").removeClass("selected");
      $(this).addClass("selected");
      setTimeout(function () {
        $(".stack").prepend($(".stack .imagewrap.selected"));
        setTimeout(function () {
          $(".stack .imagewrap.selected").removeClass("selected");
        }, 200);
      }, 250);
    });
}

$(function () {
  loadactions();
  if (autorotate == true) {
    setInterval(function () {
      rotate($(".stack .imagewrap:last-child"));
    }, 1500);
  }
});


function updateGallery() {
	var stack = $('.stack');
	stack.empty();
	$.each(galleryItems,function(index,item){
	  let imagewrap = document.createElement('div');
    imagewrap.classList.add("imagewrap");
	  stack.append(imagewrap);

	  var img = document.createElement('img');
	  img.src = item.url;
    img.classList.add("confirmed");
	  imagewrap.appendChild(img);
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