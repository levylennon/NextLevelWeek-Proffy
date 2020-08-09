import express from "express";
const routes = express.Router();

import ClassController from "./controllers/ClassesController";
import SubjectController from "./controllers/SubjectController";
import ConnectionController from "./controllers/ConnectionsController";

const classControllers = new ClassController();
const subjectControllers = new SubjectController();
const connectionControllers = new ConnectionController();

// router classes
routes.get("/classes", classControllers.index);
routes.post("/classes", classControllers.create);

// router subject
routes.get("/subject", subjectControllers.index);
routes.post("/subject", subjectControllers.create);


// router connection 
routes.get("/connections", connectionControllers.index);
routes.post("/connections", connectionControllers.create);

export default routes;
