import { Seasons } from "../enums/Seasons.enum";
import { ActivityDTO } from "./ActivityDTO";
import { Journey_ActivityDTO } from "./Journey_ActivityDTO";

export class JourneyDTO {
    public id: string;
    public destination: string;
    public nbrOfDays: number;
    public seasons: Seasons;
    public profileId: string;
    public journey_Activities: Journey_ActivityDTO[];
}
