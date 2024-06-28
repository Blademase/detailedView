<template>
  <div class="wholePage" v-if="!loading">
    <div class="back">
      <button @click="goBack">
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.610352 10.0068C0.615885 9.81315 0.654622 9.63607 0.726562 9.47559C0.798503 9.3151 0.90918 9.16016 1.05859 9.01074L9.37598 0.958984C9.61393 0.721029 9.90723 0.602051 10.2559 0.602051C10.4883 0.602051 10.6986 0.657389 10.8867 0.768066C11.0804 0.878743 11.2326 1.02816 11.3433 1.21631C11.4595 1.40446 11.5176 1.61475 11.5176 1.84717C11.5176 2.19027 11.3875 2.49186 11.1274 2.75195L3.60693 9.99854L11.1274 17.2534C11.3875 17.519 11.5176 17.8206 11.5176 18.1582C11.5176 18.3962 11.4595 18.6092 11.3433 18.7974C11.2326 18.9855 11.0804 19.1349 10.8867 19.2456C10.6986 19.3618 10.4883 19.4199 10.2559 19.4199C9.90723 19.4199 9.61393 19.2982 9.37598 19.0547L1.05859 11.0029C0.903646 10.8535 0.790202 10.6986 0.718262 10.5381C0.646322 10.3721 0.610352 10.195 0.610352 10.0068Z" fill="#007AFF"/>
        </svg>
        Назад
      </button>
    </div>
    <div class="detailedProduct" v-if="post">
    <img :src='post.image' alt="product image">
    <span class="detailedProductDate" v-if="post.date">{{ post.date }}</span>
    <span class="detailedProductTitle" v-if="post.title">{{ post.title }}</span>
    <span  v-if="post.text" v-html="formattedText"></span>
    <span class="detailedProductDescription" v-if="post.text">{{ post.text }}</span>
    <div v-if="post.sections" v-for="(section, index) in post.sections" :key="index">
      <span class="sectionTitle">{{ section.title }}</span>
      <br>
      <span class="sectionText">{{ section.text}}</span>
    </div>
  </div>
  
  </div>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const currentUrl = ref('');
const extractedId = ref('');
const post = ref({});
const loading = ref(true);
const error = ref(null);

const imgURL = "http://157.230.120.99:81/api/v1/profiles/posts";

onMounted(() => {
  currentUrl.value = window.location.href;
  console.log(currentUrl.value);
});

const fetchPost = async () => {
  loading.value = true; // Убедитесь, что `loading` устанавливается в `true` перед запросом
  try {
    const response = await axios.get(`${imgURL}${extractedId.value}`);
    post.value = response.data;
    console.log("Ответ от сервера:", response.data);
  } catch (err) {
    error.value = err.message || 'Ошибка при загрузке данных';
    console.error("Ошибка при запросе данных:", err);
  } finally {
    loading.value = false;
  }
};

watch(currentUrl, (newUrl) => {
  console.log('URL изменился:', newUrl);
  extractedId.value = '/' + newUrl.split('/').pop();
  console.log(extractedId.value); 

  // Fetch the post only after extractedId is updated
  fetchPost();
});


</script>

<style src="./app.css"></style>
