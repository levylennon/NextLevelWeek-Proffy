import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

export default class ClassesController {
  async index(Request: Request, Response: Response) {}

  async create(Request: Request, Response: Response) {
    const { name, lastname, email, password } = Request.body;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) console.log(err);

        const password = await hash;
        try {
          UserModel.create({
            name,
            lastname,
            email,
            password,
          });

          Response.status(200).send();
        } catch (error) {
          return Response.status(400).json({
            error: "Unexpected error while creating new class",
          });
        }
      });
    });
  }
  async login(Request: Request, Response: Response) {
    const { email, password } = Request.body;
    
    async function checkUser(email, password) {
      //... fetch user from a db etc.
   
      const match = await bcrypt.compare(password, email.passwordHash);
   
      if(match) {
          //login
      }
   
      //...
  }

  }
}
