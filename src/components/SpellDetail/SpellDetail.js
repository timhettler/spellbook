import { useLayoutEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import gfm from 'remark-gfm';

import { SUBCLASSES } from 'data';

import { modifyScrollContainer } from 'utilities/setCanScroll';
import getSpellLevel from 'utilities/getSpellLevel';
import getHyperlinkedString from 'utilities/getHyperlinkedString';
import { usePrevious } from 'utilities/hooks/usePrevious';

import PropIcon from 'components/PropIcon';
import VisuallyHidden from 'components/VisuallyHidden';

import './SpellDetail.scss';

const parentClass = {
  Specialty: 'Artificer',
  Archetype: 'Ranger',
  Domain: 'Cleric',
  Circle: 'Druid',
  Oath: 'Paladin',
  Patron: 'Warlock',
};

function getAvailableClasses(classes, subclasses) {
  let availableClasses = [].concat(classes);

  SUBCLASSES.forEach((subclass) => {
    if (subclasses[subclass]) {
      availableClasses = availableClasses.concat(
        subclasses[subclass].map((type) => `${parentClass[subclass]}: ${type}`)
      );
    }
  });

  return availableClasses.sort().join(', ');
}

const SpellComponents = ({ components, material }) => (
  <span className="spell-components">
    {components.map((c) => {
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
);

const CastingTime = ({ time, modifier }) => (
  <>
    {time}
    {modifier && (
      <a href="#casting_condition">
        <span role="presentation">*</span>
        <VisuallyHidden>Casting condition</VisuallyHidden>
      </a>
    )}
  </>
);

const SpellDetail = ({
  id,
  name,
  desc,
  source,
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
  Archetype,
  Domain,
  Circle,
  Oath,
  Specialty,
  Patron,
  onClose,
}) => {
  const [canScroll, setCanScroll] = useState(null);
  const description = useRef();
  const prevId = usePrevious(id);

  useLayoutEffect(() => {
    if (id === prevId) {
      return;
    }
    description.current.scrollTop = 0;
    setCanScroll(modifyScrollContainer(description.current));
  }, [id, prevId]);

  const handleShare = async () => {
    try {
      await navigator.share({
        text: `${name}: ${getSpellLevel(level)} ${school.toLowerCase()} spell`,
        url: `/spell/${id}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
              <button className="spell-close-button" onClick={handleShare}>
                ⤴️
              </button>
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
                <CastingTime
                  time={casting_time}
                  modifier={casting_time_modifier}
                />
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
                <SpellComponents components={components} material={material} />
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
          ref={description}
          className="spell-section spell-section--content spell-section--with-padding spell-section--scroll"
          role="group"
          aria-labelledby="description"
          tabIndex={canScroll ? 0 : null}
          data-can-scroll={canScroll ? true : null}
        >
          <h2 className="spell__subheading" id="description">
            Description
          </h2>
          <div className="spell__description content-area">
            <ReactMarkdown
              remarkPlugins={[gfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              children={getHyperlinkedString(desc)}
            />
          </div>
          {higher_level && (
            <div className="spell__description">
              <h3 className="spell__minor-heading">At Higher Levels</h3>
              <div className="content-area">
                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  children={getHyperlinkedString(higher_level)}
                />
              </div>
            </div>
          )}
          {source && (
            <div className="spell__source spell__minor-info content-area">
              <small>
                <i>({source})</i>
              </small>
            </div>
          )}
        </section>
        <section className="spell-section spell-section--content spell-section--with-padding">
          <h2 className="spell__subheading">Available To</h2>
          <div className="spell__minor-info content-area">
            <p>
              {getAvailableClasses(classes, {
                Archetype,
                Domain,
                Circle,
                Oath,
                Specialty,
                Patron,
              })}
            </p>
          </div>
        </section>
        {(material || casting_time_modifier) && (
          <footer className="spell-section spell-section--content spell-section--with-padding">
            {material && (
              <div className="spell-footer-section">
                <h2 className="spell__subheading" id="material">
                  Material {cost && <PropIcon type="cost" />}
                </h2>
                <div className="spell__minor-info content-area">
                  <div className="content-area">
                    <ReactMarkdown
                      remarkPlugins={[gfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      children={material}
                    />
                  </div>
                </div>
              </div>
            )}
            {casting_time_modifier && (
              <div className="spell-footer-section">
                <h2 className="spell__subheading" id="casting_condition">
                  Casting Condition
                </h2>
                <div className="spell__minor-info">
                  <i>{casting_time_modifier}</i>
                </div>
              </div>
            )}
          </footer>
        )}
      </div>
    </article>
  );
};

export default SpellDetail;
