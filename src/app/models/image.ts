export interface Image {
  _id: string,
  url: string,
  author: string,
  likes: number,
  liked: boolean,
  description?: string
}
