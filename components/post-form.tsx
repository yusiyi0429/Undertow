'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PostFormProps {
  onSubmit: (content: string) => void
}

export function PostForm({ onSubmit }: PostFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onSubmit(content.trim())
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="分享你的金属现场…"
        className="flex-1 border-border bg-card text-foreground placeholder:text-muted-foreground"
      />
      <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
        发布
      </Button>
    </form>
  )
}
