import { BaseRepository } from ".";

export type Announcement = {
    id: number;
    title: string;
    content: string;
    author_id: number;
    creation_date: Date;
};

export type AnnouncementInputArgs = {
    id?: number;
    title: string;
    content: string;
    author_id: number;
    creation_date?: Date;
};

export type AnnouncementUpdateArgs = {
    id?: number;
    title?: string;
    content?: string;
    author_id?: number;
    creation_date?: Date;
};

export type IAnnouncementRepository = BaseRepository<Announcement, AnnouncementInputArgs, AnnouncementUpdateArgs> & {

};