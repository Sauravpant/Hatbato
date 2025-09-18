import "dotenv/config";
import app from "./app";
import { connectDatabase } from "./db/config";
const PORT = process.env.PORT || 4000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
