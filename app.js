let SimpleMDE = require('simplemde')
const request = require('request')
const electron = require('electron')
const closeBtn = document.getElementById('CloseButton')
let editor = new SimpleMDE({
    element: document.getElementById('content-edit')[0],
    renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
    },
    toolbar: ["code",
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "ordered-list",
        "unordered-list",
        "|",
        "image",
        "link",
        "preview"]
})


closeBtn.addEventListener('click', function (event){
    electron.ipcRenderer.send('close-window')
});


$(function(){
    $("#CloseNotif").on('click', function (e){
        $("#notify").hide()
    })

    $("form").validate({
        rules:{
            title:{
                required: true,
                minlength: 3
            },
            date:{
                required: true,
            },
            content:{
                required: true,
                minlength: 3
            }
        },
        errorPlacement: function(error,element) {
            return true;
        }
    })
})

$("form").submit(function (e){
    e.preventDefault()
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let date = document.getElementById('content-date').value
    let content = editor.value()
    $("#notify").draggable()


    if($("form").valid()){
        request({
            method: 'POST',
            url: 'http://127.0.0.1:5000/getfile',
            json: {name: title, author: author, content: content, date: date}
        }, (error, response, body) => {
            if(response.statusCode !== 200){
                $("#notify").show()
                $("#status").text(`Error: ${response.statusCode}`)
                $("#statusMessage").text("Something went wrong")
            }else{
                $("#notify").show()
                $("#status").text(response.statusCode)
                $("#statusMessage").text("File successfully sent to the Server")
            }
        });
    }else{
        $("#notify").show()
        $("#status").text(`Form Invalid`)
        $("#statusMessage").text("Form data is invalid")
    }
    editor.value("")
})

