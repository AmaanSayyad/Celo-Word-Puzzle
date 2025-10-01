import { http } from "viem";
import {celo} from "viem/chains";

export const chainArray = [celo];
export const transportsObject = {
  [celo.id]: http()
};
