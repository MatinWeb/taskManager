<template>
  <div class="mt-10">
    <v-row justify="center" align="center">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="createTaskDialog"> Create Task </v-btn>
      </v-col>

      <v-col cols="12">
        <TaskDetailsTable @editTask="editTask" />
      </v-col>
    </v-row>
    <TaskCreateDialog
      :visible="visible"
      @closeDialog="closeDialog"
      :editedTask="editedTask"
    />
  </div>
</template>

<script>
export default {
  name: "TaskPage",
  data() {
    return {
      visible: false,
      editedTask: {},
    };
  },
  methods: {
    openDialog() {
      this.visible = true;
    },
    createTaskDialog() {
      this.editedTask = {};
      this.openDialog();
    },
    closeDialog(value) {
      this.visible = value;
    },
    editTask(task) {
      this.editedTask = {};
      this.editedTask = { ...task };
      this.openDialog();
    },
  },
};
</script>
