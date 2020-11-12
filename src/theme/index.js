import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#8355ff'
    },
    secondary: {
      main: '#f4f5f7'
    },
    success: {
      main: '#00f2c3'
    },
    info: {
      main: '#0091f2'
    },
    background: {
      paper: '#1f2251',
      default: '#171941'
    }
  }
})

export default theme