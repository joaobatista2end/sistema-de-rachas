export type SoccerFieldParams = {
  rentalValue: number;
  pixKey: string;
};

export class SoccerField {
  rentalValue: number;
  pixKey: string;

  public constructor(params: SoccerFieldParams) {
    this.rentalValue = params.rentalValue;
    this.pixKey = params.pixKey;
  }

  public get availableTimes(): any {
    return [];
  }
}
