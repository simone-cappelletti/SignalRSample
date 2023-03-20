using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class HouseGroupHub : Hub
    {
        //There is no mechanism in SignalR to track if client belongs in a group or not
        public static List<string> GroupsJoined { get; set; } = new List<string>();

        public async Task JoinHouse(string houseName)
        {
            var clientKey = $"{Context.ConnectionId}:{houseName}";

            //Check if the connection is already in that group
            if (!GroupsJoined.Contains(clientKey))
            {
                GroupsJoined.Add(clientKey);

                await Clients.Caller.SendAsync("subscriptionStatus", GetHouseList(), houseName.ToLower(), true);

                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);

                await NotifyHouse(houseName, true);
            }
        }

        public async Task LeaveHouse(string houseName)
        {
            var clientKey = $"{Context.ConnectionId}:{houseName}";

            //Check if the connection is already in that group
            if (GroupsJoined.Contains(clientKey))
            {
                GroupsJoined.Remove(clientKey);

                await Clients.Caller.SendAsync("subscriptionStatus", GetHouseList(), houseName.ToLower(), false);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);

                await NotifyHouse(houseName, false);
            }
        }

        public async Task NotifyHouse(string houseName, bool hasSubscribed)
        {
            await Clients.Others.SendAsync("notifyHouse", houseName, hasSubscribed);
        }

        public async Task TriggerHouseNotify(string houseName)
        {
            await Clients.Group(houseName).SendAsync("triggerHouseNotification", houseName);
        }

        private string GetHouseList()
        {
            var houseList = string.Empty;

            houseList = String.Join(' ', GroupsJoined.Where(group => group.Contains(Context.ConnectionId)).Select(group => group.Split(':', StringSplitOptions.RemoveEmptyEntries)[1]));

            return houseList;
        }
    }
}
