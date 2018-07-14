import Link from 'next/link'

import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastList from '../components/PodcastList'

export default class extends React.Component{

  static async getInitialProps({ query }){
    let idChannel = query.id

    let [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
    ])

    let [dataChannel, dataSeries, dataAudios] = await Promise.all([
      reqChannel.json(),
      reqSeries.json(),
      reqAudios.json()
    ])
    
    let channel = dataChannel.body.channel
    let series = dataSeries.body.channels
    let audioClips = dataAudios.body.audio_clips

    return { channel, audioClips, series }
  }

  render() {
    const { channel, audioClips, series } = this.props
    return (
      <Layout title={ channel.title }>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        
        <h1>{ channel.title }</h1>
        {
          series.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={ series }/>
          </div>
        }

        <h2>Útlimos Podcasts</h2>
        <PodcastList podcasts={ audioClips }/>
        

        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          h1{
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>

      </Layout>
    );
  }
}