const bodyParser = require("body-parser");

export default function expressConfig(app) {
  app.use(bodyParser.json());
}
