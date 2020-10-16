import {Course} from './course';
export interface UserToken {
    user: number;
    is_professor: boolean;
    token: string;
    courses: Array<Course>;
    token_form:string;
}
