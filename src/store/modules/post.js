import axios from 'axios'

const state = {
  targetDate: '',
  empty : false,
  after: false,
  before: false,
  modify: false,
  modifyIndex: 0,
  allDayData: '',  
  postDate: '',
  dayListLength: 0,
  file: null,
  post_keys: {
    text: '',
    photo: '',
    tags: [
      { text: "" },
      { text: "" }
    ],
    date: '',
    longitude: '',
    latitude: '',
    memo: '',
    title: ''
  },
}

const getters = {
  isEmpty(state) {
    return state.empty;
  },
  isAfter(state) {
    return state.after;
  },
  isBefore(state) {
    return state.before;
  },
  isModify(state) {
    return state.modify;
  },
  modifyIndex(state) {
    return state.modifyIndex;
  },
  allDayData(state) {
    return state.allDayData;
  },
  postDate(state) {
    return state.postDate;
  },
  listLength(state) {
    return state.length;
  },
  dataFile(state) {
    return state.file;
  },
  postKeys(state) {
    return state.post_keys;
  },
}

const mutations = {
  changeDateFormat(state, targetdate) {
    // 전달받은 YYYYMMDD 형식의 날짜 데이터 targetdate를 전달받음
    state.targetDate = targetdate;
    // 연, 월, 일 추출
    let year = targetdate.substring(0,4);
    let month = targetdate.substring(4,6);
    let date = targetdate.substring(6,8);
    // postDate : 글쓰기 영역에서 보여지는 날짜 (YYYY.MM.DD)
    let postDate = year + '.' + month + '.' + date;
    state.postDate = postDate;
    // dataDate : 데이터 전송 시 필요한 날짜 형식 (YYYY-MM-DD 00:00)
    let dataDate = year + '-' + month + '-' + date + ' ' + '00:00'
    state.post_keys.date = dataDate;
  },
  showAllDayData(state) {
    let user_token = window.localStorage.getItem('token');
    let daylist_url = "http://api.foolog.xyz/post/day/" + state.targetDate + "/"
    axios.get(daylist_url, {
      headers: { 'Authorization' : `Token ${user_token}` }
    })
    .then(response => {
      state.allDayData = response.data;
      state.allDayData.sort((a, b) => {
        return a.pk > b.pk ? -1 : a.pk < b.pk ? 1 : 0;
      })
      state.dayListLength = response.data.length;
      if ( state.dayListLength === 0 ) {
        state.empty = true;
        state.before = false;
        state.after = false;
      }
      else if ( state.dayListLength > 0 ) {
        state.before = false;
        state.empty = false;
        state.after = true;
      }
    })
    .catch(error => {
      console.log(error);
    })
  },
  resetPostKeys(state) {  
    state.post_keys.text = '';
    state.post_keys.photo = '';
    state.post_keys.tags[0].text = '';
    state.post_keys.tags[1].text = '';
    state.post_keys.longitude = '';
    state.post_keys.latitude = '';
    state.post_keys.memo = '';
    state.post_keys.title = '';
    console.log(state.post_keys);
  },
  showBefore(state) {
    state.empty = false;      
    state.before = true;
  },
  imgUpload(state, e) {
    console.log('hi');
    state.file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(state.file);
    reader.onload = (f) => {
    state.post_keys.photo = f.srcElement.result; 
    }
  },
  saveList(state) {

    // 새 글 등록    
    if ( state.before === true ) {
      let form = new FormData();
      if ( state.post_keys.text.trim() !== '' ) {
        form.append('text', state.post_keys.text);
      }
      if ( state.file ) {
        form.append('photo', state.file);
      }
      if ( !!state.post_keys.tags[0].text && !!state.post_keys.tags[1].text ) {
        form.append('tags', state.post_keys.tags[0].text + ', ' + state.post_keys.tags[1].text);
      }
      if ( state.post_keys.date ) {
        form.append('date', state.post_keys.date);
      }
      if ( state.post_keys.longitude ) {
        form.append('longitude', state.post_keys.longitude);
      }
      if ( state.post_keys.latitude ) {
        form.append('latitude', state.post_keys.latitude);
      }
      if ( state.post_keys.memo.trim() !== '' ) {
        form.append('memo', state.post_keys.memo);
      }
      if ( state.post_keys.title.trim() !== '' ) {
        form.append('title', state.post_keys.title);
      }
      let user_token = window.localStorage.getItem('token');
      let post_url = 'http://api.foolog.xyz/post/';
      axios.post(post_url, form, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
       console.log('새글 등록 후', state.post_keys);
        window.alert('일기가 등록되었습니다.');
        let daylist_url = "http://api.foolog.xyz/post/day/" + state.targetDate + "/"
        axios.get(daylist_url, {
          headers: { 'Authorization' : `Token ${user_token}` }
        })
        .then(response => {
          state.allDayData = response.data;
          state.dayListLength = response.data.length;
          if ( state.dayListLength === 0 ) {
            state.empty = true;
            state.before = false;
            state.after = false;
          }
          else if ( state.dayListLength > 0 ) {
            state.before = false;
            state.empty = false;
            state.after = true;
          }
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      })
    }

    // 기존 글 수정    
    else if ( state.modify === true ) {
    console.log('기존 글 수정일때', state.post_keys);

      // tags color 초기화
      state.post_keys.tags[0].color = '';
      state.post_keys.tags[1].color = '';
      console.log('bbb',state.post_keys.tags);

      
      let form = new FormData();
      if ( state.post_keys.text !== '' ) {
        form.append('text', state.post_keys.text);
      }
      if ( state.file ) {
        form.append('photo', state.file);
      }
      if ( !!state.post_keys.tags[0].text && !!state.post_keys.tags[1].text ) {
        form.append('tags', state.post_keys.tags[0].text + ', ' + state.post_keys.tags[1].text);
      }
      if ( state.post_keys.date ) {
        form.append('date', state.post_keys.date);
      }
      if ( state.post_keys.longitude ) {
        form.append('longitude', state.post_keys.longitude);
      }
      if ( state.post_keys.latitude ) {
        form.append('latitude', state.post_keys.latitude);
      }
      if ( state.post_keys.memo !== '' ) {
        form.append('memo', state.post_keys.memo);
      }
      if ( state.post_keys.title !== '' ) {
        form.append('title', state.post_keys.title);
      }
      let user_token = window.localStorage.getItem('token');
      let modify_pk = state.post_keys.pk;
      let modify_url = 'http://api.foolog.xyz/post/' + modify_pk + '/';
      axios.patch(modify_url, form, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
        console.log('수정 후', state.post_keys);
        
        window.alert('일기가 수정되었습니다.');

        let daylist_url = "http://api.foolog.xyz/post/day/" + state.targetDate + "/"
        axios.get(daylist_url, {
          headers: { 'Authorization' : `Token ${user_token}` }
        })
        .then(response => {
          state.allDayData = response.data;
          state.dayListLength = response.data.length;
          if ( state.dayListLength === 0 ) {
            state.empty = true;
            state.before = false;
            state.after = false;
          }
          else if ( state.dayListLength > 0 ) {
            state.before = false;
            state.modify = false;
            state.empty = false;
            state.after = true;
          }
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      })
    }
  },
  // closeBefore() {
  //   let user_token = window.localStorage.getItem('token');
  //   let daylist_url = "http://api.foolog.xyz/post/day/" + date + "/"
  //   axios.get(daylist_url, {
  //     headers: { 'Authorization' : `Token ${user_token}` }
  //   })
  //   .then(response => {
  //     state.dayListLength = response.data.length;
  //     state.before = false;
  //     if ( state.dayListLength === 0 ) {
  //       state.empty = true;
  //     }
  //     else if ( state.dayListLength > 0 ) {
  //       state.empty = false;
  //       state.after = true;
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // },
  deleteList(state, index) {
    let user_token = window.localStorage.getItem('token');      
    let confirmDelete = confirm("일기를 삭제 하시겠습니까?");
    if ( confirmDelete === true ) {
      let list_pk = state.allDayData[index].pk; 
      let delete_url = 'http://api.foolog.xyz/post/' + list_pk + '/';
      axios.delete(delete_url, {
        headers: { 'Authorization' : `Token ${user_token}`}
      })
      .then(response => {
        let daylist_url = "http://api.foolog.xyz/post/day/" + state.targetDate + "/"
        axios.get(daylist_url, {
          headers: { 'Authorization' : `Token ${user_token}` }
        })
        .then(response => {
          state.allDayData = response.data;
          state.dayListLength = response.data.length;
          if ( state.dayListLength === 0 ) {
            state.empty = true;
            state.before = false;
            state.after = false;
          }
          else if ( state.dayListLength > 0 ) {
            state.before = false;
            state.empty = false;
            state.after = true;
          }
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  modifyList(state, index) {
      state.modifyIndex = index;
      let editData = state.allDayData.splice(index, 1);
      state.post_keys = editData[0];
      console.log('뭘까용용',state.post_keys);
      state.modify = true;
      state.before = false;
      state.after = false;      
  },
}

const actions = {
  writeDiary({commit}) {
    commit('resetPostKeys');
    commit('showBefore');
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}