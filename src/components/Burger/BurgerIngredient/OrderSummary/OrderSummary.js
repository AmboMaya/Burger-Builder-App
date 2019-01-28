import React from 'react'

import Aux from '../../../../hoc/Aux'

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return <li key={ingredientKey}><span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}</li>
    })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Nice burger is served</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout?</p>
    </Aux>
  )
} 

export default OrderSummary