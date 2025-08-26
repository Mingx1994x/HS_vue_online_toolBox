<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Login | Register</RouterLink> |
      <RouterLink to="/todos-board">TodoList online</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
