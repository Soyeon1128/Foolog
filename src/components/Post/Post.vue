<template lang="pug">
  .post
    header-logo 
    header-slogan
    //- Add 버튼
    .post-add-button-container
      button.add-button.susy-add-button(
        type='button'
        @click="clickAddBtn")
        span.add-button-plus +
        span.add-button-write 일기 쓰기
    .post-area-container
      //- Empty
      .post-empty-container.susy-main(v-if="empty")
        .post-empty
          p.post-empty-group-1
            span.double-quotes-start.fa.fa-quote-left.fa-4x
            span.post-empty-text-1 아직 등록된 
            span.post-empty-highlight 일기
            span.post-empty-text-2 가 없습니다
          p.post-empty-group-2
            span.post-empty-text-3 나만의 맛있는 일기를 작성해 보세요
            span.double-quotes-end.fa.fa-quote-right.fa-4x
      //- After
      .post-save-container.susy-photo-diary-wrapper(v-if="after" v-for="item in saveData")
        .post-save-photo.susy-post-photo
          img(:src="item.photo")
        .post-save-diary.susy-post-diary
          .post-save-diary-1
            span.fa.fa-clock-o.fa-lg  {{ postDate }}
            button.fa.fa-map-marker.fa-lg(type='button')  잠원동 신선횟집
          .post-save-diary-2
            .post-save-text {{ item.text }}
          .post-save-diary-3   
            .save-tags-food
              span 음식 종류
              .tag-food(:style="{'background': item.tags[0].color}") {{ item.tags[0].text }}
            .save-tags-taste
              span 맛 평가
              span.tag-taste.fa.fa-lg(:class="assignTasteClass(item.tags[1].text)")
            .save-modify
              span.fa.fa-pencil 
              button.modify-button 수정
          .post-save-delete
            button.delete-button(@click="clickDeleteBtn" :value="item.pk" type='button') X
      //- Before
      .post-list-container.susy-photo-diary-wrapper(v-if="before")
        .post-list-photo.susy-post-photo
          .post-list-photo-wrapper
            span.fa.fa-camera
            form
              legend 포스트 사진 올리기
              fieldset
                label.post-add-label(for='post-add-photo')
                  input(id='post-add-photo'
                  name='post-add-photo'
                  type='file'
                  @change='imgUpload')
                  span.add-photo-text 사진 추가하기
                  .post-img-wrapper
                    img.post-img(
                      :src='post_keys.photo'
                      v-if='post_keys.photo')
        .post-list-diary.susy-post-diary
          .post-list-diary-1
              span.fa.fa-clock-o.fa-lg  {{ postDate }}
              button.fa.fa-map-marker.fa-lg(type='button')  장소 추가하기
          .post-list-diary-2
            form
              textarea.post-add-text(
                    type='text'
                    name='add-text'
                    cols='60'
                    rows='12'
                    wrap='hard'
                    v-model='post_keys.text'
                    autofocus)
          .post-list-diary-3      
            .diary-tags-food
              span 음식 종류
              .food-evaluate-wrap
                input(type="radio" id="food-evaluate-korean" name="food-evaluate" class="food-evaluate" )
                label.food-evaluate(@click='getFoodTagValue' value='한식' for="food-evaluate-korean")
                  span(value='한식') 한식 
                input(type="radio" id="food-evaluate-chinese" name="food-evaluate" class="food-evaluate")
                label.food-evaluate(@click='getFoodTagValue' value='중식' for="food-evaluate-chinese")
                  span(value='중식') 중식
                input(type="radio" id="food-evaluate-japanese" name="food-evaluate" class="food-evaluate")
                label.food-evaluate(@click='getFoodTagValue' value='일식' for="food-evaluate-japanese")
                  span(value='일식') 일식
                input(type="radio" id="food-evaluate-eastern" name="food-evaluate" class="food-evaluate")
                label.food-evaluate(@click='getFoodTagValue' value='양식' for="food-evaluate-eastern")
                  span(value='양식') 양식
                input(type="radio" id="food-evaluate-etc" name="food-evaluate" class="food-evaluate")
                label.food-evaluate(@click='getFoodTagValue' value='기타' for="food-evaluate-etc")
                  span(value='기타') 기타
            .diary-tags-taste
              span 맛 평가
              .taste-evaluate-wrap
                input(type="radio" id="taste-evaluate-good" name="taste-evaluate" class="taste-evaluate" )
                label.taste-evaluate(@click='getTasteTagValue' value='Good' for="taste-evaluate-good")
                  span.fa.fa-smile-o(value='Good')
                input(type="radio" id="taste-evaluate-soso" name="taste-evaluate" class="taste-evaluate")
                label.taste-evaluate(@click='getTasteTagValue' value='Soso' for="taste-evaluate-soso")
                  span.fa.fa-meh-o(value='Soso')
                input(type="radio" id="taste-evaluate-bad" name="taste-evaluate" class="taste-evaluate")
                label.taste-evaluate(@click='getTasteTagValue' value='Bad' for="taste-evaluate-bad")
                  span.fa.fa-frown-o(value='Bad')
            .diary-save
              button.diary-save-button(@click="clickSaveBtn") 저장
          .post-delete
            button.post-delete-button(
              type='button'
              @click="clickCloseBtn") X
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

import HeaderLogo from '../Header'
import HeaderSlogan from '../HeaderSlogan'
// import PostMap from '../Post/PostMap'
// import PostMapTest from '../Post/PostMapTest'

