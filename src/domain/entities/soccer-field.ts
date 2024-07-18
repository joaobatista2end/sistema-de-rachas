export type SoccerFieldParams = {
  id: string;
  rentalValue: number;
  pixKey: string;
};

export class SoccerField {
  id: string;
  rentalValue: number;
  pixKey: string;

  public constructor(params: SoccerFieldParams) {
    this.id = params.id;
    this.rentalValue = params.rentalValue;
    this.pixKey = params.pixKey;
  }

  public get availableTimes(): any {
    return [];
  }
}
