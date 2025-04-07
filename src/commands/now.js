terminal.addCommand("now", async function() {
    try {
        const getCurrentWeek = () => {
            const now = new Date();
            const startDate = new Date(now.getFullYear(), 0, 1);
            const days = Math.floor((now - startDate) / 86400000);
            return (Math.floor(days / 7) % 2) + 1;
        };

        const weekNumber = getCurrentWeek();
        const scheduleFile = `././json/scheludes${weekNumber}.json`;
        
        const response = await fetch(scheduleFile);
        if (!response.ok) throw new Error('Расписание не найдено');
        const scheduleData = await response.json();

        const timeToMinutes = (time) => {
            const [h, m] = time.split(':').map(Number);
            return h * 60 + m;
        };

        const now = new Date();
        const currentDay = now.toLocaleDateString('ru-RU', { weekday: 'long' });
        const currentTime = timeToMinutes(
            `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
        );

        const today = scheduleData.schedule.find(day => 
            day.day.toLowerCase() === currentDay.toLowerCase()
        );

        if (!today || !today.lessons.length) {
            return terminal.printLine("На сегодня пар нет");
        }

        const currentLesson = today.lessons.find(lesson => {
            if (!lesson.subject || !lesson.type) return false;
            
            const start = timeToMinutes(lesson.start_time);
            const end = timeToMinutes(lesson.end_time);
            return currentTime >= start && currentTime <= end;
        });

        if (currentLesson) {
            const output = [
                `Сейчас ${currentLesson.type} (${currentLesson.order} пара):`,
                `${currentLesson.subject}`,
                `Аудитория: ${currentLesson.classroom}`,
                `Время: ${currentLesson.start_time} - ${currentLesson.end_time}`,
                `Преподаватель: ${currentLesson.teacher}`
            ].join("\n");
            
            terminal.printLine(output);
        } else {
            const nextLesson = today.lessons.find(lesson => 
                timeToMinutes(lesson.start_time) > currentTime
            );
            
            if (nextLesson) {
                terminal.printLine(`Перерыв до следующей пары в ${nextLesson.start_time}, в кабинете ${nextLesson.classroom}, предмет: ${nextLesson.subject}, препод: ${nextLesson.teacher}`);
            } else {
                terminal.printLine("Учебный день окончен");
            }
        }

    } catch (error) {
        terminal.printLine("Ошибка получения расписания:");
        terminal.printLine(error.message);
    }
}, {
    description: "Показывает текущую пару по расписанию колледжа",
});