import { browser } from "$app/environment";
import { PUBLIC_PROBLEM_SOCKET_PATH } from "$env/static/public";
import {  Socket } from "phoenix";

let socket: Socket | null = null;

if (browser) {
  socket = new Socket(`${PUBLIC_PROBLEM_SOCKET_PATH}/socket`);
  socket.connect();
}

export let connect = (topic: string, token: string) => {
  return new Promise((resolve, reject) => {

  let channel = socket!.channel(topic, {token: token});
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

