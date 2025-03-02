export type PlatelistItem = {
  id: number;
  recipe: {
    id: number;
    title: string;
    description: string;
    chef: {
      username: string;
      pfp_url: string | null;
    };
    origin_country: string;
    created_at: string;
    images: {
      id: number;
      image_url: string;
    }[];
    likes: number;
    shares: number;
    comments: number;
    isPlateListed: boolean;
    isLiked: boolean;
    isShared: boolean;
  };
};

