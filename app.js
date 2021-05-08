let SimpleMDE = require('simplemde')
const request = require('request')
const electron = require("electron");
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
})




function saveFile(){
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let date = document.getElementById('content-date').value
    let content = editor.value()

    request({
        method: 'POST',
        url: 'http://127.0.0.1:5000/getfile',
        json: {name: title, author: author, content: content, date: date}
    }, (error, response, body) => {
        console.log(error);
        console.log(body);
    });


}

