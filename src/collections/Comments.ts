import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
      validate: (value: any) => {
        if (!value || typeof value !== 'string') return 'Content is required'
        if (value.length < 10) return 'Content must be at least 10 characters long'
        return true
      },
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.isApproved && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
}
