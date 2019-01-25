import React from 'react'
import classes from './Layout.css'

import Aux from '../../hoc/Aux'

const Layout = (props) => {
  return (
    <Aux>
      <div>
        Toolbar, SideDrawer
      </div>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

export default Layout
