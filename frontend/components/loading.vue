<template>
  <div>
    <v-layout :justify-center="center">
      <v-progress-circular indeterminate :size="size || 50" color="secondary" />
    </v-layout>
    <p class="mt-2 text-xs-center">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'center', 'size']
}
</script>
