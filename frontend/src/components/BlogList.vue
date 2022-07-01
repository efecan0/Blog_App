<template>
  <div class="item mb-5">
    <div class="media">
      <img
        class="mr-3 img-fluid post-thumb d-none d-md-flex"
        :src="'images/' + formData.img"
        alt="image"
      />
      <div class="media-body">
        <h3 class="title mb-1">
          <a href="blog-post.html">{{ formData.title }}</a>
        </h3>
        <div class="meta mb-1">
          <span class="date">Published 3 months ago</span
          ><span class="time">5 min read</span
          ><span class="comment"><a href="#">4 comments</a></span>
        </div>
        <div class="intro">
          {{ formData.description }}
        </div>
        <a class="more-link" href="blog-post.html">Read more &rarr;</a>
      </div>
      <!--//media-body-->
    </div>
    <!--//media-->
  </div>
</template>

<script>
export default {
  props: ["formData"],
  beforeMount() {
    //console.log(this.formData);
  },
};
</script>