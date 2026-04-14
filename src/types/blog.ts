export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  content: string;
  category: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
  };
}
