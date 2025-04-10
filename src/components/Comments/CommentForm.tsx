'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'

const CommentForm = ({ postId }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      alert('Comment submitted successfully')
    } else {
      alert('Error submitting comment')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  )
}

export { CommentForm }
