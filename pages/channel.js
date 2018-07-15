import 'isomorphic-fetch'

//import Error from 'next/error'
import Error from './_error'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastListWithClick from '../components/PodcastListWithClick'
import PodcastPlayer from '../components/PodcastPlayer'

export default class extends React.Component{

  state = {
    openPodcast: null
  }

  static async getInitialProps({ query, res }){
    let idChannel = query.id

    try{
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ])

      if (reqChannel.status >= 400){
        res.statusCode = reqChannel.status
        return { channel: null, audioClips: null, series:null, statusCode: reqChannel.status }
      }

      let [dataChannel, dataSeries, dataAudios] = await Promise.all([
        reqChannel.json(),
        reqSeries.json(),
        reqAudios.json()
      ])
      
      let channel = dataChannel.body.channel
      let series = dataSeries.body.channels
      let audioClips = dataAudios.body.audio_clips

      return { channel, audioClips, series, statusCode: 200 }
    } catch(e){
      res.statusCode = 503
      return { channel: null, audioClips: null, series:null, statusCode: 503 }
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }
  closePodcast = (event) => {
    event.preventDefault()
    this.setState({
      openPodcast: null
    })
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props
    const { openPodcast } = this.state

    if(statusCode !== 200){
      return <Error statusCode={ statusCode }/>
    }

    return (
      <Layout title={ channel.title }>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        
        { 
          openPodcast && 
          <div className="modal">
            <PodcastPlayer 
              clip={ openPodcast }
              onClose={ this.closePodcast }
            />
          </div> 
        }

        <h1>{ channel.title }</h1>
        {
          series.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={ series }/>
          </div>
        }

        <h2>Útlimos Podcasts</h2>
        
        <PodcastListWithClick 
          podcasts={ audioClips } 
          onClickPodcast={ this.openPodcast }
        />
        

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
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
          }
        `}</style>

      </Layout>
    );
  }
}