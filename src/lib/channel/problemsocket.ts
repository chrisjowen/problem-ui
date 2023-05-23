import { browser } from "$app/environment";
import {  Socket } from "phoenix";

let socket: Socket | null = null;

if (browser) {
  socket = new Socket("ws://localhost:4000/socket");
  socket.connect();
}

export let connect = (topic: string) => {
  return new Promise((resolve, reject) => {

  let channel = socket!.channel(topic, {token: "123"});
  channel
    .join()
    .receive("ok", (resp) => {
      console.log("Joined successfully", resp);
      resolve(channel);
    })
    .receive("error", (resp) => {
      reject(resp);
      console.log("Unable to join", resp);
    });
  });
}

