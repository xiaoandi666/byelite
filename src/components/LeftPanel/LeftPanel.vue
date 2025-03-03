<script setup lang="ts">
import { Lightning, Share } from '@icon-park/vue-next'
import { ref } from 'vue'
import { SmoothDndContainer } from '../SmoothDnd/SmoothDndContainer'
import { SmoothDndDraggable } from '../SmoothDnd/SmoothDndDraggable'
import OutlineDrawer from './OutlineDrawer.vue'
import BlocksDrawer from './BlocksDrawer.vue'
type Mode = 'outline' | 'blocks' | null
const mode = ref<Mode>(null)
const toggleMode = (newMode: Mode) => {
  if (newMode === mode.value) {
    mode.value = null
  } else {
    mode.value = newMode
  }
}
</script>

<template>
  <div class="left-panel-wrapper">
    <div class="left-panel-left">
      <div class="btn" :class="{ active: mode === 'outline' }" @click="() => toggleMode('outline')">
        <Lightning />
      </div>
      <div class="btn" :class="{ active: mode === 'blocks' }" @click="() => toggleMode('blocks')">
        <Share />
      </div>
    </div>
    <Transition name="app-left-panel-drawer">
      <div v-if="mode" class="app-left-panel-drawer">
        <div class="app-left-panel-drawer-content">
          <component v-if="mode" :is="mode === 'outline' ? OutlineDrawer : BlocksDrawer" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.left-panel-wrapper {
  display: flex;

  height: 100%;
  background-color: #f5f5f5;
  border-right: 1px solid #e8e8e8;
}
.left-panel-left {
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 100%;
  background-color: #e8e8e8;
  align-items: center;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 15px;
  margin: 0 10px;
  margin-top: 10px;
  &:hover {
    background-color: #f5f5f5;
  }
}
.btn.active {
  background: rgb(0, 196, 83);
  color: #fff;
}
.left-panel-content {
  flex: 1;
  height: 100%;
  background-color: #f5f5f5;
  width: 280px;
  overflow: hidden;
}
.app-left-panel-drawer-enter-active,
.app-left-panel-drawer-leave-active {
  transition: width 0.1s cubic-bezier(0.3, 0.1, 0.3, 1);
}

.app-left-panel-drawer-enter-from,
.app-left-panel-drawer-leave-to {
  width: 0;
}

.app-left-panel-drawer-content {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  padding: 16px;
}
.block-group {
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.block-item {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  user-select: none;
  transition: background-color 0.3s;
}
</style>
