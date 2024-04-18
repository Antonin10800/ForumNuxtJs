let clients :any[] = [];

export default defineWebSocketHandler({
    open(peer) {
        console.log("[ws] open", peer);
        clients.push(peer);
    },
    message(peer, message) {
        console.log("[ws] message", peer, message);
        if (message.text().includes("ping")) {
            peer.send("pong");
        }
        if (message.text().includes("newer")) {
            clients.forEach(client => client.send("refresh"));
        }
    },
    close(peer, event) {
        console.log("[ws] close", peer, event);
        clients = clients.filter(client => client !== peer)
    },
    error(peer, error) {
        console.log("[ws] error", peer, error);
    },
});
