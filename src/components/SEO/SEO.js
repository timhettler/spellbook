import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { SITE } from '../../constants/site';

function SEO({ description, lang, meta, title }) {
  const metaDescription = description;
  const titleTemplate = title !== SITE.title ? `%s | ${SITE.title}` : null;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: SITE.description,
  title: SITE.title,
};

export const SEOProps = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
};

SEO.propTypes = SEOProps;

export default SEO;
