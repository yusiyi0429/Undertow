export interface Event {
  id: string
  bandName: string
  date: string
  venue: string
  city: string
  genre: string
  imageUrl?: string
}

export interface Band {
  id: string
  name: string
  genre: string
  formedYear: number
  country: string
  description: string
  imageUrl?: string
}

export interface Post {
  id: string
  author: string
  content: string
  createdAt: string
}
