import Link from 'next/link'
import Head from 'next/head'

export default class Layout extends React.Component{
  render() {
    const { children, title } = this.props

    return (
      <div>

        <Head>
          <title>{ title || "Podcasts" }</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <header><Link href="/"><a>Podcasts</a></Link></header>

        { children }

        <style jsx>{`
          header{
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }
          header a{
            color: #fff;
            text-decoration: none;
          }
        `}</style>

        <style jsx global>{`
          body{
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}</style>

      </div>
    );
  }
}