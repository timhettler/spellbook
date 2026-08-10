import React from 'react';
import Helmet from 'react-helmet';

import { SITE } from 'constants/site';

function SEO({
  lang = 'en',
  meta = [],
  description = SITE.description,
  title = SITE.title,
}) {
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

export default SEO;
