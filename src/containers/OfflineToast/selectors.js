import { createSelector } from 'reselect';

const selectBannerState = (state) => state.banner;

export const selectBanner = createSelector(
  [selectBannerState],
  (banner) => banner
);
