<template>
  <base-card>
    <h2>找到你的专属教练吧</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        id="basketball"
        checked
        name="篮球"
        @change="setFilter"
      />
      <label for="basketball">篮球</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="soccer"
        checked
        name="足球"
        @change="setFilter"
      />
      <label for="soccer">足球</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="badminton"
        checked
        name="羽毛球"
        @change="setFilter"
      />
      <label for="badminton">羽毛球</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="fitness"
        checked
        name="健身"
        @change="setFilter"
      />
      <label for="fitness">健身</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        basketball: true,
        soccer: true,
        badminton: true,
        fitness: true
      }
    };
  },
  methods: {
    setFilter(e) {
      const inputId = e.target.id;
      const isActive = e.target.checked;
      const updatedFilter = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updatedFilter;
      this.$emit('change-filter', updatedFilter);
    }
  }

};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>