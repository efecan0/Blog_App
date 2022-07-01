<template>
  <div id="app">
    <div class="main-wrapper">
      <sarp-header></sarp-header>
      <section class="blog-list px-3 py-5 p-md-5">
        <div class="container" v-if="form[0]">
          <blog-list
            v-for="data in form"
            :key="data"
            :formData="data"
          ></blog-list>

          <nav class="blog-nav nav nav-justified my-5">
            <a
              class="nav-link-prev nav-item nav-link rounded-left"
              href="index.html"
              >Previous<i class="arrow-prev fas fa-long-arrow-alt-left"></i
            ></a>
            <a
              class="nav-link-next nav-item nav-link rounded-right"
              href="blog-list.html"
              >Next<i class="arrow-next fas fa-long-arrow-alt-right"></i
            ></a>
          </nav>
        </div>
      </section>

      <footer class="footer text-center py-2 theme-bg-dark">
        <!--/* This template is released under the Creative Commons Attribution 3.0 License. Please keep the attribution link below when using for your own project. Thank you for your support. :) If you'd like to use the template without the attribution, you can buy the commercial license via our website: themes.3rdwavemedia.com */-->
        <small class="copyright"
          >Designed with <i class="fas fa-heart" style="color: #fb866a"></i> by
          <a href="http://themes.3rdwavemedia.com" target="_blank"
            >Xiaoying Riley</a
          >
          for developers</small
        >
      </footer>
    </div>
    <!--//main-wrapper-->

    <!-- *****CONFIGURE STYLE (REMOVE ON YOUR PRODUCTION SITE)****** -->
    <div id="config-panel" class="config-panel d-none d-lg-block">
      <div class="panel-inner">
        <a
          id="config-trigger"
          class="config-trigger config-panel-hide text-center"
          href="#"
          ><i class="fas fa-cog fa-spin mx-auto" data-fa-transform="down-6"></i
        ></a>
        <h5 class="panel-title">Choose Colour</h5>
        <ul id="color-options" class="list-inline mb-0">
          <li class="theme-1 active list-inline-item">
            <a data-style="assets/css/theme-1.css" href="#"></a>
          </li>
          <li class="theme-2 list-inline-item">
            <a data-style="assets/css/theme-2.css" href="#"></a>
          </li>
          <li class="theme-3 list-inline-item">
            <a data-style="assets/css/theme-3.css" href="#"></a>
          </li>
          <li class="theme-4 list-inline-item">
            <a data-style="assets/css/theme-4.css" href="#"></a>
          </li>
          <li class="theme-5 list-inline-item">
            <a data-style="assets/css/theme-5.css" href="#"></a>
          </li>
          <li class="theme-6 list-inline-item">
            <a data-style="assets/css/theme-6.css" href="#"></a>
          </li>
          <li class="theme-7 list-inline-item">
            <a data-style="assets/css/theme-7.css" href="#"></a>
          </li>
          <li class="theme-8 list-inline-item">
            <a data-style="assets/css/theme-8.css" href="#"></a>
          </li>
        </ul>
        <a id="config-close" class="close" href="#"
          ><i class="fa fa-times-circle"></i
        ></a>
      </div>
      <!--//panel-inner-->
    </div>
    <!--//configure-panel-->
  </div>
</template>

<script>
import sarpHeader from "./components/HelloWorld.vue";
import blogList from "./components/BlogList.vue";
import axios from "axios";
export default {
  name: "App",
  components: { sarpHeader, blogList },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
