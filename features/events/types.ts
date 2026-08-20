export interface SeasonalEvent {
  id: string;
  name: string;
  startsAt: string;
  endsAt: string;
  offerIds: string[];
  rewardIds: string[];
  artAssetId: string;
}
