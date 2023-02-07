import React, { useState, useEffect,useRef} from 'react';

const WsSocket = () => {
//   const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const API_ENDPOINT = 'wss://emy3jm4e65.execute-api.us-east-1.amazonaws.com/production';

  const socket = useRef(null);

  useEffect(() => {  
    socket.current = new WebSocket(API_ENDPOINT);
    // {"action":"get_equipment","buildingName":"Centergy One"}
    // {"action":"onboard_api","buildingName":"Centergy One","equipOpen":["PUMP"]}

    socket.current.onopen = () => {
      console.log("Connected to WebSocket API!");
      socket.current.send(
      JSON.stringify({
          action: "get_equipment",
          buildingName: "Centergy One",
        })
    // JSON.stringify({
    // action: "onboard_api",
    // buildingName: "Centergy One",
    // equipOpen: ["PUMP"]
    // })
      );
      
    };
    socket.current.onclose = () => console.log("Disconnect to WebSocket API!");
    socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    setResponse(data);
        };

    return () => {
      socket.current.close();
    };
  }, []);

//   useEffect(() => {
//     const connect = async () => {
//       try {
//         const socket = new WebSocket(API_ENDPOINT);
//         console.log("sockect")
//         console.log(socket)

//         setSocket(socket);

//         socket.onmessage = (event) => {
//           const data = JSON.parse(event.data);
//           console.log(data);
//           setResponse(data);
//         };

//         socket.onerror = (event) => {
//           setError(event);
//         };

//         socket.onclose = (event) => {
//           setError(event);
//         };
//       } catch (err) {
//         setError(err);
//       }
//     };

//     connect();

//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, []);

  return (
    <div>
      {error ? <p>{error.message}</p> : null}
      {response ? <pre>{JSON.stringify(response, null, 2)}</pre> : <p>Connecting...</p>}
    </div>
  );
};

export default WsSocket;
