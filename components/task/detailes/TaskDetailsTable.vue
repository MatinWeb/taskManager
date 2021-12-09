<template>
  <v-card>
    <v-data-table :headers="headers" :items="tasks">
      <template v-slot:[`item.title`]="{ item }">
        {{ item.title }}
      </template>
      <template v-slot:[`item.users`]="{ item }">
        {{ showUsers(item) }}
      </template>
      <template v-slot:[`item.priority`]="{ item }">
        <div class="d-flex justify-start align-center">
          <span>
            {{ item.priority.text }}
          </span>
          <span class="mdi text-h5" :class="priorityClass(item)"> </span>
        </div>
      </template>
      <template v-slot:[`item.startDate`]="{ item }">
        <span :class="dateClass(item)">
          {{ item.date.start || "-" }}
        </span>
      </template>
      <template v-slot:[`item.dueDate`]="{ item }">
        <span :class="dateClass(item)">
          {{ item.date.end || "-" }}
        </span>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <TaskDetailsStatusChip :status="item.status"/>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn icon @click="editItem(item)">
          <v-icon small color="primary"> mdi-pencil </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
// import dataMixin from "@/mixins/dataMixin";
export default {
  name: 'TaskDetailsTable',
  // mixins: [dataMixin],
  data() {
    return {
      headers: [
        {
          text: "Task Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Users", value: "users", sortable: false },
        { text: "Priority", value: "priority", sortable: false },
        { text: "Start Date", value: "startDate", sortable: false },
        { text: "Due Date", value: "dueDate", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Action", value: "action", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(["tasks"]),
  },
  methods: {
    editItem(item) {
      this.$emit("editTask", item);
    },
    dateClass(item) {
      if (item.date.end < this.$dayjs().format("YYYY-MM-DD"))
        return ["red--text"];
    },
    priorityClass(item) {
      if (item.priority.value === 1)
        return ["mdi-arrow-down-thin", "primary--text"];
      else if (item.priority.value === 2)
        return [
          "mdi-align-vertical-distribute",
          "amber--text",
          "text-h6",
          "ml-2",
        ];
      else if (item.priority.value === 3)
        return ["mdi-arrow-up-thin", "red--text"];
    },
    showUsers(item) {
      let usersToShow = item.users
        .slice(0, 3)
        .map((i) => {
          return i.name;
        })
        .join(", ");
      if (item.users.length > 3) return `${usersToShow}, ...`;
      else return usersToShow;
    },
  },
};
</script>