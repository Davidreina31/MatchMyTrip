import { ProfileDTO } from "./ProfileDTO";

export class MessagesDTO {
    public id: string;
    public messageText: string;
    public conversationId: string;
    public profileSenderId: string;
    public profileSender: ProfileDTO;
}
