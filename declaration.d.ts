// declare module '*.module.scss';
// declare module '*.module.css';
import { ethers } from "ethers";
declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

