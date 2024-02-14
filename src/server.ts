import mongoose from "mongoose";
import app from "./app"
import config from "./config";
import seedSuperAdmin from "./utils/seedSuperAdmin";

(async function server() {
    try {
        // DB connection
        await mongoose
            .connect(config.databaseURL as string, {
                autoIndex: true,
            })
            .then(() => {
                seedSuperAdmin()
                console.log('Connected to DB 🔌')
            })
            .catch((error) => console.log(error));

        // server listening
        app.listen(config.port, () => {
            console.log(`server 🔥 on port: ${config.port}`)
        });
    } catch (error) {
        console.log(error);
    }
})();