<template>
  <div class="nav-header" @click="handlFoldClick">
    <el-icon :size="30" v-show="!isFold">
      <d-arrow-left />
    </el-icon>
    <el-icon :size="30" v-show="isFold">
      <d-arrow-right />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DArrowRight, DArrowLeft } from '@element-plus/icons'

export default defineComponent({
  components: {
    DArrowRight,
    DArrowLeft
  },
  emits: ['flodChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handlFoldClick = () => {
      isFold.value = !isFold.value
      emit('flodChange', isFold.value)
    }

    return {
      isFold,
      handlFoldClick
    }
  }
})
</script>

<style scoped lang="scss">
.nav-header {
  .fold-menu {
    cursor: pointer;
  }
}
</style>
