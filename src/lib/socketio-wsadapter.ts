import io from "socket.io-client";

const STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};

class SocketIOWSAdapter {
  readyState = STATE.CONNECTING;

  private socket;
  private o = this.onopen;
  private c = this.onclose;
  // private e = this.onerror;

  constructor(url, private hooks, auth?) {
    this.socket = io.connect(url);

    // onMessage: onSocketMessage

    // this.socket.on("connect", () => {
    //   // if (auth) this.socket.emit("authenticate", { token: auth.jwt });
    //   this.o({ name: "open" });
    // });

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.pF3q46_CLIyP_1QZPpeccbs-hC4n9YW2VMBjKrSO6Wg";

    this.socket.on("connect", () => {
      this.socket
        .emit("authenticate", { token })
        .on("authenticated", () => {
          // do other things
          this.o({ name: "open" });
        })
        .on("unauthorized", msg => {
          alert("unauthorized");
          console.error(`unauthorized: ${JSON.stringify(msg.data)}`);
          throw new Error(msg.data.type);
        });
    });

    this.socket.on("sharedb", data => {
      const event = { data };
      this.hooks.onShareDB(event);
      this.onmessage(event);
    });

    this.socket.on("reconnecting", () => {
      this.readyState = STATE.CONNECTING;
    });

    this.socket.on("reconnect", () => {
      this.o({ name: "open" });
    });

    this.socket.on("disconnect", reason => {
      this.readyState = STATE.CLOSING;
      let r;
      if (reason === "transport close") {
        r = "stopped";
      } else {
        r = "closed";
      }
      this.c(r);
    });

    this.socket.on("error", err => {
      console.error(err);
      this.onerror({ err, name: "error" });
    });

    if (auth) {
      this.socket.on("logout", () => {
        auth.logout();
      });
    }
  }

  close(code = 1005, reason) {
    console.log("CLOSE SOCKET", { code, reason });
    this.socket.disconnect(code, reason);
  }

  send(message) {
    this.hooks.onSend(message);
    this.socket.emit("sharedb", message);
  }

  // join(room, cb) {
  //   this.socket.emit("join", { room }, cb);
  // }

  // leave(room, cb) {
  //   this.socket.emit("leave", { room }, cb);
  // }

  // onopen(event?) {
  onopen(event?) {
    this.readyState = STATE.OPEN;
    this.hooks.onOpen(event);
  }

  onclose(event) {
    this.readyState = STATE.CLOSED;
    console.log("CLOSED", { event });
    this.hooks.onClose(event);
  }

  onerror(event) {
    console.error("ERROR", { event });
    this.hooks.onError(event);
  }

  onmessage(event) {
    console.log("MESSAGE RECEIVED", { event });
    this.hooks.onMessage(event);
  }
}

export default SocketIOWSAdapter;
