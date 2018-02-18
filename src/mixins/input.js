// Components
import VIcon from '../components/VIcon'
import VProgressLinear from '../components/VProgressLinear'

// Mixins
import Colorable from './colorable'
import Loadable from './loadable'
import Themeable from './themeable'
import Validatable from './validatable'

export default {
  name: 'input',

  components: {
    VIcon,
    VProgressLinear
  },

  mixins: [
    Colorable,
    Loadable,
    Themeable,
    Validatable
  ],

  data () {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    }
  },

  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: () => [13, 32]
    },
    value: {
      required: false
    }
  },

  computed: {
    currentColor () {
      return this.hasError
        ? 'error'
        : this.hasSuccess
          ? 'success'
          : this.isFocused
            ? this.color
            : null
    },
    hasState () {
      return this.hasError || this.hasSuccess || this.isFocused
    },
    inputClasses () {
      return this.addTextColorClassChecks({
        'v-input--is-focused': this.isFocused,
        'v-input--has-state': this.hasState,
        'theme--light': !this.dark,
        'theme--dark': this.dark
      }, this.currentColor)
    },
    isDirty () {
      return !!this.inputValue
    }
  },

  methods: {
    groupFocus (e) {},
    groupBlur (e) {
      this.tabFocused = false
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-input__control'
      }, [
        this.genLabel(),
        this.genInputWrapper(),
        this.genProgress(),
        this.genMessages()
      ])
    },
    genLabel () {
      return this.$createElement('label', {
        staticClass: 'v-input__label',
        'class': [
          this.isFocused || this.isDirty
            ? 'v-input__label--active'
            : ''
        ],
        attrs: {
          for: this.$attrs.id
        }
      }, this.$slots.label || this.label)
    },
    genInputWrapper () {
      return this.$createElement('div', {
        staticClass: 'v-input__wrapper'
      }, [
        this.genInput(),
        !this.appendOuter ? this.genIcon('append') : null
      ])
    },
    genMessages () {
      let messages = null

      if (
        this.hint &&
        (this.isFocused || this.persistentHint) &&
        !this.validations.length
      ) {
        messages = [this.genHint()]
      } else if (this.validations.length) {
        messages = [this.genError(this.validations[0])]
      }

      return this.$createElement('transition', {
        props: {
          name: 'slide-y-transition'
        }
      }, messages)
    },
    genHint () {
      return this.$createElement('div', {
        'class': 'input-group__messages input-group__hint',
        domProps: { innerHTML: this.hint }
      })
    },
    genError (error) {
      return this.$createElement('div', {
        staticClass: 'input-group__messages input-group__error'
      }, error)
    },
    genIcon (type, defaultCallback = null) {
      if (!this.hasIcon(type)) return null

      const shouldClear = type === 'append' && this.clearable && this.isDirty
      const callback = shouldClear
        ? this.clearableCallback
        : (this[`${type}IconCb`] || defaultCallback)

      const icon = this.$createElement('v-icon', {
        props: { disabled: this.disabled },
        on: {
          click: e => {
            if (!callback) return

            e.stopPropagation()
            callback()
          }
        }
      }, shouldClear ? 'clear' : this[`${type}Icon`])

      return this.$createElement('div', {
        staticClass: `v-input__icon v-input__icon--${type}`
      }, [icon])
    },
    hasIcon (icon) {
      return this[`${icon}Icon`] || this.$slots[`${icon}Icon`]
    },
    genInputGroup (input, data = {}, defaultAppendCallback = null) {
      return this.$createElement('div', {
        staticClass: 'v-input',
        'class': this.inputClasses
      }, [
        this.genIcon('prepend'),
        this.genContent(),
        this.appendOuter ? this.genIcon('append') : null
      ])
      // const children = []
      // const wrapperChildren = []
      // const detailsChildren = []

      // data = Object.assign({}, {
      //   'class': this.inputGroupClasses,
      //   attrs: {
      //     tabindex: this.disabled
      //       ? -1
      //       : this.internalTabIndex || this.tabindex
      //   },
      //   on: {
      //     focus: this.groupFocus,
      //     blur: this.groupBlur,
      //     click: () => (this.tabFocused = false),
      //     keyup: e => {
      //       if ([9, 16].includes(e.keyCode)) {
      //         this.tabFocused = true
      //       }
      //     },
      //     keydown: e => {
      //       if (!this.toggle) return

      //       if (this.toggleKeys.includes(e.keyCode)) {
      //         e.preventDefault()
      //         this.toggle()
      //       }
      //     }
      //   }
      // }, data)

      // if (this.$slots.label || this.label) {
      //   children.push(this.genLabel())
      // }

      // wrapperChildren.push(input)

      // if (this.prependIcon) {
      //   wrapperChildren.unshift(this.genIcon('prepend'))
      // }

      // if (this.appendIcon || this.clearable) {
      //   wrapperChildren.push(this.genIcon('append', defaultAppendCallback))
      // }

      // const progress = this.genProgress()
      // progress && detailsChildren.push(progress)

      // children.push(
      //   this.$createElement('div', {
      //     'class': 'input-group__input'
      //   }, wrapperChildren)
      // )

      // !this.hideDetails && detailsChildren.push(this.genMessages())

      // if (this.counter) {
      //   detailsChildren.push(this.genCounter())
      // }

      // children.push(
      //   this.$createElement('div', {
      //     'class': 'input-group__details'
      //   }, detailsChildren)
      // )

      // return this.$createElement('div', data, children)
    }
  }
}
