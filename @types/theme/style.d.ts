export type Colors =
  | "white"
  | "black"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "textColor"
  | "lightGray";

export type FontWeights = "light" | "regular" | "medium" | "semiBold" | "bold";

export type Alignments = "left" | "center" | "right";

export type Spaces = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";

export type AlignItems = "center" | "flex-start" | "flex-end";

export type JustifyContent =
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "center"
  | "flex-start"
  | "flex-end";

export type FontSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export type TextAlign = "left" | "center" | "right";

export type Boolean = true | false | undefined;

type SpaceTypes = {
  top?: Spaces;
  bottom?: Spaces;
  left?: Spaces;
  right?: Spaces;
};

export type PaddingTypes = {
  xs?: SpaceTypes;
  sm?: SpaceTypes;
  md?: SpaceTypes;
  lg?: SpaceTypes;
  xl?: SpaceTypes;
};

export type MarginTypes = {
  xs?: SpaceTypes;
  sm?: SpaceTypes;
  md?: SpaceTypes;
  lg?: SpaceTypes;
  xl?: SpaceTypes;
};
