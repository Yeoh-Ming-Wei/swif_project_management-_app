const calculateMemberEffort = (activeProject, activeSprint, memberTasks) => {
    const startDate = new Date(activeSprint.startDate);
    const endDate = new Date(activeSprint.endDate);
    const durationDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    const activeSprintBacklog = activeSprint.sprintBacklog;

    let totalHours = 0;

    for (let i = 0; i <= durationDays; i++) {
        const newDate = new Date(startDate.getTime() + (i * 86400000)); // a day in ms
        const workedHours = activeSprintBacklog.filter(
            (taskId) => {
                const task = activeProject.tasks.find((task) => task.id == taskId);
                return (task.taskStage == "2" || task.taskStage == "3");
            }
        ).reduce(
            (acc, taskId) => {
                const task = memberTasks.find((task) => task.id == taskId);
                const taskStartDate = new Date(task.startDate);
                const taskEndDate = new Date(task.endDate);

                if (newDate >= taskStartDate && newDate <= taskEndDate) {
                    const hours = (taskEndDate - taskStartDate) / 3600000;
                    return acc + hours;
                } else {
                    return acc;
                }
            }, 0
        );
        totalHours += workedHours;
    }

    return {
        totalHours: totalHours,
        totalDays: durationDays
    };
}

export { calculateMemberEffort };