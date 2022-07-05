<template>
  <div class="container" v-if="form[0]">
    <blog-list v-for="data in form" :key="data" :formData="data"></blog-list>

    <nav class="blog-nav nav nav-justified my-5">
      <a class="nav-link-prev nav-item nav-link rounded-left" href="index.html"
        >Previous<i class="arrow-prev fas fa-long-arrow-alt-left"></i
      ></a>
      <a
        class="nav-link-next nav-item nav-link rounded-right"
        href="blog-list.html"
        >Next<i class="arrow-next fas fa-long-arrow-alt-right"></i
      ></a>
    </nav>
  </div>
</template>

<script>
import blogList from "./BlogList.vue";
import axios from "axios";
export default {
  name: "App",
  components: { blogList },
  data() {
    return {
      form: [],
    };
  },
  beforeMount() {
    axios.get("http://localhost:3000/blog").then((data) => {
      this.form = data.data;
      console.log(this.form);
    });
  },
};
</script>