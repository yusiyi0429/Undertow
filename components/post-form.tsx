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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0a0a0a] p-4 ring-1 ring-white/5 sm:flex-row sm:items-center sm:p-5"
    >
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="分享你的金属现场…"
        className="flex-1 border-white/10 bg-black text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-primary/30"
      />
      <Button
        type="submit"
        className="bg-primary font-semibold text-black shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40"
      >
        发布
      </Button>
    </form>
  )
}
