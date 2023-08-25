import env from 'app/config/env';

const footer = {
  downloadApp: {
    title: env.APP_NAME,
    description: 'Get the full experience on the app'
  },
  col1: {
    logoAlt: 'Expitra',
    text: 'Building the future of social travel and experiences.'
  },
  col2: {
    title: 'Misson',
    text: 'Bringing people together to share and create memorable experiences.'
  },
  col3: {
    title: 'Contact Us',
    link: 'admin@expitra.com'
  },
  col4: {
    title: 'Socials',
    links: [
      {
        id: 0,
        name: 'Instagram',
        url: 'https://instagram.com/expitrahq?igshid=YmMyMTA2M2Y='
      },
      { id: 1, name: 'Twitter', url: 'https://twitter.com/Expitra' },
      {
        id: 2,
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/expitrahq'
      }
    ]
  }
};
export default footer;
