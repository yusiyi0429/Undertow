'use client'

import { useEffect, useState } from 'react'
import { PostCard } from '@/components/post-card'
import { PostForm } from '@/components/post-form'
import { PageShell } from '@/components/page-shell'
import { PageHeader } from '@/components/page-header'
import { Post } from '@/lib/data/types'

const STORAGE_KEY = 'metalhead-posts'

const defaultPosts: Post[] = [
  {
    id: 'post-1',
    author: 'Thrasher_99',
    content: '昨晚 Slayer tribute 现场太炸了！有人录了全程吗？',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(defaultPosts)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPosts(JSON.parse(stored))
      }
    } catch {
      // Fallback to defaultPosts
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch {
      // Ignore storage errors
    }
  }, [posts])

  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: `Anonymous_${Math.floor(Math.random() * 1000)}`,
      content,
      createdAt: new Date().toISOString(),
    }
    setPosts((prev) => [newPost, ...prev])
  }

  return (
    <PageShell>
      <PageHeader
        title="社区动态"
        subtitle="分享现场、乐队与金属生活。这里没有门槛，只有失真和共鸣。"
      />
      <div className="space-y-8">
        <PostForm onSubmit={handleAddPost} />

        {posts.length === 0 ? (
          <p className="text-white/50">还没有动态，做第一个发帖的人。</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
}
