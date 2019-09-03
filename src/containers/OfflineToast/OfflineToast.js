import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps(state) {
  return {
    banner: selectBanner(state),
  };
}

const OfflineToast = props => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timeout;
    setActive(!!props.banner);

    if (props.banner === OFFLINE_READY) {
      timeout = setTimeout(() => {
        setActive(false);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [props.banner]);

  const { banner, dispatch, ...rest } = props;

  return (
    <Toast
      label={getOfflineLabel(banner)}
      active={active}
      onClick={getOfflineEvent(banner)}
      {...rest}
    />
  );
};

export default connect(
  mapStateToProps,
  null
)(OfflineToast);
