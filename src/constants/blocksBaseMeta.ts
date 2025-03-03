import {
  ChartLine,
  Form,
  HamburgerButton,
  ImageFiles,
  Notes,
  Quote,
  Table,
  TitleLevel,
} from '@icon-park/vue-next'
import type { Icon } from '@icon-park/vue-next/lib/runtime'
import { nanoid } from 'nanoid'

export const blocksBaseMetaList: { type: string; label: string; icon: Icon }[] = [
  // {
  //   type: 'quote',
  //   label: '引述',
  //   icon: Quote,
  // },
  {
    type: 'text',
    label: '笔记',
    icon: Notes,
  },
  {
    type: 'heroTitle',
    label: '超级标题',
    icon: TitleLevel,
  },
  { type: 'image', label: '图片', icon: ImageFiles },
  // {
  //   type: 'view',
  //   label: '视图',
  //   icon: Table,
  // },
  {
    type: 'chart',
    label: '图表',
    icon: ChartLine,
  },
  {
    type: 'button',
    label: '按钮',
    icon: HamburgerButton,
  },
  {
    type: 'form',
    label: '表单',
    icon: Form,
  },
]

export const blocksBaseMeta = Object.fromEntries(
  blocksBaseMetaList.map((item) => [item.type, item]),
)

export const getBlocksDefaultData = (type: string): any => {
  const id = nanoid()
  switch (type) {
    // case 'quote':
    //   return {
    //     id,
    //     type: 'quote',
    //     label: '引述',
    //     props: {
    //       content: '引述文本 quote',
    //       status: 'success',
    //     },
    //   }
    case 'text':
      return {
        id,
        type: 'text',
        label: '笔记',
        props: {
          content: `
          这是一个文本块
        `,
        },
      }
    case 'heroTitle':
      return {
        id,
        type: 'heroTitle',
        label: '标题',
        props: {
          content: '标题',
        },
      }
    case 'image':
      return {
        id,
        type: 'image',
        label: '图片',
        props: {
          url: 'https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&w=1600',
        },
      }
    // case 'view':
    //   return {
    //     id,
    //     type: 'view',
    //     label: '视图',
    //     props: {
    //       fields: {
    //         id: {
    //           type: 'text',
    //         },
    //       },
    //       fieldProps: [],
    //       data: [],
    //     },
    //   }
    case 'chart':
      return {
        id,
        type: 'chart',
        label: '图表',
        props: {
          chartType: 'echarts',
        },
      }
    case 'button':
      return {
        id,
        type: 'button',
        label: '按钮',
        props: {
          content: '按钮',
        },
      }
    case 'form':
      return {
        id,
        type: 'form',
        label: '表单',
        props: {
          fields: [],
        },
      }
  }
}
