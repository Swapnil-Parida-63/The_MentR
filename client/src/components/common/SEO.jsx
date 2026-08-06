import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SEO } from '../../config/seo.config';

/**
 * Reusable SEO component for managing dynamic document metadata across routes.
 * Uses react-helmet-async for thread-safe head element manipulation.
 */
export default function SEO({
  title,
  description,
  canonical,
  path,
  robots,
  keywords,
  ogType = 'website',
  ogImage,
  twitterCard = 'summary_large_image',
  schema,
  children
}) {
  const location = useLocation();

  // Resolve values with sensible defaults
  const pageTitle = title || DEFAULT_SEO.defaultTitle;
  const pageDescription = description || DEFAULT_SEO.defaultDescription;
  const pageKeywords = keywords || DEFAULT_SEO.defaultKeywords;
  const pageRobots = robots || DEFAULT_SEO.defaultRobots;
  const pageImage = ogImage || DEFAULT_SEO.defaultImage;

  // Resolve canonical URL
  const currentPath = path || canonical || location.pathname;
  const canonicalUrl = currentPath.startsWith('http')
    ? currentPath
    : `${DEFAULT_SEO.baseUrl}${currentPath === '/' ? '' : currentPath}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {pageKeywords && <meta name="keywords" content={pageKeywords} />}
      <meta name="robots" content={pageRobots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {DEFAULT_SEO.twitterHandle && (
        <meta name="twitter:site" content={DEFAULT_SEO.twitterHandle} />
      )}

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}

      {children}
    </Helmet>
  );
}
