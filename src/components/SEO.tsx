import { DefaultSeo } from 'next-seo'

const config = {
  title: 'Awesome Notion',
  description:
    'A curated list of awesome Notion websites, resources, tools,... and more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://awesomenotion.space',
    site_name: 'Awesome Notion',
    images: [
      {
        url: 'https://i.imgur.com/WOOt6jf.png',
        alt: 'Awesome Notion',
      },
    ],
  },
}

const SEO = () => <DefaultSeo {...config} defaultTitle="Awesome Notion" />

export default SEO
