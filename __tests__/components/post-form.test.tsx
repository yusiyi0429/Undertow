import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PostForm } from '@/components/post-form'

describe('PostForm', () => {
  it('calls onSubmit with content', () => {
    const onSubmit = vi.fn()
    render(<PostForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByPlaceholderText('分享你的金属现场…'), {
      target: { value: '现场太炸了' },
    })
    fireEvent.click(screen.getByText('发布'))
    expect(onSubmit).toHaveBeenCalledWith('现场太炸了')
  })
})
