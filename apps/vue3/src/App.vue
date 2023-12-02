<template>
  <div>
    <p>vue3 快速demo搭建模板</p>
  </div>
</template>

<script setup>
  import { Message } from '@common/common';
  import { onMounted } from 'vue';
  onMounted(() => {
    const message = new Message('vue3 demo template running!');
    message.print();
  });
</script>

<style scoped>
  div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: 40px;
  }
</style>
