import { ProfileDTO } from "./ProfileDTO";

export class RequestDTO {
    public id: string;
    public isAccepted: boolean;
    public profileSenderId: string;
    public profileSender: ProfileDTO;
    public profileReceiverId: string;
}
