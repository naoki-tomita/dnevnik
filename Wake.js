const http = require("https");
function poll() {
  http.get(
    "https://kojiro-ueda-dnevnik.herokuapp.com/",
    (res) => console.log("poll", res.statusCode)
  );
  setTimeout(poll, 5 * 60 * 1000);
}

poll();
