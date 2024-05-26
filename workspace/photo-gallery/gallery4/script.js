$(document).ready(function () {

	//hide all descriptions
	$('.description').hide();

	function showFullHeight() {

	   $('.gallery li').each(function() {

	   	$(this).find('.btn').click(function(e){

	   	console.log('Botão clicado');
	  	
	  	e.preventDefault();

	  	 //NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
		 	$('.description').slideUp('normal');

	     //IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
			if($(this).next().is(':hidden') == true) {
				
				//ADD THE ON CLASS TO THE BUTTON
				$(this).addClass('on');
				  
				//OPEN THE SLIDE
				$(this).next().slideDown('normal');



			 } 
	        
	   }); //click
	  });//each
	}//function


	//load the function when the doc is ready		
  showFullHeight();
  
});


function updateGallery() {
	var gallery = $('.gallery');
	gallery.empty();
	$.each(galleryItems,function(index,item){
	  let li = document.createElement('li');
	  gallery.append(li);

	  let overlay = document.createElement('div');
	  overlay.classList.add('overlay');
	  li.append(overlay);

	  let info = document.createElement('div');
	  info.classList.add('info');
	  li.append(info);

	  let header = document.createElement('h2');
	  header.append(document.createTextNode("This is new."));
	  info.append(header);

	  let p = document.createElement('p');
	  p.append(document.createTextNode("Welcome to my amazing world of photos."));
	  info.append(p);

	  let a = document.createElement('a');
	  a.href = "#";
	  a.classList.add('btn');
	  a.append(document.createTextNode("See Description"));
	  info.append(a);

	  let description = document.createElement('div');
	  description.classList.add('description');
	  info.append(description);

	  let descriptionContents = document.createElement('p');
	  descriptionContents.append(document.createTextNode("Pork belly Carles Wes Anderson semiotics, Thundercats Truffaut iPhone chambray blog normcore direct trade Pinterest gentrify. Pinterest gentrify fanny pack Truffaut, bitters brunch hella kogi craft beer readymade. Synth whatever trust fund Marfa before they sold out, chillwave lomo. Bespoke polaroid Williamsburg, jean shorts literally Etsy Banksy Intelligentsia. Organic Brooklyn shabby chic ennui semiotics, brunch Tumblr mustache Helvetica PBR&B. Literally fanny pack scenester sartorial selfies post-ironic flexitarian tattooed, pork belly hashtag Vice fingerstache squid hella."));
	  description.append(descriptionContents);


	  let bg_img = document.createElement('div');
	  bg_img.classList.add('bg-img');
	  li.append(bg_img);
  
	  var img = document.createElement('img');
	  img.src = item.url;
	  bg_img.appendChild(img);
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