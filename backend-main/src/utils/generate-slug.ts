export class SlugUtils {
  static generate(title: string, withTimestamp = false): string {
    if (!title) return '';

    let slug = title
      .toString()
      .toLowerCase()
      .replace(/\./g, ' ')
      .trim()
      .replace(/[^a-z0-9 \u0E00-\u0E7F-]/g, '')
      .replace(/[ ]+/g, '-')
      .replace(/-+/g, '-');

    if (withTimestamp) {
      const timestamp = Date.now();
      slug = `${slug}-${timestamp}`;
    }

    return slug;
  }
}
