import { Gif, GifDetailsAdapted, GifPreviewAdapted } from '../models/gif.model';

export class GifAdapter {
  private gif: Gif | null = null;

  constructor(gif: Gif) {
    this.gif = gif;
  }

  public getPreviewData(): GifPreviewAdapted {
    const { width, height, webp } = this.gif!.images.fixed_width;
    return {
      id: this.gif!.id,
      width,
      height,
      webp,
      alt_text: this.gif?.alt_text || this.gif?.title || 'gif',
    };
  }

  public getDetails(): GifDetailsAdapted {
    const { id, url, username, source, create_datetime, title, alt_text, slug } = this.gif!;

    const { width, height, webp } = this.gif!.images.original;
    return {
      id,
      url,
      username: username || 'Unknown creator',
      source: source || 'Unknown source',
      create_datetime: create_datetime || 'Unknown date',
      title: title || 'Unknown title',
      alt_text,
      width,
      height,
      webp,
      slug,
    };
  }
}
