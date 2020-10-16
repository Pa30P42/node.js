const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("../contacts/contacts.routers");
// require("dotenv").config({ path: path.join(__dirname, "./.env") });
require("dotenv").config();
const mongoose = require("mongoose");

class CrudServer {
  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    await this.initDataBase();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }
  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: "http://localhost:3000" }));
    this.app.use(morgan("combined"));
  }

  initRouters() {
    this.app.use("/contacts", contactsRouter);
  }

  async initDataBase() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database has been started");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server started listening on port", process.env.PORT);
    });
  }
}

exports.crudServer = new CrudServer();
