<template>
  <v-text-field
    :type="type"
    v-model="maskedValue"
    :label="label"
    autocomplete="off"
    :maxlength="maxlength"
    :disabled="disabled"
    :rules="unmaskedrules"
    :placeholder="placeholder"
    :hint="hint"
    :persistent-hint="persistentHint"
    :loading="loading"
    :error-messages="errorMessages"
    :outline="outline"
    :autofocus="autofocus"
    light
    color="#551118"
    ref="tf"
  />
</template>

<script>
import { createMask } from 'imask'

export default {
  props: ['mask', 'type', 'value', 'label', 'maxlength', 'disabled', 'rules', 'errorMessages', 'hint', 'persistentHint', 'loading', 'outline', 'placeholder', 'autofocus'],
  computed: {
    valid () {
      return this.$refs.tf && this.$refs.tf.valid
    },
    maskedValue: {
      get () {
        const imask = createMask({ mask: this.mask })
        return imask.resolve(this.value || '')
      },
      set (v) {
        const imask = createMask({ mask: this.mask })
        imask.resolve(v || '')
        this.$emit('input', imask.unmaskedValue)
      }
    },
    unmaskedrules () {
      const rules = Array.isArray(this.rules) ? this.rules : this.rules instanceof Function ? [this.rules] : undefined
      if (rules) {
        return rules.map(r => this.unmasker(r))
      } else {
        return rules
      }
    }
  },
  methods: {
    validate () {
      return this.$refs.tf.validate()
    },
    focus () {
      return this.$refs.tf.focus()
    },
    reset () {
      return this.$refs.tf.reset()
    },
    unmasker (f) {
      return v => {
        const imask = createMask({ mask: this.mask })
        imask.resolve(v || '')
        return f(imask.unmaskedValue)
      }
    }
  }
}
</script>
<style scoped>
.v-text-field{
      width: 201px;
}
</style>
