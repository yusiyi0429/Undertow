import { Post } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleString('zh-CN')

  return (
    <Card className="relative overflow-hidden border-l-0 bg-[#050000] ring-1 ring-[#1a0505] transition-all duration-300 hover:ring-[#330a0a]">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#ff1a1a] to-transparent" />
      <CardContent className="space-y-2 p-5 pl-6">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-nosifer)] text-sm text-[#ff1a1a]">
            {post.author}
          </span>
          <span className="text-xs text-white/40">{date}</span>
        </div>
        <p className="leading-relaxed text-white/85">{post.content}</p>
      </CardContent>
    </Card>
  )
}
