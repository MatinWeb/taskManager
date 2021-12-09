<template>
  <div>
    <v-menu v-model="menu" open-on-hover bottom offset-y max-width="150">
      <template v-slot:activator="{ on, attrs }">
        <TaskDetailsStatusChip
          showIcon
          :on="on"
          v-bind="attrs"
          :status="selectedStatus"
          :menu="menu"
        />
      </template>
      <v-list>
        <v-list-item-group v-model="selectedStatus" color="primary">
          <v-list-item
            v-for="status in TASK_STATUSES"
            :key="status.value"
            :value="status.value"
            link
          >
            <v-list-item-title>{{ status.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import dataMixin from "@/mixins/dataMixin";
export default {
  name: "TaskCreateStatus",
  mixins: [dataMixin],
  model: {
    event: "updatedStatus",
    prop: "value",
  },
  props: {
    value: {},
  },
  data() {
    return {
      menu: false,
      selectedStatus: this.value,
    };
  },

  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.selectedStatus = this.value;
        }
      },
    },
    selectedStatus(newVal) {
      this.$emit("updatedStatus", newVal);
    },
  },
};
</script>