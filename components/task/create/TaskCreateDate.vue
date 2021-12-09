<template>
  <v-menu
    :close-on-content-click="false"
    v-model="dateMenu"
    bottom
    left
    offset-y
    max-width="650"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        v-on="on"
        v-bind="attrs"
        class="d-flex justify-space-between align-center"
      >
        <div class="d-flex align-center"><v-icon class="mr-2 text-body-1">mdi-calendar-blank</v-icon> Date</div>
        <div>
          <span
            class="mdi"
            :class="[dateMenu ? 'mdi-chevron-up' : 'mdi-chevron-down']"
          ></span>
        </div>
      </div>
    </template>

    <v-card tile>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <div class="font-weight-black text-h5 text-center my-2">
              From Date:
            </div>
            <div>
              <v-date-picker
                v-model="date.start"
                color="light-blue darken-1"
                header-color="primary"
                scrollable
              ></v-date-picker>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="font-weight-black text-h5 text-center my-2">
              To Date:
            </div>
            <div>
              <v-date-picker
                v-model="date.end"
                color="light-blue darken-1"
                header-color="primary"
                scrollable
              ></v-date-picker>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mr-4 pb-6">
        <v-btn color="primary" text @click="dateMenu = false">Cancel</v-btn>
        <v-btn color="primary" @click="addDate">Apply</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: "TaskCreateDate",
  model: {
    event: "dateUpdated",
    prop: "value",
  },
  props: {
    value: { type: Object },
  },
  data() {
    return {
      dateMenu: false,
      date: {
        start: this.value && this.value.start ? this.value.start : "",
        end: this.value && this.value.end ? this.value.end : "",
      },
    };
  },

  methods: {
    addDate() {
      this.$emit("dateUpdated", { ...this.date });
      this.dateMenu = false;
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) this.date = { ...newVal };
      },
    },
  },
  created() {
    if (this.value && this.value.start) this.date = { ...this.value };
  },
};
</script>