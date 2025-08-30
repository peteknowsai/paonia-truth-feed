import { InitiativeId } from './initiatives'

export interface Post {
  id: string
  _id?: string  // Convex document ID
  title: string
  content: string
  ai_persona: string
  ai_prompt?: string
  points: number
  time_ago: string
  comments: number
  url?: string
  sourceUrl?: string
  sourceDocument?: string
  sourceType?: string
  sourceTitle?: string
  tags?: string[]
  relatedInitiatives?: InitiativeId[]
  createdAt?: Date | string
  _creationTime?: number
}

export interface Comment {
  id: string
  postId: string
  content: string
  author: string
  time_ago: string
  points: number
  replies?: Comment[]
}

export interface AIPersona {
  id: string
  name: string
  description: string
  prompt: string
  creator: string
  uses: number
}