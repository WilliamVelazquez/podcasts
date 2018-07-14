export default class extends React.Component {
  render() {
    return <div>
      <h1>¡Hola mundo!</h1>
      <p>Bienvenido al curso</p>

      <img src="/static/platzi-logo.png" alt="Platzi"/>

      <style jsx>{`
        h1{
          color: red;
        }
        p{
          color: green;
        }
        img{
          max-width: 50%;
          display: block;
          margin: 0 auto;
        }
      `}</style>

      <style jsx global>{`
        body{
          background: white;
        }
      `}</style>
    </div>
  }
}