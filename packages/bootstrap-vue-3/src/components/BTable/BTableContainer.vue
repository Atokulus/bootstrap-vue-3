<template>
  <div v-if="responsive" :class="responsiveClass">
    <slot />
  </div>
  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts" setup>
import type {ClassValue} from '../../types'

interface BTableContainerProps {
  responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  responsiveClass?: ClassValue
}

withDefaults(defineProps<BTableContainerProps>(), {
  responsive: false,
})
</script>
