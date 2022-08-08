import mongoose from "mongoose";
import { Request, Response } from "express";

const articles = [{
    id: new mongoose.Types.ObjectId().toString(),
    title: 'Article 1',
    author: 'John Doe',
    body: 'This is the body of article 1'
}]

export default class CommentController {
    static fetch(req: Request, res: Response, next: Function) {
        try {
            res.send(articles);
        } catch (err) {
            next(err);
        }
    }

    static find(req: Request, res: Response, next: Function) {
        try {
            const article = articles.find(article => article.id === req.params.id);
            res.send(article);
        } catch (err) {
            next(err);
        }
    }

    static create(req: Request, res: Response, next: Function) {
        try {
            const article = { ...req.body.article, id: new mongoose.Types.ObjectId().toString() };
            articles.push(article);
            res.send(article);
        }
        catch (err) {
            next(err);
        }
    }

    static update(req: Request, res: Response, next: Function) {
        try {
            const article = articles.find(article => article.id === req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }
            const updatedArticle = { ...article, ...req.body.article };
            articles[articles.indexOf(article)] = updatedArticle;
            res.send(updatedArticle);
        } catch (err) {
            next(err);
        }
    }

    static remove(req: Request, res: Response, next: Function) {
        try {
            const article = articles.find(article => article.id === req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }
            articles.splice(articles.indexOf(article), 1);
            res.end();
        } catch (err) {
            next(err);
        }
    }
}