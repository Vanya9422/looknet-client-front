export default class {

    static getAnswerNestedLevels(answer){
        if(!answer?.sub_filters && answer?.sub_filters.length === 0) return 0;

        const levels = answer.sub_filters.reduce((accumulator, subfilter) => {
            const subfilterAnswers = subfilter?.answers;
            const current = accumulator + 1
            
            if(!subfilterAnswers || subfilterAnswers.length === 0) return current;

            const levelAnswers = subfilterAnswers.map((answer) => {
                return this.getAnswerNestedLevels(answer)
            })

            const maxLevel = Math.max( ...levelAnswers );
            return current + maxLevel

        }, 0);

        return levels
    }

    static getFilterNestedLevels(answers = []){
        const hierarchyLevels = []

        for (let index = 0; index < answers.length; index++) {
            const answer = answers[index];
            hierarchyLevels[index] = this.getAnswerNestedLevels(answer)
        }

        return hierarchyLevels;
    }
    
}
