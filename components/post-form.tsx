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
      className="flex flex-col gap-3 rounded-xl border border-[#330a0a] bg-[#0a0000] p-4 ring-1 ring-[#1a0505] sm:flex-row sm:items-center sm:p-5"
    >
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="分享你的金属现场…"
        className="flex-1 border-[#1a0505] bg-[#050000] text-white placeholder:text-white/40 focus-visible:border-[#ff1a1a] focus-visible:ring-[#ff1a1a]/30"
      />
      <Button
        type="submit"
        className="bg-[#ff1a1a] font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#ff1a1a]/20 transition-all hover:bg-[#ff1a1a]/90 hover:shadow-[#ff1a1a]/40"
      >
        发布
      </Button>
    </form>
  )
}
