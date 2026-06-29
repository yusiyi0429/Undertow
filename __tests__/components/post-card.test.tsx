import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard } from '@/components/post-card'
import { Post } from '@/lib/data/types'

describe('PostCard', () => {
  it('renders post content', () => {
    const post: Post = {
      id: '1',
      author: 'Thrasher',
      content: '现场太炸了！',
      createdAt: '2025-08-12T10:00:00Z',
    }
    render(<PostCard post={post} />)
    expect(screen.getByText('Thrasher')).toBeInTheDocument()
    expect(screen.getByText('现场太炸了！')).toBeInTheDocument()
  })
})
