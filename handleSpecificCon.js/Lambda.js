const AWS = require("aws-sdk");

const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
  apiVersion: "2023-01-20",
  endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`
});

exports.handler = async (event) => {
  if (event.requestContext.eventType === "CONNECT") {
    console.log("WebSocket connection established", event.requestContext);
  } else if (event.requestContext.eventType === "DISCONNECT") {
    console.log("WebSocket connection disconnected", event.requestContext);
  } else if (event.requestContext.eventType === "MESSAGE") {
    const data = JSON.parse(event.body);
    const connectionId = event.requestContext.connectionId;

    await apiGatewayManagementApi
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify({
          message: `Hello, you sent: ${data.message}`
        })
      })
      .promise();
  }

  return { statusCode: 200, body: "" };
};
