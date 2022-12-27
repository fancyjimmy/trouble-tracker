/*

idea of how to implement

const schedule = new Schedule("every", 1, "day");
let events = schedule.fromTo("2022-01-01", "2021-01-09");

console.log(events); // [2021-01-01, 2021-01-02, 2021-01-03, 2021-01-04, 2021-01-05, 2021-01-06, 2021-01-07, 2021-01-08, 2021-01-09]

const monthlySchedule = new Schedule("every", 1, "month");
let monthlyEvents = monthlySchedule.fromTo("2021-01-01", "2021-03-01");
console.log(monthlyEvents); // [2021-01-01, 2021-02-01, 2021-03-01]

const weeklySchedule = new Schedule("every", 1, "week");
let weeklyEvents = weeklySchedule.fromTo("2021-01-01", "2021-01-31");
console.log(weeklyEvents); // [2021-01-01, 2021-01-08, 2021-01-15, 2021-01-22, 2021-01-29]

const yearlySchedule = new Schedule("every", 1, "year");
let yearlyEvents = yearlySchedule.fromTo("2021-01-01", "2023-01-01");
console.log(yearlyEvents); // [2021-01-01, 2022-01-01, 2023-01-01]

const everyOtherDaySchedule = new Schedule("every", 2, "day");
let everyOtherDayEvents = everyOtherDaySchedule.fromTo("2021-01-01", "2021-01-31");
console.log(everyOtherDayEvents); // [2021-01-01, 2021-01-03, 2021-01-05, 2021-01-07, 2021-01-09, 2021-01-11, 2021-01-13, 2021-01-15, 2021-01-17, 2021-01-19, 2021-01-21, 2021-01-23, 2021-01-25, 2021-01-27, 2021-01-29, 2021-01-31]

const everyMondaySchedule = new Schedule("every", 1, "week", "monday");
let everyMondayEvents = everyMondaySchedule.fromTo("2021-01-01", "2021-01-31");
console.log(everyMondayEvents); // [2021-01-04, 2021-01-11, 2021-01-18, 2021-01-25]
 */

export default class Schedule {
    constructor(
        public frequency: "every" | "on",
        public interval: number,
        public unit: "day" | "week" | "month" | "year" | "dayOfWeek",
        public dayOfWeek?: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | number
    ) {
        //check day of week
        if (this.unit === "dayOfWeek") {
            if (this.dayOfWeek === undefined) {
                throw new Error("day of week is required for day of week schedule");
            }
        }

        // check dayOfWeek in range
        if (this.unit === "dayOfWeek") {
            if (typeof this.dayOfWeek === "number") {
                if (this.dayOfWeek < 0 || this.dayOfWeek > 6) {
                    throw new Error("day of week must be between 0 and 6");
                }
            } else {
                if (Schedule.normalizeDayOfWeek(this.dayOfWeek!) < 0 || Schedule.normalizeDayOfWeek(this.dayOfWeek!) > 6) {
                    throw new Error("day of week must be between 0 and 6");
                }
            }
        }
    }

    save() {
        return JSON.stringify( {
            frequency: this.frequency,
            interval: this.interval,
            unit: this.unit,
            dayOfWeek: (this.dayOfWeek === undefined) ? undefined : (typeof this.dayOfWeek === "number") ? this.dayOfWeek : Schedule.normalizeDayOfWeek(this.dayOfWeek)
        });
    }

    static normalizeDayOfWeek(weekday: string): number {
        if (weekday === "monday") {
            return 1;
        } else if (weekday === "tuesday") {
            return 2;
        } else if (weekday === "wednesday") {
            return 3;
        } else if (weekday === "thursday") {
            return 4;
        } else if (weekday === "friday") {
            return 5;
        } else if (weekday === "saturday") {
            return 6;
        } else if (weekday === "sunday") {
            return 0;
        }
        throw new Error("invalid day of week");
    }

    static getDaysInMonth(date: Date, month: number) : number {
        const next = new Date(date);
        next.setMonth(month);
        next.setDate(0);
        return next.getDate();
    }


    nextDayOfWeek(date: Date, dayOfWeek: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | number) : Date {
        const next = new Date(date);
        const dayOfWeekNumber = typeof dayOfWeek === "number" ? dayOfWeek : Schedule.normalizeDayOfWeek(dayOfWeek);
        next.setDate(next.getDate() + ((dayOfWeekNumber - next.getDay() + 7) % 7));
        return next;
    }

    fromTo(start: Date, end: Date) : Date[]{
        const events: Date[] = [];
        let next = start;
        if (this.unit === "dayOfWeek") {
            next = this.nextDayOfWeek(start, this.dayOfWeek!);
        }
        while (next <= end) {
            events.push(next);
            if (this.frequency === "on"){
                return events;
            }
            next = this.next(next);
        }
        return events;
    }


    next(date: Date): Date {
        let next = new Date(date);
        if (this.unit === "day") {
            next.setDate(next.getDate() + this.interval);
        } else if (this.unit === "week") {
            next.setDate(next.getDate() + this.interval * 7);
        } else if (this.unit === "month") {
            next.setMonth(next.getMonth() + this.interval);
        } else if (this.unit === "year") {
            next.setFullYear(next.getFullYear() + this.interval);
        } else if (this.unit === "dayOfWeek") {
            next.setDate(next.getDate() + 7 * this.interval);
            next = this.nextDayOfWeek(next, this.dayOfWeek!);
        }


        return next;
    }
}

//test code
const schedule = new Schedule("every", 1, "day");
const events = schedule.fromTo(new Date("2022-01-01"), new Date("2021-01-09"));
console.log(events); // [2021-01-01, 2021-01-02, 2021-01-03, 2021-01-04, 2021-01-05, 2021-01-06, 2021-01-07, 2021-01-08, 2021-01-09]