import { Post } from "./PostInterface";
import { User } from "./UserInterface";

export interface UserDisplayInterface {
    users: User[],
    postFetch: (id: number) => Promise<Post[]>
}