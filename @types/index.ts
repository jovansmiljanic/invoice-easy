import { Colors } from "./theme/style";

export type { Theme, ThemeContext } from "./theme";
export type { User } from "./users";

// My account types
export type { MyAccount } from "./my-account";
export type { IMyAccountForm } from "./my-account";
export type { IContentValues } from "./my-account";

// Invoice types
export type { Invoice } from "./invoice";
export type { IInvoiceItem } from "./invoice";

// Client types
export type { Client } from "./client";
export type { IClientFormValues } from "./client";

// Product types
export type { Product } from "./product";

export type {
  Breakpoints,
  Alignments,
  Spaces,
  AlignItems,
  JustifyContent,
  FontWeights,
  ColumnSize,
  FontSize,
  Boolean,
  TextAlign,
  PaddingTypes,
  MarginTypes,
  Colors,
} from "./theme/style";

export type TIconList =
  | "toggle-arrow"
  | "toggle-eye"
  | "filter"
  | "search"
  | "copy"
  | "twitter"
  | "linkedin"
  | "facebook"
  | "add"
  | "remove"
  | "language"
  | "trash"
  | "edit"
  | "preview";

export interface IIcon {
  $size?: 1 | 2 | 3;
  $color?: Colors;
  $toggled?: boolean;
}
