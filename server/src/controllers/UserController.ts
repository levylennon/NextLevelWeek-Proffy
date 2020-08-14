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

        const HashPassword = await hash;
        try {
          UserModel.create({
            name,
            lastname,
            email,
            password: HashPassword,
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
    try {
      const { email, password } = Request.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return Response.status(400).json({ error: "User not found" });
      }

      if (!(await user.compareHash(password))) {
        return Response.status(400).json({ error: "Invalid password" });
      }

      return Response.json({
        user: { name: user.name, lastname: user.lastname },
        token: user.generateToken(),
      });
    } catch (err) {
      return Response.status(400).json({ error: "User authentication failed" });
    }
  }
}
