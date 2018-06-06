import React from 'react';
import { connect } from 'react-redux';

import { setSorting } from '../../actions';
import Button from '../../components/Button';

import './SortingButton.css';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setSorting({ field: ownProps.field }));
  },
});

const SortingButton = props => <Button className="sorting-button" {...props} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortingButton);