export default {
  name: 'Post',
  components: {
    HeaderLogo, HeaderSlogan, 
    // PostMap, PostMapTest
  },
  created() {
    this.changeDateFormat();    
    this.afterSave();
    this.isListExist();
  },
  data () {
    return {
      saveData: '',
      empty : false,
      after: false,
      before: false,
      postDate: '',
      length: 0,
      file: null,
      post_keys: {
        text: '',
        photo: '',
        tags_food: '',
        tags_taste: '',
        date: '',
        longitude: '',
        latitude: '',
        memo: '',
        title: ''
      },
    }
  },
  computed: {
    // ...mapGetters([
    // ])
  },
  methods: {
    // ...mapMutations([
    // ]),
    changeDateFormat() {
      // 전달받은 YYYYMMDD 형식의 날짜 데이터
      let targetDate = this.$route.params.date;
      // 연, 월, 일 추출
      let year = targetDate.substring(0,4);
      let month = targetDate.substring(4,6);
      let date = targetDate.substring(6,8);
      // postDate : 글쓰기 영역에서 보여지는 날짜 (YYYY.MM.DD)
      let postDate = year + '.' + month + '.' + date;
      this.postDate = postDate;
      // dataDate : 데이터 전송 시 필요한 날짜 형식 (YYYY-MM-DD 00:00)
      let dataDate = year + '-' + month + '-' + date + ' ' + '00:00'
      this.post_keys.date = dataDate;
    },
    isListExist() {
      let user_token = window.localStorage.getItem('token');
      let url = this.$route.params.date;
      let dayListUrl = "http://api.foolog.xyz/post/day/" + url + "/"
      // 저장된 목록이 없으면 empty, 있으면 after
      this.$http.get(dayListUrl, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
        this.length = response.data.length;
        if ( this.length === 0 ) {
          this.empty = true;
        }
        else if ( this.length > 0 ) {
          this.before = false;
          this.empty = false;
          this.after = true;
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    afterSave() {
      let user_token = window.localStorage.getItem('token');
      let url = this.$route.params.date;
      let dayListUrl = "http://api.foolog.xyz/post/day/" + url + "/"
      this.$http.get(dayListUrl, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
        let data = response.data;
        this.saveData = data;
        this.isListExist();
      })
      .catch(error => {
        console.log(error);
      })
    },
    resetPostKeys() {  
      this.post_keys.text = '';
      this.post_keys.photo = '';
      this.post_keys.tags_food = '';
      this.post_keys.tags_taste = '';
      this.post_keys.longitude = '';
      this.post_keys.latitude = '';
      this.post_keys.memo = '';
      this.post_keys.title = '';
    },
    clickAddBtn() {
      this.resetPostKeys();
      this.empty = false;      
      this.before = true;
      this.after = true;
    },
    clickSaveBtn() {
      let form = new FormData();
      if ( this.post_keys.text.trim() !== '' ) {
        form.append('text', this.post_keys.text);
      }
      if ( this.file ) {
        form.append('photo', this.file);
      }
      if ( this.post_keys.tags_food && this.post_keys.tags_taste.trim() !== '' ) {
        form.append('tags', this.post_keys.tags_food+', '+this.post_keys.tags_taste);
      }
      if ( this.post_keys.date ) {
        form.append('date', this.post_keys.date);
      }
      if ( this.post_keys.longitude ) {
        form.append('longitude', this.post_keys.longitude);
      }
      if ( this.post_keys.latitude ) {
        form.append('latitude', this.post_keys.latitude);
      }
      if ( this.post_keys.memo.trim() !== '' ) {
        form.append('memo', this.post_keys.memo);
      }
      if ( this.post_keys.title.trim() !== '' ) {
        form.append('title', this.post_keys.title);
      }
      let user_token = window.localStorage.getItem('token');
      this.$http.post(this.$store.state.url_post, form, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(res => {
        this.afterSave();
        window.alert('일기가 등록되었습니다.');
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      })
    },
    assignTasteClass(taste) {
      switch(taste) {
        case 'Good':
          return 'fa-smile-o';
        case 'Soso':
          return 'fa-meh-o';
        case 'Bad':
          return 'fa-frown-o';
      }
    },
    clickCloseBtn() { 
      this.before = false;
      if ( this.length === 0 ) {
        this.empty = true;
      }
      else if ( this.length > 0 ) {
        this.empty = false;
        this.after = true;
      }
    },
    clickDeleteBtn(e) {
      let confirmDelete = confirm("일기를 삭제 하시겠습니까?");
      if ( confirmDelete === true ) {
        let targetListPk = e.target.value;
        let deleteUrl = this.$store.state.url_post + targetListPk + '/';
        let user_token = window.localStorage.getItem('token');      
        this.$http.delete(deleteUrl, {
          headers: { 'Authorization' : `Token ${user_token}`}
        })
        .then(response => {
          this.afterSave();
        })
        .catch(error => {
          console.log(error);
        })
      }
      else if ( confirmDelete === false ) {
        this.afterSave();
      }
    },
    imgUpload(e) {
      this.file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (f) => {
        this.post_keys.photo = f.srcElement.result; 
      }
    },
    getFoodTagValue(e) {
      let value = e.target.attributes[0].value
      this.post_keys.tags_food = value
    },
    getTasteTagValue(e) {
      let value = e.target.attributes[0].value
      this.post_keys.tags_taste = value      
    },
  }
}
</script>


