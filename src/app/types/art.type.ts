export type ArtType = {
  image_id: string;
  title: string;
  artist_title: string;
  is_public_domain: boolean;
  id: number;
  pagination?: number;
  dimensions?: string
  artist_display?: string
  isInFavorite?: boolean;
  place_of_origin?: string;
  credit_line?: string;
  department_title?: string;
}
