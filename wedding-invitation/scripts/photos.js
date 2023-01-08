let switching = false;

function updateGallery() {
  var tracks = $('.card-columns');
  tracks.empty();
  $.each(galleryItems,function(index,item){
    let div = document.createElement('div');
    div.classList.add('card');

    var img = document.createElement('img');
    img.classList.add('img-fluid');
    img.src = item.thumb;
    img.setAttribute('data-full', item.url);
    div.appendChild(img);

    tracks.append(div);
  });
}

function loadGallery(){
  var len = 16;//How long you want to load.
  var pics = [];
  for(var i=1;i<=len;i++){
    var src = './../images/pic'+i+'.jpg';
    pics.push({
      "id": i,
      "url": src
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