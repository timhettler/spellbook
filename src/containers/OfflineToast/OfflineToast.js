import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectBanner } from './selectors';
import { OUTDATED_CONTENT, OFFLINE_READY } from '../../constants/offline';
import Toast from '../../components/Toast';

function getOfflineLabel(banner) {
  switch (banner) {
    case OUTDATED_CONTENT:
      return 'An update is available. Tap to refresh.';
    case OFFLINE_READY:
      return 'Caching complete! This app will now work offline.';
    default:
      return '';
  }
}

function getOfflineEvent(banner) {
  switch (banner) {
    case OUTDATED_CONTENT:
      return () => window.location.reload(true);
    default:
      return null;
  }
}

const OfflineToast = props => {
  const [active, setActive] = useState(false);
  const banner = useSelector(selectBanner);

  useEffect(() => {
    let timeout;
    setActive(!!banner);

    if (banner === OFFLINE_READY) {
      timeout = setTimeout(() => {
        setActive(false);
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [banner]);

  return (
    <Toast
      label={getOfflineLabel(banner)}
      active={active}
      onClick={getOfflineEvent(banner)}
      {...props}
    />
  );
};

export default OfflineToast;
