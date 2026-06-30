import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/navbar'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('乐队百科')).toBeInTheDocument()
    expect(screen.getByText('社区动态')).toBeInTheDocument()
  })
})
