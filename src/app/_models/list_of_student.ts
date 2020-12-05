import {Course} from './course';
export interface UserMyList {
    user: number;
    is_professor: boolean;
    token: string;
    courses: Array<Course>;
    username:String;
}