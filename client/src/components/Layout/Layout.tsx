import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

type propsTypes = {
  width: number
}

const Layout: React.FC<propsTypes> = (props) => {
    const useStyles = makeStyles({
        root: {
          width:props.width,
          margin:'0 auto',
        },
      });
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            {props.children}
        </div>
    )
}

export default Layout
