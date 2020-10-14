import {Course} from './course';
export interface UserMy {
    user: number;
    is_professor: boolean;
    token: string;
    courses: Array<Course>;
}
