import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders event calendar heading and events', async () => {
    const page = await HomePage()
    render(page)
    expect(screen.getByText('近期演出')).toBeInTheDocument()
    expect(screen.getByText('Cradle of Filth')).toBeInTheDocument()
  })
})
