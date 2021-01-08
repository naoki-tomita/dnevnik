const http = require("http");
function poll() {
  http.get(
    "https://kojiro-ueda-dnevnik.herokuapp.com/",
    (res) => console.log("poll", res.statusCode)
  );
  setTimeout(poll, 20 * 60 * 1000);
}

poll();
