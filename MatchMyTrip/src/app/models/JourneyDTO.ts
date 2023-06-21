import { Seasons } from "../enums/Seasons.enum";

export class JourneyDTO {
    public id: string;
    public destination: string;
    public nbrOfDays: number;
    public seasons: Seasons;
    public profileId: string;
}
