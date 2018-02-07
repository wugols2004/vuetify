import '../../stylus/components/_bottom-sheets.styl'

import VDialog from '../VDialog/VDialog'

export default {
  functional: true,

  name: 'v-bottom-sheet',

  props: {
    disabled: Boolean,
    fullWidth: Boolean,
    hideOverlay: Boolean,
    inset: Boolean,
    lazy: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'auto'
    },
    persistent: Boolean,
    value: null
  },

  render (h, context) {
    const slots = context.slots()

    const contentClass = 'bottom-sheet' +
      (context.props.inset ? ' bottom-sheet--inset' : '')

    return h(VDialog, {
      ...context.data,
      props: {
        contentClass: contentClass,
        transition: 'bottom-sheet-transition'
      }
    }, slots.activator ? [h('template', { slot: 'activator' }, slots.activator), slots.default] : slots.default)
  }
}
