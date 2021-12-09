<template>
  <v-dialog v-model="dialog" max-width="900" width="900">
    <v-card>
      <v-card-title class=" my-4">
        <v-row>
          <v-col cols="12" sm="8">
            <TaskCreateTitle
              :empty="empty"
              v-model="task.title"
              :value="task.title"
            />
          </v-col>
          <v-col>
            <TaskCreateStatus v-model="task.status" :value="task.status" />
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12">
                <div v-if="task.users.length">
                  <h2 class="blue-grey--text darken-4">Assign to</h2>
                  <div class="d-flex justify-start align-center mt-2">
                    <span>
                      {{ showUsers }}
                    </span>
                  </div>
                  <v-divider class="mt-3"></v-divider>
                </div>
              </v-col>
              <v-col cols="12" class="d-flex justify-start align-center">
                <div
                  :class="dateClass"
                  class="mr-3"
                  v-if="task.date.start || task.date.end"
                >
                  <span>{{ task.date.start || "-" }}</span>
                  <span class="mdi mdi-arrow-right"> </span>
                  <span>{{ task.date.end || "-" }}</span>
                </div>
                <div class="d-flex justify-start align-center">
                  <span class="text-h6">
                    {{ task.priority.text }}
                  </span>
                  <span class="mdi text-h4" :class="priorityClass"> </span>
                </div>
              </v-col>
              <v-col cols="12">
                <TaskCreateDescription
                  v-model="task.descriptions"
                  :value="task.descriptions"
                  :empty="empty"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" md="4">
            <div class="py-3">
              <TaskCreateUser v-model="task.users" :value="task.users" />
            </div>
            <div class="py-3">
              <TaskCreatePriority
                v-model="task.priority"
                :value="task.priority"
              />
            </div>
            <div class="py-3">
              <TaskCreateDate v-model="task.date" :value="task.date" />
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="mr-4 pb-6">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cancelDialog" text>Cancle</v-btn>
        <v-btn
          :disabled="!task.title"
          color="primary"
          @click="confirmTaskDialog"
        >
          {{ task.taskId ? "Apply" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import dataMixin from "@/mixins/dataMixin";
export default {
  name: "TaskCreateDialog",
  mixins: [dataMixin],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    editedTask: {
      type: Object,
    },
  },
  data() {
    return {
      empty: false,
      dialog: this.visible,
      task: {
        title: "Task Title",
        users: [],
        priority: {
          text: "Low",
          value: 1,
        },
        date: {},
        descriptions: [],
        status: null,
      },
    };
  },
  computed: {
    ...mapState(["tasks"]),
    showUsers() {
      return this.task.users
        .map((u) => {
          return u.name;
        })
        .join(", ");
    },
    priorityClass() {
      if (this.task.priority.value === 1)
        return ["mdi-arrow-down-thin", "primary--text"];
      else if (this.task.priority.value === 2)
        return [
          "mdi-align-vertical-distribute",
          "amber--text",
          "text-h5",
          "ml-2",
        ];
      else if (this.task.priority.value === 3)
        return ["mdi-arrow-up-thin", "red--text"];
    },
    dateClass() {
      if (this.task.date.end < this.$dayjs().format("YYYY-MM-DD"))
        return ["red--text"];
      else return ["primary--text"];
    },
  },
  methods: {
    ...mapMutations(["createTask", "setTask"]),
    dialogClose() {
      this.dialog = false;
      this.$emit("closeDialog", this.dialog);
    },
    cancelDialog() {
      this.dialogClose();
      if (this.task.taskId) return this.applyTaskDialog();
    },
    createTaskDialog() {
      this.createTask({
        ...this.task,
        taskId: Date.now(),
      });
    },
    applyTaskDialog() {
      this.setTask(this.task);
    },
    confirmTaskDialog() {
      if (this.task.taskId) {
        this.applyTaskDialog();
      } else {
        this.createTaskDialog();
      }
      this.dialogClose();
    },
  },
  watch: {
    visible(newVal) {
      this.dialog = newVal;
    },
    dialog(newVal) {
      if (newVal) {
        if (this.editedTask && this.editedTask.taskId) {
          let taskIndexToEdit = this.tasks.findIndex(
            (i) => i.taskId === this.editedTask.taskId
          );
          this.task = { ...this.tasks[taskIndexToEdit] };
        } else
          return (this.task = {
            title: "Task Title",
            users: [],
            priority: {
              text: "Low",
              value: 1,
            },
            date: {},
            descriptions: [],
            status: this.TASK_STATUS.TODO,
          });
      } else if (!newVal) {
        this.cancelDialog();
        this.empty = true;
      }
    },
  },
};
</script>