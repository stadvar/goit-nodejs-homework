const app = require("../app");
const db = require("../db");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server was running on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server wasn't running. ${err.message}`);
});
