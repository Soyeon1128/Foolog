import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Calendar from './components/Calendar'
import Post from './components/Post'
import Search from './components/Search'
import Statistics from './components/Statistics'

// routes setting

export const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home
    }
  },
  {
    path: '/signin',
    components: {
      default: SignIn
    }
  },
  {
    path: '/signup',
    components: {
      default: SignUp
    }
  },
  {
    path: '/calendar',
    components: {
      default: Calendar
    }
  },
  {
    path: '/post',
    components: {
      default: Post
    }
  },
  {
    path: '/search',
    components: {
      default: Search
    }
  },
  {
    path: '/statistics',
    components: {
      default: Statistics
    }
  },
]