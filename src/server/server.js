const express = require("express");
const path = require("path");
const cors = require("cors");
const contactsRouter = require("../contacts/contacts.routers");

require("dotenv").config();

class CrudServer {
  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    // this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }
  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: "http://localhost:3000" }));
  }

  initRouters() {
    this.app.use("/contacts", contactsRouter);
  }

  // initErrorHandling() {
  //   this.app.use((err, req, res, next) => {
  //     const statusCode = err.status || 500;
  //     return res.status(statusCode).send(err.message);
  //   });
  // }

  startListening() {
    this.app.listen(3000, () => {
      console.log("Server started listening on port", process.env.PORT);
    });
  }
}

exports.crudServer = new CrudServer();
