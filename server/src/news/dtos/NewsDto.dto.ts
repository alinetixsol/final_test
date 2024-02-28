import mongoose from "mongoose";
export class NewsDto {
    readonly relation_type: string;
    readonly uuid: string;
    readonly ord_in_thread: string;
    readonly author: string;
    readonly published: string;
    readonly title: string;
    readonly text: string;
    readonly language: mongoose.Types.ObjectId;
    readonly crawled: string;
    readonly site_url: mongoose.Types.ObjectId;
    readonly country: mongoose.Types.ObjectId;
    readonly domain_rank: number;
    readonly thread_title: string;
    readonly spam_score: number;
    readonly main_img_url: string;
    readonly replies_count: number;
    readonly participants: number;
    readonly likes: number;
    readonly comments: number;
    readonly shares: number;
    readonly type: string;

}