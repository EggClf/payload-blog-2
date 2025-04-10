'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'

// Define the props type
interface CommentFormProps {
  postId: string
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          author: { name, email },
          content,
          post: postId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setName('')
        setEmail('')
        setContent('')
        setStatus('success')
        setMessage('Comment submitted successfully')

        // Automatically clear success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        const errorData = await response.json().catch(() => null)
        setStatus('error')
        setMessage(errorData?.message || 'Comment too short')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to submit comment. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'success' && (
        <div className="bg-green-50 text-green-800 p-3 rounded-md border border-green-200">
          {message}
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md border border-red-200">{message}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="block">
          Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="block">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment" className="block">
          Comment
        </Label>
        <Textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[100px]"
          required
        />
      </div>

      <Button type="submit" className="mt-4" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}

export { CommentForm }
