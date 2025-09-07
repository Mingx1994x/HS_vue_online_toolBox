<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: '',
  },
  actionMode: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['click-function'])

const handleSwitchMode = (mode) => {
  emits('click-function', mode)
}
</script>
<template>
  <button type="button" :class="props.customClass" @click="handleSwitchMode(props.actionMode)">
    {{ props.text }}
  </button>
</template>
