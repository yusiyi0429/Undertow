import { Post } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleString('zh-CN')

  return (
    <Card className="bg-card">
      <CardContent className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">{post.author}</span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-foreground/90">{post.content}</p>
      </CardContent>
    </Card>
  )
}
