import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushis: [],
    eaten: [],
    money: 150,
    displayIndex: 0
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then((data) => {
        this.setState({ sushis: data })
      })
  }

  eatThisSushi = (sushi) => {
    const newBalance = this.state.money - sushi.price

    if (!this.state.eaten.includes(sushi) && newBalance >= 0) {
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: newBalance
      })
    }
  }

  renderFourMoreSushis = (event) => {
    let newDisplayIndex = this.state.displayIndex + 4
    this.setState({ displayIndex: newDisplayIndex })
  }

  renderFourSushis = () => {
    return this.state.sushis.slice(this.state.displayIndex, this.state.displayIndex + 4)
  }

  addMoney = (event) => {
    event.preventDefault()
    let addedMoney = parseInt(event.currentTarget.children[0].value)
    if (!addedMoney) { addedMoney = 0 }
    this.setState({
      money: this.state.money + addedMoney
    })
  }

  render() {
    return (
      <div className="app">

        <SushiContainer
          sushis={this.renderFourSushis()}
          more={this.renderFourMoreSushis}
          eat={this.eatThisSushi}
          eaten={this.state.eaten} />
        <form onSubmit={this.addMoney}>Buy More Sushi!
          <input type="text" />
          <input type="submit" />
        </form>
        <Table remainingMoney={this.state.money} eaten={this.state.eaten} />
      </div>
    );
  }
}

export default App;