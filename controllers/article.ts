import { Request, Response } from "express";
import { Types } from 'mongoose';
import { ArticleService, CommentService } from "../services";

export default class ArticleController {
    static async fetch(req: Request, res: Response, next: Function) {
        try {
            res.send(await ArticleService.fetch());
        }
        catch (err) {
            next(err);
        }
    }

    static async find(req: Request, res: Response, next: Function) {
        try {
            const article = await ArticleService.find(req.params.id);
            res.send(article);
        }
        catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: Function) {
        try {
            const article = await ArticleService.create(req.body);
            res.send(article);
        }
        catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: Function) {
        try {
            const updatedArticle = await ArticleService.update(req.params.id, req.body);
            res.send(updatedArticle);
        }
        catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: Function) {
        try {
            await ArticleService.delete(req.params.id);
            res.end();
        }
        catch (err) {
            next(err);
        }
    }
}