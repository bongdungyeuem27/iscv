import MYCV from './CVCustom/Container'
import Default from './Default'

export const routes = {
  mycv: {
    name: 'my_cv',
    element: <MYCV></MYCV>,
    to: 'mycv',
  },
  default: {
    name: 'default_cv',
    element: <Default></Default>,
    to: '',
  },
}
