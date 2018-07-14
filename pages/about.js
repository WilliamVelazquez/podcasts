export default class extends React.Component{
  render() {
    return (
      <div>
        <img src="/static/platzi-logo.png" alt="Platzi"/>
        <p>Creado por: <strong>William Velázquez</strong></p>
        <a href="https://twitter.com/WilliamVlazquez">@WilliamVlazquez</a>

        <style jsx>{`
          div{
            text-align: center;
            color: white;
            font-size: 18px;            
            margin: 50px 0px;
          }
          a{
            color: white;
            text-decoration: none;
          }
          img{
            max-width: 50%;
            display: block;
            padding: 20px;
            margin: 0 auto;
          }
        `}</style>
        <style jsx global>{`
          body{
            background: #192B34;
          }
        `}</style>
      </div>
    );
  }
}