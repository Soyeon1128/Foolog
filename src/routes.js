import Home from './components/Home'
import Calendar from './components/Calendar/Calendar'
import Post from './components/Post/Post'
import Search from './components/Search'
import Statistics from './components/Statistics'

// routes setting

export const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter(to, from, next){
      let tk = window.localStorage.getItem('token');
      if (!tk) {
        next('/calendar');
      } else {
        next();
      }
    },
    components: {
      default: Home
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