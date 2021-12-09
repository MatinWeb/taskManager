<template>
  <v-menu
    :close-on-content-click="false"
    v-model="userMenu"
    bottom
    left
    offset-y
    max-width="350"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        v-on="on"
        v-bind="attrs"
        class="d-flex justify-space-between align-center"
      >
        <div class="d-flex align-center">
          <v-icon class="mr-2 text-body-1"> mdi-account-plus-outline </v-icon
          >Users
        </div>
        <div>
          <span
            class="mdi"
            :class="[userMenu ? 'mdi-chevron-up' : 'mdi-chevron-down']"
          ></span>
        </div>
      </div>
    </template>
    <v-container class="white">
      <v-row>
        <v-col cols="12"> Add user </v-col>
        <v-col
          class="d-flex justify-space-between align-center"
          cols="12"
          v-for="(user, index) in users"
          :key="index"
        >
          <v-text-field
            outlined
            label="User Name"
            v-model="user.name"
            hide-details="auto"
          />
          <v-btn @click="deleteUser(index)" large icon>
            <span class="text-h5 mdi mdi-delete-outline"></span>
          </v-btn>
        </v-col>
      </v-row>
      <div class="mt-1">
        <v-btn color="primary" text @click="addNewInputFieldForUser">
          <span class="mdi mdi-plus"></span>
          Add More UserName
        </v-btn>
      </div>
      <div class="d-flex justify-end">
        <v-btn @click="addUsers" color="primary"> Add </v-btn>
      </div>
    </v-container>
  </v-menu>
</template>

<script>
import rulesMixin from "@/mixins/rulesMixin";
export default {
  name: "TaskCreateUser",
  model: {
    event: "usersUpdated",
    prop: "value",
  },
  mixins: [rulesMixin],
  props: {
    value: { type: Array },
  },
  data() {
    return {
      users: [{ name: null }],
      userMenu: false,
    };
  },
  methods: {
    addNewInputFieldForUser() {
      this.users.push({ name: null });
    },
    deleteUser(index) {
      this.users.splice(index, 1);
      if (this.users.length == 0) this.addNewInputFieldForUser();
    },
    addUsers() {
      const payload = [...this.users.filter((u) => u.name)];
      this.$emit("usersUpdated", payload);
      this.userMenu = false;
    },
  },
  created() {
    // if (this.value && this.value.length) return (this.users = [...this.value]);
  },
  watch: {
    userMenu(newVal) {
      if (newVal) {
        this.users = this.users.filter((u) => u.name);
        if (this.users && this.users.length === 0)
          this.addNewInputFieldForUser();
      } else this.addUsers();
    },
    value: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.length) {
          this.users = [...newVal];
        } else return (this.users = [{ name: null }]);
      },
    },
  },
};
</script>