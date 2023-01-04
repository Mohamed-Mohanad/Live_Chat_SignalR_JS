document.addEventListener('DOMContentLoaded', function () {
    var userName = prompt("Enter your name");

    var messageInput = document.getElementById("messageInp");
    var groupInput = document.getElementById("groupNameInp");
    var messageToGroupInput = document.getElementById("messageToGroupInp");

    messageInput.focus();

    //Define proxy
    var proxyConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    proxyConnection.start().then(function () {
        document.getElementById("sendMessageBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("Send", userName, messageInput.value);
        });

        document.getElementById("joinGroupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("JoinGroup", groupInput.value, userName);
        });

        document.getElementById("sendMessageToGroupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("SendMessageToGroup", groupInput.value, userName, messageToGroupInput.value);
        });

    }).catch(function (error) {
        console.log(error);
    });

    proxyConnection.on("RecieveMessage", function (userName, message) {
        var liElement = document.createElement("li");
        liElement.innerHTML = `<strong>${userName} : </strong> ${message}`;
        document.getElementById("conversation").appendChild(liElement);
    });

    proxyConnection.on("NewMemberJoin", function (userName, groupName) {
        var liElement = document.createElement("li");
        liElement.innerHTML = `<i>${userName} has joined </i> ${groupName}`;
        document.getElementById("groupConversationUL").appendChild(liElement);
    });

    proxyConnection.on("RecieveMessageFromGroup", function (sender, message) {
        var liElement = document.createElement("li");
        liElement.innerHTML = `<strong>${sender} : </strong> ${message}`;
        document.getElementById("groupConversationUL").appendChild(liElement);
    });

})