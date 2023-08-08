import { Category } from "src/app/features/category/models/category.model";

export interface Blogpost {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    publishedDate: Date;
    author: string;
    isVisible: boolean;
    categories: Category[];
}