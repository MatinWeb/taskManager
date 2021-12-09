<template>
  <div style="width: 100%" class="text-h4">
    <v-row>
      <v-col v-if="!editingTitle" @click="editingTitle = true" cols="12">
        <div class="pa-2">
          {{ title }}
        </div>
      </v-col>
      <v-col v-click-outside="changeTitle" v-else cols="12">
        <v-form ref="form">
          <v-text-field
            :rules="[rules.required, rules.maxLength(title, 50)]"
            style="width: 100%"
            label="Title"
            solo
            v-model="title"
            hide-details="auto"
            @keyup="updateTitle"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import rulesMixin from "@/mixins/rulesMixin";
export default {
  name: "TaskCreateTitle",
  mixins: [rulesMixin],
  model: {
    event: "titleUpdated",
    prop: "value",
  },
  props: {
    value: {
      type: String,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: this.value,
      editingTitle: false,
    };
  },
  methods: {
    updateTitle() {
      this.$emit("titleUpdated", this.title);
    },
    changeTitle() {
      if (!this.$refs.form.validate()) return undefined;
      this.editingTitle = false;
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.title = newVal;
      },
    },
    title: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.$emit("titleUpdated", newVal);
      },
    },
  },
};
</script>