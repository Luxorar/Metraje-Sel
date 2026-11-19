const cors = require("cors");
app.use(cors());

if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3000);
}

module.exports = app;