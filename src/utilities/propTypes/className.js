import PropTypes from 'prop-types';

export const classNamePropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
  PropTypes.arrayOf(PropTypes.string),
]);

export default classNamePropTypes;
