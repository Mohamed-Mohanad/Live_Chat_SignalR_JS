
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task Send(string userName, string message)
        {
            //Save Message To DB Here !
            await Clients.All.SendAsync("RecieveMessage", userName, message);
        }

        public async Task JoinGroup(string groupName, string userName)
        {
            //Save   To DB Here !
            await Groups.AddToGroupAsync(GetConnectionId(), groupName);
            await Clients.OthersInGroup(groupName).SendAsync("NewMemberJoin", userName, groupName);
        }

        public async Task SendMessageToGroup(string groupName, string sender, string message)
        {
            //Save Message To DB Here !
            await Clients.Group(groupName).SendAsync("RecieveMessageFromGroup", sender, message);
        }

        public string GetConnectionId() => Context.ConnectionId;
    }
}
