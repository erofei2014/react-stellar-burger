import { RootState } from "../types";

export const getWsConnection = (store: RootState) => store.wsConnection;