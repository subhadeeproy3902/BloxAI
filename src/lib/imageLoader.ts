interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export const imageLoader = ({ src, width, quality = 75 }: ImageLoaderParams): string => 
  `${src}?w=${width}&q=${quality}`;
