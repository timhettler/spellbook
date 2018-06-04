import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { CIRCLES, CLASSES, DOMAINS, OATHS, PATRONS, SCHOOLS } from '../../data';

import getSpellLevel from '../../utilities/getSpellLevel';
import yesNo from '../../utilities/yesNo';

function getAvailableClasses(classes, domains, circles, oaths, patrons) {
  let availableClasses = [].concat(classes);

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

function _renderComponents(components, material) {
  return (
    <Fragment>
      <span>
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
      </span>
      {material && <a href="#material">*</a>}
    </Fragment>
  );
}

function _renderCastingTime(time, modifier) {
  return (
    <div>
      {time}
      {modifier && <a href="#casting_condition">*</a>}
    </div>
  )
}

const Spell = (props) => {
  const {
    name,
    desc,
    higher_level,
    range,
    components,
    material,
    ritual,
    duration,
    concentration,
    casting_time,
    casting_time_modifier,
    level,
    school,
    classes,
    domains,
    circles,
    oaths,
    patrons,
  } = props;

  return (
    <article>
      <header>
        <h1>{name}</h1>
        <div>{`${getSpellLevel(level)} ${school}`}</div>
      </header>
      <section>
        <h2>Stats</h2>
        <div>
          <h3>Casting Time</h3>
          <div>{_renderCastingTime(casting_time, casting_time_modifier)}</div>
        </div>
        <div>
          <h3>Range</h3>
          <div>{range}</div>
        </div>
        <div>
          <h3>Components</h3>
          <div>{_renderComponents(components, material)}</div>
        </div>
        <div>
          <h3>Duration</h3>
          <div>{duration}</div>
        </div>
      </section>
      <section>
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{ __html: desc }} />
        {higher_level && (
          <Fragment>
            <h3>At Higher Levels</h3>
            <div dangerouslySetInnerHTML={{ __html: higher_level }} />
          </Fragment>
        )}
      </section>
      <section>
        <div>
          <h3>Concentration</h3>
          <div>{yesNo(concentration)}</div>
        </div>
        <div>
          <h3>Ritual</h3>
          <div>{yesNo(ritual)}</div>
        </div>
      </section>
      <section>
        <h2>Available To</h2>
        <div>
          {getAvailableClasses(classes, domains, circles, oaths, patrons)}
        </div>
      </section>
      <footer>
        {material && (
          <Fragment>
            <h2 id="material">Material</h2>
            <div>
              <i>{material}</i>
            </div>
          </Fragment>
        )}
        {casting_time_modifier && (
          <Fragment>
            <h2 id="casting_condition">Casting Condition</h2>
            <div>
              <i>{casting_time_modifier}</i>
            </div>
          </Fragment>
        )}
      </footer>
    </article>
  );
};

Spell.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  higher_level: PropTypes.string,
  range: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.oneOf(['V', 'S', 'M'])).isRequired,
  material: PropTypes.string,
  ritual: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  concentration: PropTypes.bool.isRequired,
  casting_time: PropTypes.string.isRequired,
  casting_time_modifier: PropTypes.string,
  level: PropTypes.number.isRequired,
  school: PropTypes.oneOf(SCHOOLS).isRequired,
  classes: PropTypes.arrayOf(PropTypes.oneOf(CLASSES)).isRequired,
  domains: PropTypes.arrayOf(PropTypes.oneOf(DOMAINS)),
  circles: PropTypes.arrayOf(PropTypes.oneOf(CIRCLES)),
  oaths: PropTypes.arrayOf(PropTypes.oneOf(OATHS)),
  patrons: PropTypes.arrayOf(PropTypes.oneOf(PATRONS)),
};

export default Spell;
