<template>
  <div class="block_search">
    <div class="block_search_item">
      <input
        class="input_search"
        type="text"
        placeholder="Enter character..."
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <div class="block_btn_search">
        <button
          class="btn_search"
          type="button"
          name="Search"
          @click="search()"
        >
          SEARCH
        </button>
        <button
          v-if="searchResults.results"
          class="btn_search"
          id="SearchReset"
          @click="$emit('reset')"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  props: {
    searchResults: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    search() {
      this.$emit("search");
    },
  },
};
</script>
