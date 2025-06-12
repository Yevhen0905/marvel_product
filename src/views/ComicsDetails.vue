<template>
  <div class="main">
    <div class="container details_container">
      <div class="details_content" v-for="com in comic" :key="com.key">
        <div class="details_box">
          <img
            class="details_img"
            :src="com.thumbnail.path + '.' + com.thumbnail.extension"
            alt=""
          />
        </div>
        <div class="details_info">
          <h3 class="details_text">{{ com.title }}</h3>
          <h4 class="details_description">
            Price: {{ com.prices[0].price + "$" }}
          </h4>
          <div class="details_description">
            <p>{{ com.description }}</p>
          </div>
          <div class="details_link">
            <div class="details_btn" v-for="url in com.urls" :key="url.key">
              <a class="pa-2" :href="url.url" target="_blank">
                <button class="content_btn" color="red" text>
                  {{ url.type }}
                </button>
              </a>
            </div>
          </div>
          <div class="details_item_block">
            <div class="details_item">
              <h3 class="details_item_title">Series</h3>
              <p class="details_item_text">{{ com.series.name }}</p>
            </div>
            <div class="details_item">
              <h3 class="details_item_title">Creators</h3>
              <p
                class="details_item_text"
                v-for="item in com.creators.items"
                :key="item.key"
              >
                {{ item.name + " - " + item.role }}
              </p>
            </div>
            <div class="details_item">
              <h3 class="details_item_title">Stories</h3>
              <p
                class="details_item_text"
                v-for="item in com.stories.items"
                :key="item.key"
              >
                {{ item.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMarvelDataById } from "@/utils/useMarvelApi";

export default {
  name: "ComicsDetails",
  data() {
    return {
      comic: {},
    };
  },
  mounted() {
    this.getComic();
  },
  methods: {
    async getComic() {
      const ComicId = this.$route.params.id;

      try {
        const data = await fetchMarvelDataById("COMIC", {
          id: ComicId,
        });
        this.comic = data;
      } catch (err) {
        console.log("Marvel API Error");
      }
    },
  },
};
</script>

<style lang="scss"></style>
