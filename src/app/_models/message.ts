export interface Message {
    id:number;
    sent:string;
    message:string;
    to:string;
    course:number;
    by:number;
    read_by:Array<number>;
}