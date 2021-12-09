<template>
  <v-menu v-model="priorityMenu" bottom left offset-y max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <div
        v-on="on"
        v-bind="attrs"
        class="d-flex justify-space-between align-center"
      >
        <div class="d-flex align-center"><v-icon class="mr-2 text-body-1">mdi-filter-variant</v-icon>Priority</div>
        <div>
          <span
            class="mdi"
            :class="[priorityMenu ? 'mdi-chevron-up' : 'mdi-chevron-down']"
          ></span>
        </div>
      </div>
    </template>

    <v-card class="mx-auto" tile>
      <v-list>
        <v-list-item-group v-model="priority" color="primary">
          <v-list-item
            @click="updatePriority(priority)"
            v-for="(priority, index) in taskPriority"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title v-text="priority.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "TaskCreatePriority",
  model: {
    event: "priorityUpdated",
    prop: "value",
  },
  props: {
    value: { type: Object },
  },
  data() {
    return {
      priority: -1,
      priorityMenu: false,
      taskPriority: [
        { text: "Low", value: 1 },
        { text: "Medium", value: 2 },
        { text: "Hight", value: 3 },
      ],
    };
  },
  methods: {
    updatePriority(priority) {
      this.priority = priority.value - 1;
      this.$emit("priorityUpdated", priority);
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) this.priority = newVal.value - 1;
      },
    },
  },
};
</script>