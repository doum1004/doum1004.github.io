var albumBucketName = "---------------------";
var bucketRegion = "-------------------------";
var IdentityPoolId = "-----------------------";
 
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});
 
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});
 
const comment_url = "https://9y9bmv0gkh.execute-api.us-east-1.amazonaws.com/simple_baord/article_resource";

function createNode(element, className) {
    var node = document.createElement(element);
    node.className = className;
    return node;
}

function append(parent, el){
    return parent.appendChild(el);
}

function loadBoard(){
    var elem = document.getElementById('comment-list');
    elem.innerHTML = "";
    
    fetch(comment_url + "?TableName=simple_board&id=jc", {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        }
    }).then(resp => resp.json())
    .then(function(data){
        let items = data.Items;
        return items.map(function(item) {
            let li = createNode('li', 'comment-list-li');

            let div1 = createNode('div', 'comment-item-row');
            append(li, div1);

            let name = createNode('div', 'comment-item-name');
            if (item.name == '')
                item.name = '(empty)';
            name.innerHTML = item.name;
            append(div1, name);

            let date = createNode('div', 'comment-item-date');
            if (item.date == '')
                item.date = '(empty)';
            date.innerHTML = timeForToday(item.date);
            append(div1, date);

            let del = createNode('div', 'comment-item-delete');
            del.innerHTML = '<a href="#">Del</a>'
            append(div1, del);

            let div2 = createNode('div', 'comment-item-row');
            append(li, div2);

            let content = createNode('div', 'comment-item-content');
            if (item.content == '')
                item.content = '(empty)';
            content.innerHTML = item.content;
            append(div2, content);

            append(elem, li);
        })
    })
    .catch(err => console.log(err))
}

function upload_to_db() {
    var article_name = document.querySelector("#input-comment-name");
    var article_pass = document.querySelector("#input-comment-pass");
    var article_content = document.querySelector("#input-comment-content");
 
    var Item = {
        'id': 'jc',
        'name': article_name.value,
        'pass': article_pass.value,
        'content': article_content.value
    }
    console.log(Item);
 
    fetch(comment_url, {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "TableName": "simple_board",
            "Item": Item
        })
    }).then(resp => {
        console.log(resp);
        loadBoard();
        article_name.value = "";
        article_pass.value = "";
        article_content.value = "";
    })
    .catch(err => console.log(err))
}
 
function add_article_with_photo(albumName) {
    var files = document.getElementById("article_image").files;
    if (!files.length) {
        return alert("Please choose a file to upload first.");
    }
    var file = files[0];
    var fileName = file.name;
    var albumPhotosKey = encodeURIComponent(albumName) + "/";
    var albumPhotosKey = albumName + "/";
 
    var photoKey = albumPhotosKey + fileName;
 
    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file
        }
    });
 
    var promise = upload.promise();
 
    let img_location;
 
    promise.then(
        function(data) {
        //이미지 파일을 올리고 URL을 받아옴
        img_location = JSON.stringify(data.Location).replaceAll("\"","");
        // console.log(img_location);
        
        upload_to_db(img_location);
 
        return alert("Successfully uploaded photo.");;
        },
        function(err) {
            console.log(err);
        return alert("There was an error uploading your photo: ", err.message);
        }
    );
    }

    function timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return 'just ago';
        if (betweenTime == 60) return `${betweenTime} min ago`;
        if (betweenTime < 60) return `${betweenTime} mins ago`;

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour == 1) return `${betweenTimeHour} hour ago`;
        if (betweenTimeHour < 24) return `${betweenTimeHour} hours ago`;

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay == 1) return `${betweenTimeDay} day ago`;
        if (betweenTimeDay < 365) return `${betweenTimeDay} days`;

        const betweenTimeYears = Math.floor(betweenTimeDay / 365);
        if (betweenTimeYears == 1) return `${betweenTimeYears} year ago`;
        return `${betweenTimeYears} years ago`;
 }