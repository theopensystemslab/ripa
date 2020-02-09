import sharedb from "sharedb/lib/client";

import SocketIOWSAdapter from "./socketio-wsadapter";

class Sharer {
  connection;
  afterJoin;
  beforeRemove;
  doc;

  constructor({
    onSocketClose = _event => {},
    onSocketError = _err => {},
    onSocketMessage = _data => {},
    onSocketOpen = _event => {},
    onSocketSend = _data => {},
    onSocketShareDB = _data => {},
    afterJoin = _self => {},
    beforeRemove = _self => {},
    socketUrl = `ws://${window.location.host}`
  }) {
    const socket = new SocketIOWSAdapter(socketUrl, {
      onClose: onSocketClose,
      onError: onSocketError,
      onMessage: onSocketMessage,
      onOpen: onSocketOpen,
      onSend: onSocketSend,
      onShareDB: onSocketShareDB
    });

    this.afterJoin = async () => await afterJoin(this);
    this.beforeRemove = async () => await beforeRemove(this);

    this.connection = new sharedb.Connection(socket);
  }

  async join(collection, docName, initialData = {}) {
    try {
      if (this.doc) {
        console.log("existing doc");

        await this.beforeRemove();

        await this.disconnect();
        console.log("disconnected");
      } else {
        console.log("new doc, no need to disconnect");
      }
    } catch (e) {
      console.error(e);
    }

    this.doc = this.connection.get(collection, docName);

    await this.shareConnect(initialData);

    await this.afterJoin();
  }

  shareConnect(initialData) {
    console.log({ initialData });
    return new Promise((res, rej) => {
      this.doc.subscribe(async err => {
        if (err) return rej(err);
        if (this.doc.type === null) {
          await this.createDoc(initialData);
        }
        return res();
      });
    });
  }

  async createDoc(initialData) {
    console.log("creating doc");
    return new Promise(async (res, rej) => {
      this.doc.create(initialData, err => {
        if (err) rej(err);
        console.log("created doc");
        res();
      });
    });
  }

  disconnect() {
    console.log("disconnecting doc...");
    return new Promise((res, rej) => {
      this.doc.destroy(err => {
        if (err) rej(err);
        res();
      });
    });
  }

  async send(ops) {
    return new Promise((res, rej) => {
      this.doc.submitOp(ops, err => {
        if (err) rej(err);
        else res();
      });
    });
  }
}

export default Sharer;
