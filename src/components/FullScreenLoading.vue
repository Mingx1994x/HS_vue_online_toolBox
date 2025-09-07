<script setup>
import LoadingVue from 'vue3-loading-overlay'

const props = defineProps({
  showLoading: {
    type: Boolean,
    required: true,
  },
})
</script>
<template>
  <LoadingVue
    :active="props.showLoading"
    :is-full-page="true"
    color="#d87355"
    loader="spinner"
    :width="64"
    :height="64"
    background-color="#ffffff"
    :opacity="0.5"
    :z-index="999"
  />
</template>
