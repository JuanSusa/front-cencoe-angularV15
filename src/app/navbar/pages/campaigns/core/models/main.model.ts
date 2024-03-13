export class Campaign {
    campaignId!: number | null;
    campaignName: string = '';
    campaignStartDate!: Date;
    campaignEndDate!: Date;
    campaignObservations: string = '';
    campaignState: string = '';
}