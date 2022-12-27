export default class Question {
    constructor(
        private id: number,
        private question: string,
        private type: string,
        private answerOptions: RangeAnswer | MultipleChoiceAnswer | TextAnswer,
        private answer: string | number | string[],
    ) {

    }
}

/*

scheduled Questions

scheduled questions are questions that are asked at a specific Schedule
the blueprints for these questions are stored in the database
the answers are stored in the database


 */


export class RangeAnswer{
    constructor(
        private id: number,
        private min: number,
        private max: number,
        private step: number,
        private answer: number,
    ) {

    }
}

export class MultipleChoiceAnswer{
    constructor(
        private id: number,
        private options: string[]
    ) {

    }
}

export class TextAnswer{
    constructor(
        private id: number,
        private text: string,
    ) {

    }
}


export class Questionnaire{
    constructor(
        private id: number,
        private title: string,
        private questions: Question[],
    ) {

    }
}
