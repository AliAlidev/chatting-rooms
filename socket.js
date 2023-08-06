

isUserEntred = require('./state')
const configureSocket = (io) => {
  console.log("bravoo!");

  io.on("connection", function (socket) {
    console.log("connected!!!")
    function MyIp() {
      const ismyip =
        socket.request.headers["x-forwarded-for"] || "89.187.162.182";

      if (typeof ismyip != "string") {
        socket.emit("msg", {
          cmd: "ev",
          data: 'window.onbeforeunload = null; location.href="/";',
        });
        return false;
      }

      if (!ismyip) {
        socket.emit("msg", {
          cmd: "ev",
          data: 'window.onbeforeunload = null; location.href="/";',
        });
        return false;
      }

      if (ismyip) {
        if (ismyip.includes(",")) {
          socket.emit("msg", {
            cmd: "ev",
            data: 'window.onbeforeunload = null; location.href="/";',
          });
          return false;
        }
      }

      return ismyip;
    }

    console.log("isUserEntred socket", isUserEntred);
  });

};

module.exports = {configureSocket}
