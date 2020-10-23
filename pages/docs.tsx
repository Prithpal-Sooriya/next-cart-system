import Head from 'next/head'

const Docs: React.FC = () => (
  <div>
    <Head>
      <script type="text/javascript" src="/build/bundle.js"></script>
    </Head>
    <div id="rsg-root"></div>
  </div>
)

export default Docs
