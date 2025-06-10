<template>
  <div class="main">
    <div class="container">
      <div class="block_search">
        <div class="block_search_item">
          <input
            v-model="searchComic"
            type="text"
            class="input_search"
            placeholder="Enter comics..."
          />
          <div class="block_btn_search">
            <button
              class="btn_search"
              @click="searchComics(searchComic)"
              type="button"
              name="Search"
            >
              SEARCH
            </button>
            <button
              class="btn_search"
              v-if="searchResults.results"
              @click="$router.go(0)"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <h2 class="title">COMICS</h2>
      <div v-if="!comics.results" class="loader_block">
        <v-progress-circular class="loader" :size="50" :width="5" indeterminate>
        </v-progress-circular>
      </div>
      <div v-else class="wrapper_result">
        <SearchResultsComics
          v-if="searchResults.results"
          :search-results="searchResults"
          @search-comics="searchComics"
        />
        <AllResultsComics v-else :comics="comics" @get-comics="getComics" />
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script>
import { fetchMarvelData } from "@/utils/useMarvelApi";
import BackTop from "../components/BackTop.vue";
import AllResultsComics from "@/components/AllResultsComics.vue";
import SearchResultsComics from "@/components/SearchResultsComics.vue";

export default {
  name: "Comics",
  components: {
    BackTop,
    AllResultsComics,
    SearchResultsComics,
  },
  data() {
    return {
      searchComic: "",
      comics: [],
      searchResults: [],
      limit: 20,
    };
  },
  mounted() {
    this.getComics();
  },
  methods: {
    async getComics(page = 1) {
      const offset = this.limit * (page - 1);

      try {
        const data = await fetchMarvelData("Comic", { offset });
        this.scrollToTop();
        this.comics = data;
      } catch (err) {
        console.log("Marvel API Error");
      }
    },

    async searchComics(page = 1) {
      const offset = this.limit * (page - 1);

      try {
        const data = await fetchMarvelData("Comic", {
          titleStartsWith: this.searchComic,
          offset,
        });

        this.scrollToTop();
        this.searchResults = data;
      } catch (err) {
        console.log("Marvel API Error");
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss"></style>
