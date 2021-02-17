import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document<{ isProduction: boolean }> {
  static async getInitialProps(ctx) {
    // for applying styled-components server-side as per
    // stackoverflow.com/a/59672654/1895436
    // (https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.js)
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        isProduction: process.env.NODE_ENV === 'production',
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    // const { isProduction } = this.props;

    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
