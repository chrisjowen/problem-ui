import { browser } from "$app/environment";
import {  Socket } from "phoenix";

let socket: Socket | null = null;

if (browser) {
  socket = new Socket("ws://localhost:4000/socket");
  socket.connect();
}

export default socket;