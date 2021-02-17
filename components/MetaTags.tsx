import React from 'react';
import Head from 'next/head';

const Config = {
  DOMAIN: 'https://nodebook.io',
  NAME: 'Nodebook',
  TWITTER: '@nodebook_io',
  DESCRIPTION: 'Digital whiteboards',
  LOGO: '/logo.png',
};

const MetaTags: React.FC<{
  title?: string;
  url?: string;
  rawTitle?: boolean
  description?: string;
  image?: string;
  bigImage?: boolean;
}> = ({ title, url = '', description = Config.DESCRIPTION, image = Config.LOGO, bigImage, rawTitle, children }) => {
  const fullTitle = title ? (rawTitle ? title : `${title} - Nodebook`) : Config.NAME;
  const fullUrl = `${Config.DOMAIN}${url}`;
  const fullImage = `${Config.DOMAIN}${image}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={Config.NAME} />

      {/* twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:card" content={bigImage === true ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:site" content={Config.TWITTER} />
      <meta name="twitter:creator" content={Config.TWITTER} />

      {/* the rest of provided meta-tags */}
      {children}
    </Head>
  );
};

export default MetaTags;
