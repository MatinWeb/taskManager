export const state = () => ({
    tasks: [{
        title: "First Task",
        users: [{ name: 'David' }, { name: 'Sara' }, { name: 'Katrin' }, { name: 'Shervin' }],
        priority: {
            text: "Hight",
            value: 3,
        },
        date: { start: '2021-10-09', end: '2021-11-20' },
        descriptions: [{ text: 'There is some descriptions in this field! add more...', _id: Date.now() }],
        status: 1,
        taskId: 111,
    }]
})

export const mutations = {
    setTask(state, task) {
        let taskIndex = state.tasks.findIndex((item) => item.taskId === task.taskId)
        state.tasks[taskIndex] = { ...task }
        state.tasks = [...state.tasks]
    },
    createTask(state, task) {
        state.tasks.push(task)
    }
}
