import Contextualable from '../../mixins/contextualable'

export default {
  name: 'switch',

  mixins: [Contextualable],

  data () {
    return {
      focused: false,
      inputValue: this.value
    }
  },

  props: {
    dark: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    label: String,
    light: Boolean,
    value: {
      required: false
    },
    valueV: {
      required: false
    }
  },

  computed: {
    classes () {
      return {
        'input-group input-group--selection-controls switch': true
      }
    },
    rippleClasses () {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      }
    },
    containerClasses () {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--dark': this.dark,
        'input-group--selection-controls__container--disabled': this.disabled,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
    },
    toggleClasses () {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      }
    },
    isActive () {
      return (
        (Array.isArray(this.value) &&
          this.value.indexOf(this.valueV) !== -1) ||
        (!Array.isArray(this.value) &&
          this.value)
      )
    }
  },

  methods: {
    toggle () {
      if (this.disabled) {
        return
      }

      let input = this.value
      if (Array.isArray(input)) {
        const i = input.indexOf(this.valueV)

        if (i === -1) {
          input.push(this.valueV)
        } else {
          input.splice(i, 1)
        }
      } else {
        input = !input
      }

      this.$emit('input', input)
    }
  },

  render (h) {
    const ripple = h('div', {
      'class': this.rippleClasses,
      on: { click: this.toggle },
      directives: [
        {
          name: 'ripple',
          value: { center: true }
        }
      ]
    })

    const container = h('div', {
      'class': this.containerClasses
    }, [
      h('div', { 'class': this.toggleClasses }),
      ripple
    ])

    return h('div', {
      'class': this.classes
    }, [
      container,
      h('label', { on: { click: this.toggle }}, this.label)
    ])
  }
}