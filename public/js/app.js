const socketIo = io();

socketIo.on("reply",data=>{
    const li = document.createElement("li")
    li.innerHTML = data;
    document.querySelector("ul").appendChild(li)
})

document.getElementById("btn").addEventListener("click",e=>{
    const data = document.getElementById("inpt").value
    socketIo.emit("message",data,res=>{
        if(res==200){
            const li = document.createElement("li")
            li.innerHTML = data;
            document.querySelector("ul").appendChild(li)
            document.getElementById("inpt").value = ""
        }else{
            alert("Failed to send message")
        }
    })
})