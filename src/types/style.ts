export interface PaddingInfo {
  outer: number;
  inner: number;
}
export type RadiusInfo = number;
export type HeightInfo = number;

export interface BoxLayoutInfo {
  padding: PaddingInfo;
  radius: RadiusInfo;
  height: HeightInfo;
}
