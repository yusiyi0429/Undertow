import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommunityPage from '@/app/community/page'

describe('CommunityPage', () => {
  it('renders heading and default post', () => {
    render(<CommunityPage />)
    expect(screen.getByText('社区动态')).toBeInTheDocument()
    expect(screen.getByText('Thrasher_99')).toBeInTheDocument()
  })
})
