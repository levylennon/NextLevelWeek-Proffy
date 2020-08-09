import { Request, Response, response } from "express";
import mongoose = require("mongoose");
import ConnectionsModel from "../models/ConnectionsModel";

export default class ConnectionController {
  async index(Request: Request, Response: Response) {
    try {
      const totalConnections = await ConnectionsModel.aggregate([
        { $count: "user" },
      ]);
      return Response.status(200).json(totalConnections);
    } catch (error) {
      return Response.status(400).send();
    }
  }

  async create(Request: Request, Response: Response) {
    const { user } = Request.body;

    try {
      await ConnectionsModel.insertMany({
        user: mongoose.Types.ObjectId(user),
      });
      return Response.status(201).send();
    } catch (error) {
      return Response.status(404).send();
    }
  }
}
