<template>
  <div class="main">
    <div class="container details_container">
      <div class="details_content" v-for="char in character" :key="char.key">
        <div class="details_box">
          <img
            class="details_img"
            :src="char.thumbnail.path + '.' + char.thumbnail.extension"
            alt=""
          />
        </div>
        <div class="details_info">
          <h3 class="details_text">{{ char.name }}</h3>
          <div class="details_description" v-if="char.description">
            <p>{{ char.description }}</p>
          </div>
          <div class="details_description" v-else>
            <p>Character Description not Available.</p>
          </div>
          <div class="details_link">
            <div class="details_btn" v-for="item in char.urls" :key="item.key">
              <a :href="item.url" target="_blank">
                <button class="content_btn">{{ item.type }}</button>
              </a>
            </div>
          </div>
          <div class="details_item_block">
            <div class="details_item">
              <h3 class="details_item_title">Series</h3>
              <p
                class="details_item_text"
                v-for="item in char.series.items"
                :key="item.key"
              >
                {{ item.name }}
              </p>
            </div>
            <div class="details_item">
              <h3 class="details_item_title">Comics</h3>
              <p
                class="details_item_text"
                v-for="item in char.comics.items"
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
  name: "CharacterDetails",
  data() {
    return {
      character: {},
    };
  },
  mounted() {
    this.getCharacter();
  },
  methods: {
    async getCharacter() {
      const CharacterId = this.$route.params.id;

      try {
        const data = await fetchMarvelDataById("CHARACTER", {
          id: CharacterId,
        });
        this.character = data;
      } catch (err) {
        console.log("Marvel API Error");
      }
    },
  },
};
</script>

<style lang="scss"></style>
