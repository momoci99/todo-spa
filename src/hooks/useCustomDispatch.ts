/**!SECTION
 * redux-tool kit의 타입 이슈를 해결하기위해 커스텀 Dispatch추가
 * https://github.com/reduxjs/redux-toolkit/issues/2450
 */

import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store";
export const useAppDispatch = () => useDispatch<AppDispatch>();
