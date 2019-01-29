import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Burger/Logo/Logo';

 const Toolbar = () => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>
      ...
    </nav>
  </header>
)

export default Toolbar