import { Request, Response } from "express";
import { Types } from "mongoose";
import { ArticleService, CommentService } from "../services";

export default class ArticleController {
    static async fetch(_req: Request, res: Response, next: Function) {
        try {
            res.send(await ArticleService.fetch());
        }
        catch (err) {
            next(err);
        }
    }

    static async findById(req: Request, res: Response, next: Function) {
        try {
            if (!Types.ObjectId.isValid(req.params.id))
                return res.status(400).send({ message: "Invalid id" });

            const article = await ArticleService.findById(req.params.id);

            if (!article)
                return res.status(404).send({ message: "Article not found" });

            return res.send(article);
        }
        catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: Function) {
        try {
            return res.send(await ArticleService.create(req.body));
        }
        catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: Function) {
        try {
            if (!Types.ObjectId.isValid(req.params.id))
                return res.status(400).send({ message: "Invalid id" });

            if (!await ArticleService.findById(req.params.id))
                return res.status(404).send({ message: "Article not found" });

            return res.send(await ArticleService.update(req.params.id, req.body));
        }
        catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: Function) {
        try {
            if (!Types.ObjectId.isValid(req.params.id))
                return res.status(400).send({ message: "Invalid id" });

            if (!await ArticleService.findById(req.params.id))
                return res.status(404).send({ message: "Article not found" });

            await ArticleService.delete(req.params.id);
            return res.end();
        }
        catch (err) {
            next(err);
        }
    }
}