import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders hero title and tagline', async () => {
    const page = await HomePage()
    render(page)
    expect(screen.getByText('UNDERTOW')).toBeInTheDocument()
    expect(screen.getByText('暗流涌动 · 金属现场与社区')).toBeInTheDocument()
  })
})
