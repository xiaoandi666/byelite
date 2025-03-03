export type BaseBlock = {
  id: string
  type: string
}

export type TextBlock = BaseBlock & {
  type: 'text'
  props: {
    content: string
  }
  actions?: {
    onCopy: () => void
    onEdit: () => void
  }
}

export type ChartBlock = BaseBlock & {
  type: 'chart'
  props: {
    chartType: 'echarts' | 'canvas' | 'svg'
  }
  actions: {
    onFilter: () => void
    onSwitch: () => void
  }
}

export type ImageBlock = BaseBlock & {
  type: 'image'
  props: {
    src: string
    alt?: string
  }
  actions: {
    onEdit: () => void
  }
}

export type HeroTitleBlock = BaseBlock & {
  type: 'heroTitle'
  props: {
    content: string
  }
}

export type ViewBlock = BaseBlock & {
  type: 'view'
  props: {
    fields: Record<
      string,
      {
        type: string
      }
    >
    fieldProps: {
      width: number
      visible: boolean
    }[]
    data: { id: string; value: string }[]
  }
}

export type QuoteBlock = BaseBlock & {
  type: 'quote'
  props: {
    content: string
    status: 'success' | 'warning' | 'error'
  }
}

export type ButtonBlock = BaseBlock & {
  type: 'button'
  props: {
    content: string
  }
  actions?: {
    onClick: () => void
  }
}

export type FormBlock = BaseBlock & {
  type: 'form'
  props: {
    fields: {
      type: string
      label: string
      placeholder?: string
      required?: boolean
    }[]
  }
}

export type NotesBlock = BaseBlock & {
  type: 'notes'
  props: {
    content: string
  }
}

export type Block =
  | TextBlock
  | ChartBlock
  | ImageBlock
  | HeroTitleBlock
  | ViewBlock
  | QuoteBlock
  | ButtonBlock
  | FormBlock
  | NotesBlock
