import { Seasons } from "../enums/Seasons.enum";

export class JourneyDTO {
    public id: string;
    public destination: string;
    public nbtOfDays: string;
    public seasons: Seasons;
    public profileId: string;
}
