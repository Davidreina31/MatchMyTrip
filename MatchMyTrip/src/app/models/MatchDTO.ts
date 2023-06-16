import { Seasons } from "../enums/Seasons.enum";

export class MatchDTO {
    public id: string;
    public destination: string;
    public nbtOfDays: string;
    public seasons: Seasons;
    public matchScore: number;
    public favorite: boolean;
    public profileId: string;
    public journeyId: string;
}
