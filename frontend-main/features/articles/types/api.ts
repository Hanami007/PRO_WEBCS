import { FileEntity, Entity } from "@/types/api";

export type ArticleImageEntity = {
  id: string;
  file: FileEntity;
};

export type Article = Entity<{
  slug: string;
  title: string;
  content: string;
  published: boolean;
  thumbnail: FileEntity;
  imageUrl: string;
  category: string;
  link: string;
  contentImages: ArticleImageEntity[];
}>;
