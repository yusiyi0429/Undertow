import { Post } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleString('zh-CN')

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary bg-[#0a0a0a] ring-1 ring-white/5 transition-all duration-300 hover:border-primary/80 hover:bg-[#111111] hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/20">
      <CardContent className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-bebas-neue)] text-sm uppercase tracking-wider text-primary">
            {post.author}
          </span>
          <span className="text-xs text-white/40">{date}</span>
        </div>
        <p className="leading-relaxed text-white/85">{post.content}</p>
      </CardContent>
    </Card>
  )
}
