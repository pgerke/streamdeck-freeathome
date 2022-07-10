import { Streamdeck } from "@rweich/streamdeck-ts";

const propertyInspector = new Streamdeck().propertyinspector();
propertyInspector.on("websocketOpen", (event) => {
  console.log("got websocket-open-event!", event);
});

export default propertyInspector;
