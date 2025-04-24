// src/store/useStore.ts
import { create } from 'zustand';
import ReactGA from 'react-ga4';

interface AnalyticsState {
  pageView: (path: string) => void;
  event: (category: string, action: string, label?: string) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  pageView: (path: string) => {
    ReactGA.send({ hitType: "pageview", page: path });
  },
  event: (category: string, action: string, label?: string) => {
    ReactGA.event({
      category,
      action,
      label
    });
  }
}));

// 사용 예시:
// const { pageView, event } = useAnalyticsStore();
// pageView('/main');
// event('button', 'click', 'login_button');