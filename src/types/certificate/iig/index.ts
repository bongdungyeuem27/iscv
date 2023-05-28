export type IIIGLR = {
  id: number | undefined;
  employeeId: number | undefined;
  testDate: number | undefined;
  shiftTest: number | undefined;
  expireDate: number | undefined;
  listeningScore: number | undefined;
  readingScore: number | undefined;
  time: number | undefined;
};

export type IIIGSW = {
  id: number | undefined;
  employeeId: number | undefined;
  testDate: number | undefined;
  shiftTest: number | undefined;
  expireDate: number | undefined;
  speakingScore: number | undefined;
  writingScore: number | undefined;
  time: number | undefined;
};

export type IIIG = {
  lr?: IIIGLR;
  sw?: IIIGSW;
};

export enum EIIGRequest {
  LR = "lr",
  SW = "sw",
}
