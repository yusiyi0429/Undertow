import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BandsPage from '@/app/bands/page'

describe('BandsPage', () => {
  it('renders heading and bands', async () => {
    const page = await BandsPage()
    render(page)
    expect(screen.getByText('乐队百科')).toBeInTheDocument()
    expect(screen.getByText('Mayhem')).toBeInTheDocument()
  })
})
