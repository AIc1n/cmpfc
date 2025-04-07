terminal.addCommand("now", async function() {
    try {
        const getCurrentWeek = () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);
            const days = Math.ceil((now - start) / (24 * 60 * 60 * 1000));
            return (days % 14 < 7) ? 1 : 2;
        };

        const weekNumber = getCurrentWeek();
        const response = await fetch(`././json/scheludes${weekNumber}.json`);
        if (!response.ok) throw new Error("Файл расписания не найден");
        const scheduleData = await response.json();

        const timeToMinutes = time => {
            const [h, m] = time.split(":").map(Number);
            return h * 60 + m;
        };

        const now = new Date();
        const currentDay = now.toLocaleDateString("ru-RU", { weekday: "long" });
        const currentTime = timeToMinutes(
            `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
        );

        const today = scheduleData.schedule.find(
            day => day.day.toLowerCase() === currentDay.toLowerCase()
        );

        if (!today || !today.lessons?.length) {
            return terminal.printLine("На сегодня расписания нет");
        }

        const validLessons = today.lessons.filter(
            lesson => lesson.subject?.trim() && lesson.type?.trim()
        );

        const currentLesson = validLessons.find(lesson => {
            const start = timeToMinutes(lesson.start_time);
            const end = timeToMinutes(lesson.end_time);
            return currentTime >= start && currentTime <= end;
        });

        if (currentLesson) {
            const output = [
                `Сейчас идет ${currentLesson.type.toLowerCase()}:`,
                `├─ ${currentLesson.subject}`,
                `├─ ${lesson.classroom || "Кабинет не указан"}`,
                `├─ ${currentLesson.teacher || "Преподаватель не указан"}`,
                `└─ ${currentLesson.start_time} - ${currentLesson.end_time}`
            ].join("\n");
            
            return terminal.printLine(output);
        }

        const nextLesson = validLessons.find(
            lesson => timeToMinutes(lesson.start_time) > currentTime
        );

        if (nextLesson) {
            const details = [];
            if (nextLesson.subject) details.push(`${nextLesson.subject}`);
            if (nextLesson.classroom) details.push(`${nextLesson.classroom}`);
            if (nextLesson.teacher) details.push(`${nextLesson.teacher}`);
            
            const output = [
                "Следующая пара:",
                `Начнется в ${nextLesson.start_time}`,
                ...details
            ].join("\n");

            terminal.printLine(output);
        } else {
            terminal.printLine("Учебный день окончен");
        }

    } catch (error) {
        terminal.printLine("Ошибка:");
        terminal.printLine(error.message);
    }
}, {
    description: "Показывает текущую пару по расписанию."
});