
import { type BaseSchema } from "../../app/common/dto/base.dto";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        active?: boolean;
        role: "USER" | "ADMIN";
        password: string;
        refToken:string;
        subscription:boolean;
}
