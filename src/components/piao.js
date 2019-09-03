import React, { Component } from 'react'
import axios from 'axios'
import PiaoMusic from '../assets/piao-da-casa-propria-soundtrack.mp3'
import BemBolada from '../assets/bem-bolada.mp3'

class Piao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rodando: false,
      frase: 'Onde almoçar?',
      preco: '...',
      nota: '...'
    };

    this.audio = new Audio(PiaoMusic);
    this.audioFim = new Audio(BemBolada);
  }

  /* animation and audio */
  runPiao = () => {
    this.togglePlay()
    if(!this.state.rodando) {
      setTimeout(
        ()=> {
          this.audio.volume = .4
          this.audioFim.play()
          this.genRestaurant()
        }, 10000
      )
    } else {
      this.audio.volume = 1
    }
  }
  togglePlay = () => {
    this.setState({
      rodando: !this.state.rodando
    },() => {
      this.state.rodando ? this.audio.play() : this.audio.pause();
    });
  }

  /* generate restaurant */
  genRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  changeRestaurant = event => {
    const length = this.todasFrases.length;
    let data = this.todasFrases[this.genRandomNumber(0, length)];
    this.setState({
      frase: data.restaurante,
      preco: data.preco,
      nota: data.nota
    });
  }
  genRestaurant = async () => {
    this.todasFrases = await axios.get('restaurantes.json')
      .then( res => {
        return res.data.map(frases => frases);
      });
    const length = this.todasFrases.length;
    let data = this.todasFrases[this.genRandomNumber(0, length)];
    console.log(data.restaurante);
    this.setState({
      frase: data.restaurante,
      preco: data.preco,
      nota: data.nota
    });
  }

/*  fadeOut = () => {
    let vol = 0.20,
        interval = 200; 
    setInterval(
    function() {
      if (vol > 0) {
        vol -= 0.05;
        this.audio.volume = vol;
      }
      else {
        clearInterval(this.fadeOut);
      }
    }, interval);
  }*/

  render() {
    return (
      <div className="container">
        <button onClick={this.runPiao} className="button">
          Tô co fome
        </button>
        <div id="wrapper">
          <div id="moldura">
            <div id="piao" className={this.state.rodando ? 'rodandoRapido' : ''}>
              <div className="numero um">1</div>
              <div className="numero dois">2</div>
              <div className="numero tres">3</div>
              <div className="numero quatro">4</div>
              <div className="numero cinco">5</div>
              <div className="numero seis">6</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Piao;