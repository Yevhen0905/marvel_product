<template>
  <div class="main">
    <div class="container">
      <SearchBox
        v-model="searchChar"
        @search="searchCharacter"
        @reset="reset"
        :search-results="searchResults"
      />
      <h2 class="title">CHARACTERS</h2>
      <div class="loader_block" v-if="!characters.results">
        <v-progress-circular class="loader" :size="50" :width="5" indeterminate>
        </v-progress-circular>
      </div>
      <div class="wrapper_result" v-else>
        <SearchResultsCharacters
          v-if="searchResults.results"
          :search-results="searchResults"
          @search-character="searchCharacter"
        />
        <AllResultsCharacters
          v-else
          :characters="characters"
          @get-characters="getCharacters"
        />
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script>
import { fetchMarvelData } from "@/utils/useMarvelApi";
import BackTop from "../components/BackTop.vue";
import SearchBox from "../components/SearchBox.vue";
import AllResultsCharacters from "@/components/AllResultsCharacters.vue";
import SearchResultsCharacters from "@/components/SearchResultsCharacters.vue";

export default {
  name: "Characters",
  components: {
    BackTop,
    SearchBox,
    AllResultsCharacters,
    SearchResultsCharacters,
  },
  data() {
    return {
      searchChar: "",
      characters: [],
      searchResults: {},
      limit: 20,
    };
  },
  mounted() {
    this.getCharacters();
  },
  methods: {
    async getCharacters(page = 1) {
      const offset = this.limit * (page - 1);

      try {
        const data = await fetchMarvelData("CHARACTER", { offset });
        this.scrollToTop();
        this.characters = data;
      } catch (err) {
        console.log("Marvel API Error");
      }
    },

    async searchCharacter(page = 1) {
      const offset = this.limit * (page - 1);

      try {
        const data = await fetchMarvelData("CHARACTER", {
          nameStartsWith: this.searchChar,
          offset,
        });

        this.scrollToTop();
        this.searchResults = data;
      } catch (err) {
        console.log("Marvel API Error");
      }
    },

    reset() {
      this.searchChar = "";
      this.searchResults = {};
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
