import * as path from 'path';
import { Article } from 'src/articles/entities/article.entity';
import { File } from 'src/files/entities/file.entity';

import { DataSource } from 'typeorm';

export async function migrateAricle(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting Article Migration');
  const oldInformations = await oldDb.query('SELECT * FROM information');
  const newArticleRepo = newDb.getRepository(Article);

  const fileRepo = newDb.getRepository(File);

  for (const oldArticle of oldInformations) {
    const newFile = fileRepo.create({
      path: path.join('files', 'news', 'posters', oldArticle.poster),
    });

    await fileRepo.save(newFile);

    const newArticle = newArticleRepo.create({
      title: oldArticle.title,
      content: oldArticle.detail,
      published: oldArticle.is_show,
      category: oldArticle.type,
      thumbnail: newFile,
      link: oldArticle.link,
      createdAt: oldArticle.created_at,
    });
    await newArticleRepo.save(newArticle);
  }
  console.log('Article Migration Complete');
}
