import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { metaMask } from "@wagmi/connectors";
import { createConfig, http } from "@wagmi/core";
import { sepolia } from "viem/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
