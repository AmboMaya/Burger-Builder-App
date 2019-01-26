import React from 'react'

import Aux from '../../hoc/Aux'
import classes from './Layout.css'

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
