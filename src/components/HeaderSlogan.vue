<template lang="pug">
  .header-img-container
    .header-img
      img(src="../assets/header-img/header-img-3.png")
    .slogan-group
      p.slogan-love.susy-slogan-1 Love, Eat and
      p.slogan-write.susy-slogan-2 Write on 
        span.slogan-date(v-text="sloganFullDate")
</template>

<script>
export default {
  name: 'HeaderSlogan',
  created() {
    this.changeSloganDate();
  },
  data() {
    return {
      sloganFullDate: ''
    }
  },
  methods: {
    // 슬로건 영역에서 쓰이는 DD MMM 형식의 날짜 (cf. 19 Jul)
    changeSloganDate() {
      console.log('??????????',this.$route.params.date);
      // 전달받은 YYYYMMDD 형식의 날짜 데이터
      let original_date = this.$route.params.date;

      // 각 년, 월, 일 추출하여 가공
      let pick_month = original_date.substring(4,6);
      if ( pick_month.substring(0,1) === '0' ) {
        pick_month = pick_month.substring(1,2)
      }
      // cf. 01(1월)의 index가 1이므로 첫번째 배열을 사용하지 않은 none 값을 넣어줌
      let arr_month = ["none", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let slogan_month = arr_month[pick_month];

      let slogan_date = original_date.substring(6,8);

      // DD MMM 형식의 날짜 데이터
      let sloganFullDate = slogan_date + ' ' + slogan_month;
      this.sloganFullDate = sloganFullDate;
    }
  }
}
</script>

<style lang="sass">

</style>


