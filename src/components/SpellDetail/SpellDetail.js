// @flow

import React, { Fragment, Component } from 'react';

import {
  ARCHETYPES,
  CIRCLES,
  CLASSES,
  DOMAINS,
  OATHS,
  PATRONS,
  SCHOOLS,
  SUBCLASSES,
} from 'data';

import getSpellLevel from 'utilities/getSpellLevel';
import getHyperlinkedString from 'utilities/getHyperlinkedString';
import PropIcon from 'components/PropIcon';
import VisuallyHidden from 'components/VisuallyHidden';

import './SpellDetail.scss';

const parentClass = {
  archetypes: 'Ranger',
  domains: 'Cleric',
  circles: 'Druid',
  oaths: 'Paladin',
  patrons: 'Warlock',
};

function getAvailableClasses(classes, subclasses) {
  let availableClasses = [].concat(classes);

  SUBCLASSES.forEach(subclass => {
    if (subclasses[subclass]) {
      availableClasses = availableClasses.concat(
        subclasses[subclass].map(type => `${parentClass[subclass]}: ${type}`)
      );
    }
  });

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

type Props = {
  id: string,
  name: string,
  desc: string,
  page: string,
  higher_level: ?string,
  range: string,
  components: Array<'V' | 'S' | 'M'>,
  material: string,
  cost: boolean,
  ritual: boolean,
  duration: string,
  concentration: boolean,
  casting_time: string,
  casting_time_modifier: ?string,
  level: number,
  school: $Values<SCHOOLS>,
  classes: Array<$Values<CLASSES>>,
  archetypes: Array<$Values<ARCHETYPES>>,
  domains: Array<$Values<DOMAINS>>,
  circles: Array<$Values<CIRCLES>>,
  oaths: Array<$Values<OATHS>>,
  patrons: Array<$Values<PATRONS>>,
  onClose: Function,
};

type State = {
  canScroll: ?boolean,
};

class Spell extends Component<Props, State> {
  state = {
    canScroll: null,
  };
  description: ?HTMLElement;

  componentDidMount() {
    this.setCanScroll(this.description.current);
    //this.container.current.focus({ preventScroll: true });
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    if (prevProps.id !== this.props.id) {
      return true;
    }

    return null;
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: ?boolean) {
    if (snapshot === null) {
      return;
    }

    this.setCanScroll(this.description.current);
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

    const { canScroll } = this.state;

    return (
      <article className="spell" tabIndex="-1" aria-live="polite">
        <div className="spell__container">
          <header className="spell-section spell-section--with-padding">
            <div className="spell-header">
              <div className="spell-header__section">
                <h1 className="spell__heading">{name}</h1>
                <div className="spell-category">
                  <span className="spell-level-school">{`${getSpellLevel(
                    level
                  )} ${school}`}</span>{' '}
                  {higher_level && <PropIcon type="higher_level" />}
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
            ref={description => (this.description = description)}
            className="spell-section spell-section--content spell-section--with-padding spell-section--scroll"
            role="group"
            aria-labelledby="description"
            tabIndex={canScroll ? 0 : null}
            data-can-scroll={canScroll ? true : null}
          >
            <h2 className="spell__subheading" id="description">
              Description
            </h2>
            <div
              className="spell__description content-area"
              dangerouslySetInnerHTML={{ __html: getHyperlinkedString(desc) }}
            />
            {higher_level && (
              <div className="spell__description">
                <h3 className="spell__minor-heading">At Higher Levels</h3>
                <div
                  className="content-area"
                  dangerouslySetInnerHTML={{
                    __html: getHyperlinkedString(higher_level),
                  }}
                />
              </div>
            )}
            <div className="spell__page spell__minor-info content-area">
              <small>
                <i>({page})</i>
              </small>
            </div>
          </section>
          <section className="spell-section spell-section--content spell-section--with-padding">
            <h2 className="spell__subheading">Available To</h2>
            <div className="spell__minor-info content-area">
              <p>
                {getAvailableClasses(classes, {
                  archetypes,
                  domains,
                  circles,
                  oaths,
                  patrons,
                })}
              </p>
            </div>
          </section>
          {(material || casting_time_modifier) && (
            <footer className="spell-section spell-section--content spell-section--with-padding">
              {material && (
                <Fragment>
                  <h2 className="spell__subheading" id="material">
                    Material {cost && <PropIcon type="cost" />}
                  </h2>
                  <div className="spell__minor-info content-area">
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

export default Spell;
