import { Seasons } from "../enums/Seasons.enum";

export class JourneyDTO {
    public id: string;
    public destination: string;
    public nbrOfDays: string;
    public seasons: Seasons;
    public profileId: string;
}
