import React, {Component} from 'react'

import axios from '../../axios-orders'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal' 
import OrderSummary from '../../components/Burger/BurgerIngredient/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 0,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients : {
        meat: 0,
        cheese: 0,
        bacon: 0,
        salad: 0
    },
    totalPrice : 0,
    purchasable: false,
    purchasing: false
  }

  updatePurchasableState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredientkey => {
        return ingredients[ingredientkey]
      })
      .reduce((sum, element) => {
        return sum + element
      },0)
    this.setState({purchasable: sum > 0})
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Maya',
        address: {
          street: 'abc',
          zipCOde: '243',
          country: 'NZ'
        },
        email: 'email@email.com',
      },
      deliveryMethod:'fast'
    }
    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    this.updatePurchasableState(updatedIngredients)
  } 

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return 
    } 
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceDeduction
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    this.updatePurchasableState(updatedIngredients)
  }
  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients} 
          purchaseCancelled={this.purchaseCancelHandler}
          price={this.state.totalPrice}
          purchaseContinued={this.purchaseContinueHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}/>
      </Aux>
    )
  }
}

export default BurgerBuilder
