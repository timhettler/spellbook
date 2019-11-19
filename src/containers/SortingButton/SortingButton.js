import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSorting } from '../../actions';
import Button from '../../components/Button';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setSorting({ field: ownProps.field }));
  },
});

const SortingButton = ({ field, ...rest }) => (
  <Button className="sorting-button" {...rest} />
);

SortingButton.propTypes = {
  field: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingButton);
