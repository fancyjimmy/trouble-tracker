import {describe, it, expect} from 'vitest';

import Schedule from "$lib/schedule/Schedule";

// test the Schedule class


describe('Schedule', () => {
    it('should work with daily', function () {
        const dailySchedule = new Schedule("every", 1, "day");
        const dailyEvents = dailySchedule.fromTo(new Date("2021-01-01"), new Date("2021-01-05"));
        expect(dailyEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2021-01-02"),
            new Date("2021-01-03"),
            new Date("2021-01-04"),
            new Date("2021-01-05")
        ]);
    });

    it('should work with weekly', function () {
        const weeklySchedule = new Schedule("every", 1, "week");
        const weeklyEvents = weeklySchedule.fromTo(new Date("2021-01-01"), new Date("2021-01-16"));
        expect(weeklyEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2021-01-08"),
            new Date("2021-01-15")
        ]);
    });

    it('should work with monthly', function () {
        const monthlySchedule = new Schedule("every", 1, "month");
        const monthlyEvents = monthlySchedule.fromTo(new Date("2021-01-01"), new Date("2021-03-01"));
        expect(monthlyEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2021-02-01"),
            new Date("2021-03-01")
        ]);
    });

    it('should work with yearly', function () {
        const yearlySchedule = new Schedule("every", 1, "year");
        const yearlyEvents = yearlySchedule.fromTo(new Date("2021-01-01"), new Date("2023-01-01"));
        expect(yearlyEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2022-01-01"),
            new Date("2023-01-01")
        ]);
    });

    it('should work not work with ending months', function () {
        const monthlySchedule = new Schedule("every", 1, "month");
        const monthlyEvents = monthlySchedule.fromTo(new Date("2021-01-31"), new Date("2021-04-30"));
        expect(monthlyEvents).not.toEqual([
            new Date("2021-01-31"),
            new Date("2021-02-28"),
            new Date("2021-03-31"),
            new Date("2021-04-30")
        ]);
    });

    it('should work with every other day', function () {
        const everyOtherDaySchedule = new Schedule("every", 2, "day");
        const everyOtherDayEvents = everyOtherDaySchedule.fromTo(new Date("2021-01-01"), new Date("2021-01-13"));
        expect(everyOtherDayEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2021-01-03"),
            new Date("2021-01-05"),
            new Date("2021-01-07"),
            new Date("2021-01-09"),
            new Date("2021-01-11"),
            new Date("2021-01-13")
        ]);
    });

    it('should work with every other week', function () {
        const everyOtherWeekSchedule = new Schedule("every", 2, "week");
        const everyOtherWeekEvents = everyOtherWeekSchedule.fromTo(new Date("2021-01-01"), new Date("2021-01-31"));
        expect(everyOtherWeekEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2021-01-15"),
            new Date("2021-01-29")
        ]);
    });

    it('should work with every other month', function () {
        const everyOtherMonthSchedule = new Schedule("every", 2, "month");
        const everyOtherMonthEvents = everyOtherMonthSchedule.fromTo(new Date("2021-01-01"), new Date("2021-03-01"));
        expect(everyOtherMonthEvents).toEqual([new Date("2021-01-01"), new Date("2021-03-01")]);
    });
    it('should work with every other year', function () {
        const everyOtherYearSchedule = new Schedule("every", 2, "year");
        const everyOtherYearEvents = everyOtherYearSchedule.fromTo(new Date("2021-01-01"), new Date("2023-01-01"));
        expect(everyOtherYearEvents).toEqual([new Date("2021-01-01"), new Date("2023-01-01")]);
    });

    it('should work with every 3 days', function () {
        const every3DaysSchedule = new Schedule("every", 3, "day");
        const every3DaysEvents = every3DaysSchedule.fromTo(new Date("2021-01-01"), new Date("2021-01-16"));
        expect(every3DaysEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2021-01-04"),
            new Date("2021-01-07"),
            new Date("2021-01-10"),
            new Date("2021-01-13"),
            new Date("2021-01-16")
        ]);
    });

    it('should work with every 30 days', function () {
        const every30DaysSchedule = new Schedule("every", 30, "day");
        const every30DaysEvents = every30DaysSchedule.fromTo(new Date("2021-01-01"), new Date("2021-03-02"));
        expect(every30DaysEvents).toEqual([
            new Date("2021-01-01"),
            new Date("2021-01-31"),
            new Date("2021-03-02")
        ]);
    });

});

describe('Schedule.fromTo dayOfWeek', function () {
    it('should work with every monday', function () {
        const everyMondaySchedule = new Schedule("every", 1, "dayOfWeek", 1);
        const everyMondayEvents = everyMondaySchedule.fromTo(new Date("2021-01-01"), new Date("2021-01-31"));
        expect(everyMondayEvents).toEqual([
            new Date("2021-01-04"),
            new Date("2021-01-11"),
            new Date("2021-01-18"),
            new Date("2021-01-25")
        ]);
    });

    it('should work with every 2nd monday', function () {
        const every2ndMondaySchedule = new Schedule("every", 2, "dayOfWeek", 1);
        const every2ndMondayEvents = every2ndMondaySchedule.fromTo(new Date("2021-01-01"), new Date("2021-01-31"));
        expect(every2ndMondayEvents).toEqual([
            new Date("2021-01-04"),
            new Date("2021-01-18")
        ]);
    });

    it('should work with every tuesday', function () {
        const everyTuesdaySchedule = new Schedule("every", 1, "dayOfWeek", 2);
        const everyTuesdayEvents = everyTuesdaySchedule.fromTo(new Date("2021-12-20"), new Date("2022-01-20"));
        expect(everyTuesdayEvents).toEqual([
            new Date("2021-12-21"),
            new Date("2021-12-28"),
            new Date("2022-01-04"),
            new Date("2022-01-11"),
            new Date("2022-01-18")
        ]);

    });

});