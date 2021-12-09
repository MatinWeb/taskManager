<template>
  <div>
    <div>
      <h2 class="mt-3 mb-6 blue-grey--text darken-4">Descriptions</h2>
    </div>
    <v-row>
      <v-col cols="12" v-if="descriptions && descriptions.length">
        <div
          v-for="(item, index) in descriptions"
          :key="index"
          style="border: 1px solid #e6e6e6"
          class="pa-3 rounded mb-2"
        >
          <div
            class="d-flex justify-space-between align-center"
            style="width: 100%"
            v-if="editingMode != item._id"
          >
            <div>
              {{ item.text }}
            </div>
            <v-spacer></v-spacer>
            <div style="border-left: 1px solid #e6e6e6">
              <v-btn @click="deleteDescription(index)" icon>
                <span class="primary--text mdi mdi-delete text-h6"></span>
              </v-btn>
              <v-btn icon @click="editDescription(index)">
                <span class="primary--text mdi mdi-playlist-edit text-h6">
                </span>
              </v-btn>
            </div>
          </div>
          <div
            v-else
            class="d-flex justify-space-between align-center"
            style="width: 100%"
          >
            <v-textarea
              solo
              auto-grow
              :rows="4"
              label="Description"
              v-model="item.text"
              hide-details
            ></v-textarea>
            <div>
              <v-btn @click="applyEditedText(item, index)" icon>
                <span class="mdi mdi-check text-h6 primary--text"></span>
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" @submit.prevent="createDescription">
          <div>
            <v-textarea
              solo
              auto-grow
              :rows="4"
              label="Description"
              v-model="singleDescription.text"
              :rules="[rules.required]"
              hide-details="auto"
            ></v-textarea>
          </div>
          <div>
            <v-btn
              small
              class="mt-2"
              color="primary"
              @click="createDescription"
            >
              Save
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import rulesMixin from '@/mixins/rulesMixin'
export default {
  name: "TaskCreateDescription",
  mixins:[rulesMixin],
  model: {
    event: "descriptionUpdated",
    prop: "value",
  },
  props: {
    value: {
      type: Array,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editingMode: null,
      singleDescription: { text: null, _id: Date.now() },
      descriptions: [],
    };
  },
  methods: {
    createDescription() {
      if (!this.$refs.form.validate()) return undefined;
      this.descriptions.push(this.singleDescription);
      this.$emit('descriptionUpdated', this.descriptions)
      this.singleDescription = { text: null, _id: Date.now() };
    },
    editDescription(index) {
      this.editingMode = this.descriptions[index]._id;
    },
    deleteDescription(index) {
      this.descriptions.splice(index, 1);
    },
    applyEditedText(item, index) {
      this.editingMode = null;
      this.descriptions[index].text = item.text;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.length)
          return (this.descriptions = [...newVal]);
        else
        return (this.descriptions = []);
      },
    },
    empty: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal && this.descriptions.length === 0)
          this.singleDescription = { text: null, _id: Date.now() };
      },
    },
  },
};
</script>