import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GenreFilter } from '@/components/genre-filter'

describe('GenreFilter', () => {
  it('renders genres and calls onChange', () => {
    const onChange = vi.fn()
    render(
      <GenreFilter
        genres={['全部', '黑金属', '死金', '力量金属']}
        selected="全部"
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByText('黑金属'))
    expect(onChange).toHaveBeenCalledWith('黑金属')
  })
})
