import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from '../../utilities/uuidv4';
import getIcon from '../../utilities/getIcon';

import VisuallyHidden from '../VisuallyHidden';

import './PropIcon.scss';

const label = {
  ritual: 'Can be cast as a ritual',
  concentration: 'Requires concentration',
  cost: 'Has a material cost',
};

export default class PropIcon extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: uuidv4(),
    };
  }

  render() {
    const { type } = this.props;
    const id = uuidv4();

    return (
      <div className="prop-icon">
        <span aria-hidden={true}>
          <span title={label[type]}>{getIcon[type]}</span>
        </span>
        <VisuallyHidden id={id}>{label[type]}</VisuallyHidden>
      </div>
    );
  }
}

PropIcon.propTypes = {
  type: PropTypes.oneOf(['ritual', 'concentration', 'cost']).isRequired,
};
