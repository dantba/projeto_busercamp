<template>
  <div>
    <v-text-field
      :autofocus="autofocus"
      :full-width="fullWidth"
      :label="label"
      :placeholder="'0,00'"
      :prefix="prefix"
      :rules="concatRules"
      :disabled="disabled"
      :suffix="suffix"
      v-model="maskedValue"
      @keypress="isNumber($event)"
      ref="field"
    />
  </div>
</template>

<script>
import rules from '~/helpers/rules'
import forms from '~/helpers/forms'

export default {
  props: {
    autofocus: Boolean,
    color: {
      type: String,
      default: 'secondary'
    },
    fullWidth: Boolean,
    disabled: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    label: String,
    prefix: {
      type: String,
      default: 'R$ '
    },
    // eslint-disable-next-line vue/require-default-prop
    suffix: String,
    box: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    value: [Number, String],
    rules: {
      type: [Array, Function],
      default: () => []
    }
  },
  computed: {
    concatRules () {
      return [rules.money].concat(this.rules)
    },
    maskedValue: {
      get () {
        let value = this.value
        if (!value || isNaN(value)) {
          value = 0
        }
        const values = Number(value).toFixed(2).split('.')
        return [values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'), values[1]].filter(Boolean).join()
      },
      set (value) {
        this.$emit('input', forms.moedaToFloat(value))
      }
    }
  },
  methods: {
    isNumber (evt) {
      evt = evt || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if (charCode >= 48 && charCode <= 57) {
        return true
      } else {
        evt.preventDefault()
      }
    },
    cursorPosition () {
      if (this.$refs.field && this.$refs.field.$refs && this.$refs.field.$refs.input) {
        return this.$refs.field.$refs.input.selectionStart
      }
      return 'null'
    }
  }
}
</script>
