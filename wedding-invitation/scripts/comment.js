var albumBucketName = "---------------------";
var bucketRegion = "-------------------------";
var IdentityPoolId = "-----------------------";
var boardId = 'jc';
var tableName = 'simple_board';

$(document).ready(function(){
    subscribeCommentSubmitButtonUpdate();
});

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
 
const comment_url = "https://ar8qo8k2ej.execute-api.us-east-1.amazonaws.com/default_stage/comment_resource";

function createNode(element, className) {
    var node = document.createElement(element);
    node.className = className;
    return node;
}

function append(parent, el) {
    return parent.appendChild(el);
}

var commentCount = 0;
function loadBoardCount() {
    var newCommentCount = 0;
    fetch(comment_url + "?TableName=" + tableName + "&board_id=jc&Count", {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        }
    }).then(resp => resp.json())
    .then(function(data){
        newCommentCount = data.Count;
        if (newCommentCount == commentCount)
        {
            redrawBoard();
            return;
        }
        commentCount = newCommentCount;
        loadBoard();
    })
    .catch(err => console.log(err))
}

let items = [];
function loadBoard(scrollToLast = false) {
    fetch(comment_url + "?TableName=" + tableName + "&board_id=jc", {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        }
    }).then(resp => resp.json())
    .then(function(data){
        items = data.Items;
        redrawBoard(scrollToLast);
    })
    .catch(err => console.log(err))
}

function redrawBoard(scrollToLast = false) {
    var elem = document.getElementById('comment-list');
    elem.innerHTML = "";
    
    items.map(function(item) {
        let li = createNode('li', 'comment-list-li');

        let div1 = createNode('div', 'comment-item-row');
        append(li, div1);

        let board_name = createNode('div', 'comment-item-name');
        if (item.board_name == '')
            item.board_name = '(empty)';
        board_name.innerHTML = item.board_name;
        append(div1, board_name);

        let board_time = createNode('div', 'comment-item-date');
        if (item.board_time == '')
            item.board_time = '(empty)';
        board_time.innerHTML = timeForToday(item.board_time);
        append(div1, board_time);

        let del = createNode('div', 'comment-item-delete');
        del.innerHTML = '<a href="javascript:void(0)" onclick="layout_delete_comment_on(\'' + item.board_time + '\',\'' + item.board_name + '\');">Del</a>'
        //del.innerHTML = '<a href="javascript:void(0)" onclick="delete_to_db(\'' + item.board_time + '\',\'' + item.board_name + '\',\'' + item.board_pass + '\');">Del</a>'
        append(div1, del);

        let div2 = createNode('div', 'comment-item-row');
        append(li, div2);

        let board_content = createNode('div', 'comment-item-content');
        if (item.board_content == '')
            item.board_content = '(empty)';
        board_content.innerHTML = item.board_content;
        append(div2, board_content);

        append(elem, li);
    });

    if (scrollToLast) {
        elem.lastElementChild.scrollIntoView();
    }
}

function delete_to_db(createdTime, name, pass) {
    if (createdTime == '' || name == '' || pass == '')
        return;

    var item = {
        'board_id': boardId,
        'board_time': createdTime,
        'board_name': name,
        'board_pass': pass,
    }
        
    fetch(comment_url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "TableName": tableName,
            "Item": item
        })
    }).then(resp => {
        if (resp.status != 200)
        {
            console.log(resp.json());
            alert('Please check your password.');
        }
        else
        {
            layout_off();
            loadBoard(true);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function upload_to_db() {
    var article_name = document.querySelector("#input-comment-name");
    var article_pass = document.querySelector("#input-comment-pass");
    var article_content = document.querySelector("#input-comment-content");
    if (article_name == '' || article_pass == '' || article_content == '')
        return;
 
    var item = {
        'board_id': boardId,
        'board_name': article_name.value,
        'board_pass': article_pass.value,
        'board_content': article_content.value
    }
    article_name.value = "";
    article_pass.value = "";
    article_content.value = "";
 
    fetch(comment_url, {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "TableName": tableName,
            "Item": item
        })
    }).then(resp => {
        if (resp.status != 200)
        {
            console.log(resp.json());
        }
        else
        {
            loadBoard(true);
            document.querySelector("#input-comment-submit").disabled = true;
        }
    })
    .catch(err => {
        console.log(err);
    })
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
    const timeValue = new Date(parseInt(value));

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
 
function subscribeCommentSubmitButtonUpdate() {
    const inputName = document.querySelector('#input-comment-name');
    const inputPass = document.querySelector('#input-comment-pass');
    const inputContent = document.querySelector('#input-comment-content');
    const inputSubmit = document.querySelector('#input-comment-submit');

    if (inputName)
        inputName.addEventListener('keyup', activeEvent);
    if (inputPass)
        inputPass.addEventListener('keyup', activeEvent);
    if (inputContent)
        inputContent.addEventListener('keyup', activeEvent);

    function activeEvent() {
        if (!inputSubmit)
            return;
        
        hasInputNameValue = inputName && inputName.value;
        hasInputPassValue = inputPass && inputPass.value;
        hasInputContentValue = inputContent && inputContent.value;
        switch(!(hasInputNameValue && hasInputPassValue && hasInputContentValue)){
            case true : inputSubmit.disabled = true; break;
            case false : inputSubmit.disabled = false; break
        }
    }
}
