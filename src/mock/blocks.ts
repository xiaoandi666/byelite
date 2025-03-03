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
      src: 'https://img.yzcdn.cn/vant/cat.jpeg',
    },
    actions: {
      onEdit: () => {},
    },
  },
]
