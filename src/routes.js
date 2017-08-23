import Home from './components/Home'
import Calendar from './components/Calendar'
import Post from './components/Post/Post'
import PostBefore from './components/Post/PostBefore.vue'
import PostAfter from './components/Post/PostAfter.vue'
import Search from './components/Search'

// routes setting
export const routes = [
  {
    path: '/',
    name: 'Home',
    
    // Navigation Guard 사용시 필요 코드
    // 토큰값이 있으면(로그인에 성공하면) Calendar 뷰를 보여줌

    // beforeEnter(to, from, next){
    //   let tk = window.localStorage.getItem('token');
    //   if (tk) {
    //     next('/calendar');
    //   } else {
    //     next();
    //   }
    // },

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
    name: 'Post',
    path: '/post',
    components: {
      default: Post
    },
  },
  {
    name: 'Search',
    path: '/search',
    components: {
      default: Search
    }
  }
]