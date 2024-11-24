import { app } from "./config/server";
import { env } from "./env";

const port = env.APP_PORT || 8000;

app.listen(port || 8000, () => console.log(`Server running on port ${port}`));