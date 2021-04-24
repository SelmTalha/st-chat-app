const socket = io.connect("/");
alert("Bağlantı Kuruldu !")

const sender=document.getElementById("sender");
const message=document.getElementById("message");
const submitBtn=document.getElementById("submitBtn");
const output=document.getElementById("output");
const feedback=document.getElementById("feedback");

submitBtn.addEventListener('click',() => {
    socket.emit('chat',{
        message: message.value,
        sender: sender.value
    })
})

document.onkeyup = function(e){     
    var keycode = (e === null) ? window.event.keyCode : e.keyCode;
    if(keycode === 13) {
        feedback.innerHTML='<p>ONLINE</p>';
        socket.emit('chat',{
            message: message.value,
            sender: sender.value,
        })
    } 
}

socket.on('chat',data => {
    if (data.message!="" && data.sender!=""){
    feedback.innerHTML='<p>ONLINE</p>';
    output.innerHTML +='<p><strong>'+data.sender+': </strong>'+data.message+'</p>'
    message.value='';
    }
})

message.addEventListener('keypress',()=>{
    socket.emit('typing',sender.value)
})

socket.on('typing',data=>{
    feedback.innerHTML='<p> -> ' + data + ' yazıyor...</p>'
})