import { Author } from './author'

export type Post = {
  id: number,
  title: string,
  content?: string,
  author: Author
}
