import "styled-components";
import { ColorsTypes, FontSizeTypes, FontWeightsTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSizes: FontSizeTypes;
    fontWeights: FontWeightsTypes;
  }
}
