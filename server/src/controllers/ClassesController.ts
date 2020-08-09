import { Request, Response } from "express";
import convertHourToMinutes from "../utils/convertHourtoMinutes";
import mongoose = require('mongoose');

import UserModel from "../models/UserModel";
import ClassesModel from "../models/ClassesModel";

interface scheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(Request: Request, Response: Response) {

    const filters = Request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;
    
    if (!filters.week_day || !filters.subject || !filters.time)
    return Response.status(400).json({
      error: "Missing filters to search classes",
    });
    
    
    const timeInMinutes = convertHourToMinutes(time);
    console.log(week_day);
    
    const listClasses = await ClassesModel.aggregate([
      { $match: { "subject": mongoose.Types.ObjectId(subject)  } },
      { $match: { "schedule.from": {  $lte: timeInMinutes} } },
      { $match: { "schedule.to": {  $gt: timeInMinutes} } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject",
          foreignField: "_id",
          as: "subject",
        },
      },
      
    ])
      .unwind("subject")
      .unwind("user")
      .unwind('schedule')
     

     return Response.status(200).json(listClasses);
  }

  async create(Request: Request, Response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = Request.body;

    try {
      const User = await UserModel.create({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user = User._id;

      // convert the value of 'FROM' and 'TO' to number
      const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await ClassesModel.create({
        user,
        subject,
        cost,
        schedule: classSchedule,
      });

      return Response.status(201).send();
    } catch (error) {
      return Response.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}
