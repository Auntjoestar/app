import "dotenv/config";
import { app } from "./app";

const port = process.env.PORT!;
app.listen(port);
console.log(`Server started at: ${app.server?.hostname}:${app.server?.port}`);
