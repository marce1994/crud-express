import { Request, Response } from "express";
import { Types } from "mongoose";
import { CommentService } from "../services";

export default class CommentController {
    static async findById(req: Request, res: Response, next: Function): Promise<any> {
        try {
            if (!Types.ObjectId.isValid(req.params.id))
                res.status(400).send({ message: "Invalid id" });
            else
                res.send(await CommentService.findById(req.params.id));
        } catch (err) {
            next(err);
        }
    }

    static async fetch(req: Request, res: Response, next: Function): Promise<any> {
        try {
            if (!Types.ObjectId.isValid(req.params.id))
                res.status(400).send({ message: "Invalid id" });
            else
                res.send(await CommentService.findByArticleId(req.params.id));

        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: Function): Promise<any> {
        try {
            res.send(await CommentService.create(req.body));
        }
        catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: Function): Promise<any> {
        try {
            if (!Types.ObjectId.isValid(req.params.id))
                res.status(400).send({ message: "Invalid id" });
            else if (!await CommentService.findById(req.params.id))
                res.status(404).send({ message: "Comment not found" });
            else
                res.send(await CommentService.update(req.params.id, req.body));
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: Function): Promise<any> {
        try {
            if (!Types.ObjectId.isValid(req.params.id))
                res.status(400).send({ message: "Invalid id" });
            else if (!await CommentService.findById(req.params.id)){
                res.status(404).send({ message: "Comment not found" });
            } else {
                await CommentService.delete(req.params.id);
                res.end();
            }
        } catch (err) {
            next(err);
        }
    }
}