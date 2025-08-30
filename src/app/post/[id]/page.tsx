import { Metadata } from 'next'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import PostPageContent from './page-content'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  
  try {
    const post = await fetchQuery(api.posts.get, { 
      id: resolvedParams.id as Id<"posts"> 
    })
    
    if (!post) {
      return {
        title: 'Post Not Found - Paonia Truth Feed',
      }
    }

    const description = post.content.length > 160 
      ? post.content.substring(0, 157) + '...' 
      : post.content

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    return {
      title: `${post.title} - Paonia Truth Feed`,
      description: description,
      openGraph: {
        title: post.title,
        description: description,
        url: `${baseUrl}/post/${resolvedParams.id}`,
        siteName: 'Paonia Truth Feed',
        type: 'article',
        locale: 'en_US',
        publishedTime: post._creationTime ? new Date(post._creationTime).toISOString() : undefined,
        authors: ['Paonia Truth Feed AI'],
        images: [
          {
            url: '/og-image.svg',
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: description,
        images: ['/og-image.svg'],
      },
    }
  } catch (error) {
    return {
      title: 'Paonia Truth Feed',
      description: 'AI-Generated Government Analysis',
    }
  }
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params
  return <PostPageContent id={resolvedParams.id} />
}