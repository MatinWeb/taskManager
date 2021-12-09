<template>
  <v-chip
    :style="{
      color: statusToShow.color,
      backgroundColor: statusToShow.backgroundColor,
    }"
    v-on="on"
  >
    {{ statusToShow.text }}
    <v-icon
      :style="{
        color: statusToShow.color,
      }"
      v-if="showIcon"
    >
      {{ menu ? "mdi-chevron-up" : "mdi-chevron-down" }}
    </v-icon>
  </v-chip>
</template>
<script>

import dataMixin from "@/mixins/dataMixin";
export default {
  name: "TaskDetailsStatusChip",
  mixins:[dataMixin],
  props: {
    status: {
      required: true,
    },
    showIcon: {
        type: Boolean,
        default:false
    },
    on: {},
    menu:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    statusToShow() {
      return this.translateStatus(this.status);
    },
  },
};
</script>