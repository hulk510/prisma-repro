export default {
  logo: <span>Monorepo-template Docs</span>,
  project: {
    link: 'https://github.com/hulk510/monorepo-template',
  },
  docsRepositoryBase: 'https://github.com/hulk510/monorepo-template',
  feedback: {
    labels: 'documentation',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Monorepo-template Docs',
    }
  },
  toc: {
    backToTop: true,
    title: '目次',
  },
  head: (
    <>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
      <meta property='og:title' content='Monorepo-template Docs' />
      <meta
        property='og:description'
        content='Documentation for Monorepo-template, a Next.js-based static site generator.'
      />
    </>
  ),
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a
          href='https://github.com/hulk510'
          target='_blank'
          rel='noreferrer'
        >
          Created by @hulk510
        </a>
        . Powered by{' '}
        <a
          href='https://nextra.site'
          target='_blank'
          rel='noreferrer'
        >
          Nextra
        </a>
      </span>
    ),
  },
}
