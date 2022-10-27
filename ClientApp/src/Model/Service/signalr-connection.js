const signalR = require('@microsoft/signalr');

export var connection = new signalR.HubConnectionBuilder().withUrl("/actionhub").build();

export const startConnection = async () => {
    try {
      await connection.start();
      console.log('SignalR connected.');
      connection.invoke("AddToGroup").catch(function (err) {
        return console.error(err.toString());
    });
      return connection.connection.connectionId;
    } catch (err) {
      console.log(err);
      //setTimeout(startConnection, 5000);
    }
}

export const stopConnection = async () => {
  try {
    await connection.stop();
    console.log('SignalR stopped.');
  } catch (err) {
    console.log(err);
  }
}