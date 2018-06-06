import React from 'react';
import { shallow } from 'enzyme';
import VisuallyHidden from './VisuallyHidden';

it('renders with required props', () => {
  shallow(<VisuallyHidden>FOO</VisuallyHidden>);
});
