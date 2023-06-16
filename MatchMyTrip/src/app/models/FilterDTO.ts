import { Seasons } from "../enums/Seasons.enum";

export class FilterDTO {
    public id: string;
    public destination: string;
    public nbtOfDays: string;
    public seasons: Seasons;
}
