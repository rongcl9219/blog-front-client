export interface TocItem {
  text: string;
  level: number;
  index: number;
  children?: Array<TocItem>;
}
