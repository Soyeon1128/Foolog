<template lang="pug">
  .post-save-container.susy-photo-diary-wrapper
    
    .post-save-photo.susy-post-photo
      img(src="../../assets/img3.png")
    
    .post-save-diary.susy-post-diary
      
      .post-save-diary-1
        span.fa.fa-clock-o.fa-lg  {{ this.$route.params.date }}
        button.fa.fa-map-marker.fa-lg(type='button')  잠원동 신선횟집
      
      .post-save-diary-2
        .post-save-text 한국의 2쿼터 출발이 좋았다. 박진철의 골밑 득점을 시작으로 한희원의 3점슛, 강상재(200cm, 포워드)의 3점슛이 연거푸 림을 갈랐다. 필리핀은 마이클(185cm, 포워드)의 득점이 전부였다. 약 3분의 시간이 채 흐르기도 전에 한국이 8점차 리드를 거머쥐었다(22-14).흐름을 잡은 한국은 계속해서 몰아붙였다. 스위치 맨투맨 디펜스의 견고함을 유지한 채 다양한 공격 무기를 꺼내 들었다. 변준형(187cm, 가드)이 공 소유 시간을 늘리며 득점 생산에 박차를 가했다. 변준형은 포스트 업과 페네트레이션으로 팀의 득점행진을 주도했다. 골밑에서는 박준형이 포스트 업과 풋백 득점으로 힘을 보탰다. 문성곤(196cm, 포워드)과 한희원도 외곽에서 점퍼를 터뜨리며 지원 사격했다. 종료 4분 7초를 남겨놓고 한국이 32-20으로 달아났다. 하지만 2쿼터 막판 들어 한국의 집중력이 흔들렸다. 2쿼터 중반까지 보였던 유기적인 공격 호흡이 자취를 감췄다. 무리한 돌파와 슛이 난무했다. 덩달아 수비 집중력도 현저하게 떨어지며 달아날 기회를 놓쳤다.
      
      .post-save-diary-3      
        .save-tags-food
          span 음식 종류
          .tag-food(value='한식') 한식
        .save-tags-taste
          span 맛 평가
          span.tag-taste.fa.fa-smile-o.fa-lg(value='Good')
        
        .fb-share-button(data-href='https://developers.facebook.com/docs/plugins/', data-layout='button', data-size='large', data-mobile-iframe='false')
          a.fb-xfbml-parse-ignore(target='_blank', href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse') 공유하기

        .post-save-modify
          span.fa.fa-pencil 
          button.modify-button 수정
      .post-save-delete
        button.delete-button(type='button') X
</template>

<script>
export default {
  name: 'PostAfterSave',
  data() {
    return {
    }
  },
  methods: {
    // getFoodTagValue(e) {
    //   let value = e.target.attributes[0].value
    //   console.log(e.target.attributes[0].value);
      
    //   this.post_keys.tags_food = value
    // },
    // getTasteTagValue(e) {
    //   let value = e.target.attributes[0].value
    //   console.log(e.target.attributes[0].value);
      
    //   this.post_keys.tags_taste = value      
    // },
  }
}
</script>
