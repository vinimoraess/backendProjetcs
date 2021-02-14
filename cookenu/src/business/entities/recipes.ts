export class Recipes {
    constructor(
        public readonly id: string,
        public readonly title:string,
        public readonly description: string,
        public readonly createdAt: string,
        public readonly user_id: string
    ){}    
}

export interface inputRecipesDTO {
    title:string,
    description:string
}