import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import type { PaginatedDocs } from 'payload'
import type { Comment } from '@/payload-types'
import { CommentForm } from './CommentForm'

// Add proper TypeScript type for props
interface CommentsProps {
  postId: string
}

export const Comments = async ({ postId }: CommentsProps) => {
  // Fetch comments based on postId
  const payload: Payload = await getPayload({ config: configPromise })
  const comments: PaginatedDocs<Comment> = await payload.find({
    collection: 'comments',
    where: {
      post: {
        equals: postId,
      },
      isApproved: {
        equals: true,
      },
    },
  })
  console.log('comments', comments.docs)

  return (
    <div className="max-w-2xl p-4">
      {/* Comments List */}
      <div className="comments space-y-6">
        {comments.docs.map((comment) => (
          <div
            key={comment.id}
            className="comment p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-gray-800 mb-2">{comment.content}</p>
            <p className="text-sm text-gray-600">By: {comment.author?.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.publishedAt || '').toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <div className="mt-8">
        <CommentForm postId={postId} />
      </div>
    </div>
  )
}
