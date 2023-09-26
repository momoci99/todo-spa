import NotoSansKR_100_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-100.woff2";
import NotoSansKR_200_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-200.woff2";
import NotoSansKR_300_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-300.woff2";
import NotoSansKR_500_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-500.woff2";
import NotoSansKR_600_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-600.woff2";
import NotoSansKR_700_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-700.woff2";
import NotoSansKR_800_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-800.woff2";
import NotoSansKR_900_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-900.woff2";
import NotoSansKR_Regular_WOFF2 from "@src/fonts/noto-sans-kr-v36-latin-regular.woff2";
import { css } from "styled-components";

const GlobalFontStyle = css`
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 100;
    src: url(${NotoSansKR_100_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 200;
    src: url(${NotoSansKR_200_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 300;
    src: url(${NotoSansKR_300_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    src: url(${NotoSansKR_Regular_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    src: url(${NotoSansKR_500_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 600;
    src: url(${NotoSansKR_600_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    src: url(${NotoSansKR_700_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 800;
    src: url(${NotoSansKR_800_WOFF2}) format("woff2");
  }
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 900;
    src: url(${NotoSansKR_900_WOFF2}) format("woff2");
  }
`;

export default GlobalFontStyle;
