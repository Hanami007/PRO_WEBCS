import { Article } from 'src/articles/entities/article.entity';
import { ArticleImage } from 'src/article-images/entities/article-image.entity';
import { File } from 'src/files/entities/file.entity';
import { DataSource } from 'typeorm';
import * as path from 'path';

export async function migrateArticleImages(
  oldDb: DataSource,
  newDb: DataSource,
) {
  console.log('Starting Article Images Migration');

  const oldImages = await oldDb.query('SELECT * FROM information_images');
  const oldInfos = await oldDb.query('SELECT id, title FROM information');

  const newArticleRepo = newDb.getRepository(Article);
  const articleImageRepo = newDb.getRepository(ArticleImage);
  const fileRepo = newDb.getRepository(File);

  const newArticles = await newArticleRepo.find();

  const oldIdToTitleMap = new Map<number, string>();
  oldInfos.forEach((info) => {
    if (info.title) oldIdToTitleMap.set(info.id, info.title.trim());
  });

  const titleToNewEntityMap = new Map<string, Article>();
  newArticles.forEach((art) => {
    if (art.title) titleToNewEntityMap.set(art.title.trim(), art);
  });

  const getNewArticleByOldId = (oldId: number) => {
    if (!oldId) return null;
    const title = oldIdToTitleMap.get(oldId);
    if (!title) return null;
    return titleToNewEntityMap.get(title) || null;
  };

  for (const oldImg of oldImages) {
    const parentArticle = getNewArticleByOldId(oldImg.information_id);

    if (!parentArticle) continue;

    const newFile = await fileRepo.save(
      fileRepo.create({
        path: path.join('files', oldImg.image),
      }),
    );

    const newArticleImage = articleImageRepo.create({
      article: parentArticle,
      file: newFile,
    });

    await articleImageRepo.save(newArticleImage);
  }

  console.log('Article Images Migration Complete');
}
