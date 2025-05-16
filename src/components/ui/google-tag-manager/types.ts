declare global {
  interface Window {
    dataLayer: any[];
  }
}

export interface GTMEvent {
  event: string;
  [key: string]: any;
}

export interface GoogleTagManagerProps {
  gtmId: string;
}