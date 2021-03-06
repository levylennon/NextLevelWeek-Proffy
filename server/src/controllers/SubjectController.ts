import { Request, Response } from "express";

import SubjectModel from "../models/SubjectModel";

interface scheduleItem {
  description: string;
}

export default class ClassesController {
  async index(Request: Request, Response: Response) {
    try {
      const Subject = await SubjectModel.find();
      return Response.json(Subject);
    } catch (error) {
      return Response.status(400).json({
        error: "Unexpected error while list all subjects",
      });
    }
  }

  async create(Request: Request, Response: Response) {
    const { description } = Request.body;

    try {
      const Subject = await SubjectModel.create({
        description,
      });

      return Response.json(Subject);
    } catch (error) {
      console.log(error);

      return Response.status(400).json({
        error: "Unexpected error while creating new subject",
      });
    }
  }
}
