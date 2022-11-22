import Main from './Main'
import Posts from './Posts'
import Certificates from './Certificates'
import Schedule from './Schedule'
export const routes = {
  main: {
    name: 'main',
    element: <Main></Main>,
    to: '',
    icon: 'fa-regular fa-house-heart',
  },
  posts: {
    name: 'posts',
    element: <Posts></Posts>,
    to: 'posts',
    icon: 'fa-regular fa-blog',
  },
  certificates: {
    name: 'certificates',
    element: <Certificates></Certificates>,
    to: 'certificates',
    category: 2,
    icon: 'fa-regular fa-certificate',
  },
  schedule: {
    name: 'schedule',
    element: <Schedule></Schedule>,
    to: 'schedule',
    icon: 'fa-regular fa-calendar-star',
  },
}
