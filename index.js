const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

//*ROUTES
require("./routes/user")(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});