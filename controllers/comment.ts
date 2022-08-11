import { Request, Response } from "express";
import { CommentService } from "../services";

export default class CommentController {
    static async findById(req: Request, res: Response, next: Function): Promise<any> {
        try {
            const article = await CommentService.findById(req.params.id);
            res.send(article);
        } catch (err) {
            next(err);
        }
    }

    static async fetch(req: Request, res: Response, next: Function): Promise<any> {
        try {
            res.send(await CommentService.findByArticleId(req.query.articleId as string));
        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: Function): Promise<any> {
        try {
            const article = await CommentService.create(req.body);
            res.send(article);
        }
        catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: Function): Promise<any> {
        try {
            const article = await CommentService.update(req.params.id, req.body);
            res.send(article);
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: Function): Promise<any> {
        try {
            await CommentService.delete(req.params.id);
            res.end();
        } catch (err) {
            next(err);
        }
    }
}