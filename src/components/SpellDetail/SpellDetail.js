import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import {
  ARCHETYPES,
  CIRCLES,
  CLASSES,
  DOMAINS,
  OATHS,
  PATRONS,
  SCHOOLS,
} from '../../data';

import setTabIndex from '../../utilities/setTabIndex';
import getSpellLevel from '../../utilities/getSpellLevel';
import PropIcon from '../PropIcon';
import VisuallyHidden from '../VisuallyHidden';

import './SpellDetail.scss';

function getAvailableClasses(
  classes,
  archetypes,
  domains,
  circles,
  oaths,
  patrons
) {
  let availableClasses = [].concat(classes);

  if (archetypes) {
    availableClasses.push(`Ranger: ${archetypes.join(', ')}`);
  }

  if (domains) {
    availableClasses.push(`Cleric: ${domains.join(', ')}`);
  }

  if (circles) {
    availableClasses.push(`Druid: Circle of the Land (${circles.join(', ')})`);
  }

  if (oaths) {
    availableClasses.push(`Paladin: ${oaths.join(', ')}`);
  }

  if (patrons) {
    availableClasses.push(`Warlock: ${patrons.join(', ')}`);
  }

  return availableClasses.sort().join(', ');
}

function _renderSpellComponents(components, material) {
  return (
    <Fragment>
      <span className="spell-components">
        {components.map(c => {
          let desc = '';

          switch (c.toLowerCase()) {
            case 'v':
              desc = 'Verbal';
              break;
            case 's':
              desc = 'Somatic';
              break;
            case 'm':
              desc = 'Material';
              break;
            default:
              desc = '';
              break;
          }

          return (
            <abbr key={c} title={desc}>
              {c}
            </abbr>
          );
        })}
        {material && (
          <a href="#material">
            <span role="presentation">*</span>
            <VisuallyHidden>Material components</VisuallyHidden>
          </a>
        )}
      </span>
    </Fragment>
  );
}

function _renderCastingTime(time, modifier) {
  return (
    <Fragment>
      {time}
      {modifier && (
        <a href="#casting_condition">
          <span role="presentation">*</span>
          <VisuallyHidden>Casting condition</VisuallyHidden>
        </a>
      )}
    </Fragment>
  );
}

class Spell extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
    this.description = React.createRef();
    this.setTabIndex = setTabIndex.bind(this);
  }

  componentDidMount() {
    this.setTabIndex(this.description.current);
    //this.container.current.focus({ preventScroll: true });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      return true;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === null) {
      return;
    }

    this.setTabIndex(this.description.current);
    //this.container.current.focus({ preventScroll: true });
  }

  render() {
    const {
      name,
      desc,
      page,
      higher_level,
      range,
      components,
      material,
      cost,
      ritual,
      duration,
      concentration,
      casting_time,
      casting_time_modifier,
      level,
      school,
      classes,
      archetypes,
      domains,
      circles,
      oaths,
      patrons,
      onClose,
    } = this.props;

    return (
      <article ref={this.container} className="spell" tabIndex="-1">
        <div className="spell__container">
          <header className="spell-section spell-section--with-padding">
            <div className="spell-header">
              <div className="spell-header__section">
                <h1 className="spell__heading">{name}</h1>
                <div className="spell-category">
                  {`${getSpellLevel(level)} ${school}`}
                </div>
              </div>
              <div className="spell-header__section spell-header__section--cta">
                <button className="spell-close-button" onClick={onClose}>
                  <span role="presentation">×</span>
                  <VisuallyHidden>Return to Spell List</VisuallyHidden>
                </button>
              </div>
            </div>
          </header>
          <section className="spell-section">
            <div className="spell-detail">
              <div className="spell-detail__item">
                <h3 className="spell-detail__heading">Casting Time</h3>
                <div className="spell-detail__value">
                  {_renderCastingTime(casting_time, casting_time_modifier)}
                  {ritual && (
                    <span className="spell-detail__icon">
                      <PropIcon type="ritual" />
                    </span>
                  )}
                </div>
              </div>
              <div className="spell-detail__item">
                <h3 className="spell-detail__heading">Range</h3>
                <div className="spell-detail__value">{range}</div>
              </div>
              <div className="spell-detail__item">
                <h3 className="spell-detail__heading">Components</h3>
                <div className="spell-detail__value">
                  {_renderSpellComponents(components, material)}
                </div>
              </div>
              <div className="spell-detail__item">
                <h3 className="spell-detail__heading">Duration</h3>
                <div className="spell-detail__value">
                  {duration}
                  {concentration && (
                    <span className="spell-detail__icon">
                      <PropIcon type="concentration" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section
            ref={this.description}
            className="spell-section spell-section--content spell-section--with-padding spell-section--scroll"
            role="group"
            aria-labelledby="description"
          >
            <h2 className="spell__subheading" id="description">
              Description
            </h2>
            <div
              className="spell__description content-area"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
            {higher_level && (
              <div className="spell__description">
                <h3 className="spell__minor-heading">At Higher Levels.</h3>
                <div
                  className="content-area"
                  dangerouslySetInnerHTML={{ __html: higher_level }}
                />
              </div>
            )}
            <div className="spell__page spell__minor-info">
              <i>({page})</i>
            </div>
          </section>
          <section className="spell-section spell-section--content spell-section--with-padding">
            <h2 className="spell__subheading">Available To</h2>
            <div>
              {getAvailableClasses(
                classes,
                archetypes,
                domains,
                circles,
                oaths,
                patrons
              )}
            </div>
          </section>
          {(material || casting_time_modifier) && (
            <footer className="spell-section spell-section--content spell-section--with-padding">
              {material && (
                <Fragment>
                  <h2 className="spell__subheading" id="material">
                    Material {cost && <PropIcon type="cost" />}
                  </h2>
                  <div className="spell__minor-info">
                    <i>{material}</i>
                  </div>
                </Fragment>
              )}
              {casting_time_modifier && (
                <Fragment>
                  <h2 className="spell__subheading" id="casting_condition">
                    Casting Condition
                  </h2>
                  <div className="spell__minor-info">
                    <i>{casting_time_modifier}</i>
                  </div>
                </Fragment>
              )}
            </footer>
          )}
        </div>
      </article>
    );
  }
}

Spell.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  higher_level: PropTypes.string,
  range: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.oneOf(['V', 'S', 'M'])).isRequired,
  material: PropTypes.string,
  cost: PropTypes.bool,
  ritual: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  concentration: PropTypes.bool.isRequired,
  casting_time: PropTypes.string.isRequired,
  casting_time_modifier: PropTypes.string,
  level: PropTypes.number.isRequired,
  school: PropTypes.oneOf(SCHOOLS).isRequired,
  classes: PropTypes.arrayOf(PropTypes.oneOf(CLASSES)).isRequired,
  archetypes: PropTypes.arrayOf(PropTypes.oneOf(ARCHETYPES)),
  domains: PropTypes.arrayOf(PropTypes.oneOf(DOMAINS)),
  circles: PropTypes.arrayOf(PropTypes.oneOf(CIRCLES)),
  oaths: PropTypes.arrayOf(PropTypes.oneOf(OATHS)),
  patrons: PropTypes.arrayOf(PropTypes.oneOf(PATRONS)),
  onClose: PropTypes.func.isRequired,
};

export default Spell;
