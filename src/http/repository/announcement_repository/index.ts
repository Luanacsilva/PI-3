import { prisma } from "@/database/prisma";
import { Announcement, AnnouncementInputArgs, AnnouncementUpdateArgs, IAnnouncementRepository } from "@/types/announcement";

export class AnnouncementRepositoryPostgres implements IAnnouncementRepository {
    create = async (data: AnnouncementInputArgs) => {
        const announcement = await prisma.announcement.create({
            data: {
                id: data.id,
                author_id: data.author_id,
                content: data.content,
                creation_date: data.creation_date,
                title: data.title
            }
        });

        return announcement as Announcement;
    };

    getAll = async () => {
        const announcements = await prisma.announcement.findMany();

        return announcements as Announcement[] | null;
    };

    getById = async (id: number) => {
        const announcement = await prisma.announcement.findUnique({
            where: { id }
        });

        return announcement as Announcement | null;
    };

    updateById = async (id: number, data: AnnouncementUpdateArgs) => {
        const announcement = await prisma.announcement.update({
            where: { id },
            data
        });

        return announcement;
    };

    deleteById = async (id: number) => {
        await prisma.announcement.delete({
            where: { id }
        });

        return true;
    };
}