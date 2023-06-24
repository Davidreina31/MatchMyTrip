import { ProfileDTO } from "./ProfileDTO";

export class ConversationDTO {
    public id: string;
    public profileConnectedId: string;
    public profileChatId: string;
    public profileChat: ProfileDTO;
}
