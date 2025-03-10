export interface AutocompleteOption {
  name: string;
}

export interface Gif {
  id: string;
  url: string;
  username: string;
  source: string;
  create_datetime: string;
  title: string;
  alt_text: string;
  images: GifImage;
  slug: string;
}

export interface GifImage {
  fixed_width: {
    url: string;
    width: string;
    height: string;
    mp4: string;
    webp: string;
  };
  original: {
    width: string;
    height: string;
    mp4: string;
    webp: string;
  };
}

export interface GifPreviewAdapted {
  id: string;
  width: string;
  height: string;
  webp: string;
  alt_text: string;
}

export interface GifDetailsAdapted {
  id: string;
  url: string;
  width: string;
  height: string;
  webp: string;
  alt_text: string;
  username: string;
  title: string;
  create_datetime: string;
  source: string;
  slug: string;
}

export enum CopiedStatus {
  idle = 1,
  success = 2,
  error = 3,
}

export interface PaginationParams {
  limit: number;
  offset: number;
}
