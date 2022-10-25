const signalR = require('@microsoft/signalr');

export var connection = new signalR.HubConnectionBuilder().withUrl("/actionhub").build();

export const startConnection = async () => {
    try {
      await connection.start();
      console.log('SignalR connected.');
    } catch (err) {
      console.log(err);
      //setTimeout(startConnection, 5000);
    }
}