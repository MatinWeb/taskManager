export default {
    data() {
        return {
            TASK_STATUS: {
                TODO: 1,
                INPROGRESS: 2,
                DONE: 3
            },
            TASK_STATUSES: [
                {
                    text: 'To Do',
                    value: 1,
                    color: '#6E7191',
                    backgroundColor: 'rgba(217, 219, 233, 0.5)',
                },
                {
                    text: 'In Progress',
                    value: 2,
                    color: '#2C50EE',
                    backgroundColor: 'rgba(44, 80, 238, 0.15)',
                },
                {
                    text: 'Done',
                    value: 3,
                    color: '#00BA88',
                    backgroundColor: 'rgba(46, 229, 180, 0.15)',
                },
            ]
        }
    },
    methods: {
        translateStatus(status) {
            let statusSelected = this.TASK_STATUSES.find(
                (s) => s.value == status
            );
            return statusSelected;
        }
    }
}