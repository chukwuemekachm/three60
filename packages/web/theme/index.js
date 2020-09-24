import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4673E4'
    },
    secondary: {
      main: '#28BA63'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#E5E5E5',
      light: '#fff'
    }
  }
})

export default theme
