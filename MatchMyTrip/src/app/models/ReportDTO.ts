import { JourneyDTO } from "./JourneyDTO";
import { UserDTO } from "./UserDTO";

export class ReportDTO {
    public id: string;
    public reason: string;
    public reporterUserId: string
    public journeyId: string;
    public reporterUser: UserDTO;
    public journey: JourneyDTO;
}
