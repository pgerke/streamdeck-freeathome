import { Streamdeck } from "@rweich/streamdeck-ts";

const plugin = new Streamdeck().plugin();
plugin.on("willAppear", ({ context }) => {
  plugin.setTitle("Test", context);
});

export default plugin;
