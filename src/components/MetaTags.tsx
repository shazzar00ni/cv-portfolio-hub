
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  type?: string;
}

const MetaTags = ({
  title = "Shannon Lockett | Web Development & Retail Management Portfolio",
  description = "Shannon Lockett's professional portfolio showcasing retail management expertise, web development projects, and published articles on technology and business.",
  keywords = "Shannon Lockett, Web Developer, Retail Management, Portfolio",
  imageUrl = "/og-image.png",
  type = "website"
}: MetaTagsProps) => {
  const siteUrl = "https://shannon-lockett.com";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default MetaTags;
