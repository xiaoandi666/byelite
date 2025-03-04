import type { Block } from '@/types/block'

export const blocks: Block[] = [
  {
    id: '1',
    type: 'text',
    props: {
      content: '这是一个文本块',
    },
    actions: {
      onCopy: () => {},
      onEdit: () => {},
    },
  },

  {
    id: '3',
    type: 'image',
    props: {
      src: 'https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    actions: {
      onEdit: () => {},
    },
  },
  {
    id: '123',
    type: 'form',
    props: {
      fields: [
        {
          label: 'Name',
          id: '1',
          type: 'input',
        },
        {
          label: 'Email',
          id: '2',
          type: 'input',
        },
      ],
    },
  },
]
