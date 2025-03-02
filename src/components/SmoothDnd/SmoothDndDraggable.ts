// Vue 组件
import { constants } from 'smooth-dnd'
import { defineComponent, h } from 'vue'

import { getTagProps, validateTagProp } from './utils'

export const SmoothDndDraggable = defineComponent({
  name: 'SmoothDndDraggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div', // 默认 div
    },
  },

  render() {
    const tagProps = getTagProps(this, constants.wrapperClass)
    return h(tagProps.value, Object.assign({}, tagProps.props), this.$slots.default?.())
  },
})
