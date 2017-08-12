<template lang="pug">
  .calendar-container
    header-logo
    .calendar.susy-main
      .cal-header
        span.current-cal-header(v-text="calHeader")        
        .cal-header-button-group
          button.prev-month-button(@click="clickPrevCalendar")
            | <
          button.next-month-button(@click="clickNextCalendar")
            | >
      .cal-table
        table
          colgroup
            col(width='100')
            col(width='100')
            col(width='100')
            col(width='100')
            col(width='100')
            col(width='100')
            col(width='100')
          thead
            tr
              td(v-for="day in arrDay") {{ day }}
          tbody(v-for="n in 5")
            tr
              td.cal-date(v-for="m in 7" :class="arrIsThisMonth[ (n-1)*7 + m-1 ]") 
                a.cal-date-link(href @click.prevent="clickTargetDate(arrTargetDate[ (n-1)*7 + m-1 ])") {{ arrTargetDate[ (n-1)*7 + m-1 ].getDate() }}
</template>

<script>
import HeaderLogo from './Header'

export default {
  name: 'Calendar',
  components: {
    HeaderLogo
  },
  created() {
    this.makeCalendar();
    // this.getUserToken();
  },
  data() {
    return {
      currentMonth: new Date(),
      calHeader: '',
      arrDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      arrIsThisMonth : [],
      arrTargetDate: [],
      targetFullDate: '',
      dayListUrl: '',
    }
  },
  methods: {
    // 매달의 달력 생성 함수
    makeCalendar() {
      // 기준 일
      let date = this.currentMonth;
      let arrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // 달력 헤더 (현재 월, 년)
      this.calHeader = arrMonth[date.getMonth()] + ' ' + date.getFullYear();

      // 기준 월의 1일로 초기화
      date.setDate(1);

      // 달력의 첫 칸에 들어가는 날짜
      // cf. 2017년 8월의 달력의 경우, 7월 30일
      // 기준 월의 1일 날짜에서 1일의 요일 index를 빼준다
      let targetDate = new Date(date.getTime());
      targetDate.setDate(targetDate.getDate() - targetDate.getDay());

      // 데이터 속성 중 arrIsThisMonth, arrTargetDate 초기화
      this.arrIsThisMonth = [];
      // this.arrTargetDate = [];

      this.arrTargetDate = [];

      // 달력 셀에 삽입되는 targetDate와 클래스 지정 반복문
      // 달력 셀의 max값은 42(6*7)
      for(let i=0; i<42; i++) {
        // 기준 월 날짜 여부에 따른 클래스 지정
        // 이전달, 다음달 : not-this-month / 이번달: this-month
        let isThisMonth = "";
        if (date.getMonth() !== targetDate.getMonth()) {
          isThisMonth = 'not-this-month';
        } else {
          isThisMonth = 'this-month';
        };

        // 기준 월 여부 클래스를 배열 arrIsThisMonth에 푸시()
        this.arrIsThisMonth.push(isThisMonth);

        // 달력 셀에 삽입되는 target date를 배열 arrTargetDate에 푸시
        this.arrTargetDate.push(new Date(targetDate));
        // this.arrTargetDate.push(Object.assign(targetDate));

        // 다음 날 계산 (+1일)
        targetDate.setDate(targetDate.getDate() + 1);

        // 달력 종료
        // 토요일이면서 기준월이 아닐 경우 반복문 종료
        if(i % 7 ==6) {
          if(date.getMonth() != targetDate.getMonth()) {
            break;
          }
        }
      }
    },
    // 이전달 달력 생성 함수
    clickPrevCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() - 1);
      this.makeCalendar();
    },
    // 다음달 달력 생성 함수
    clickNextCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() + 1);
      this.makeCalendar();
    },
    // 타겟 날짜 객체를 YYYYMMDD 형식의 문자열로 변환 후 URL 형식으로 변경하는 함수
    clickTargetDate(target_date) {
      // 1. 클릭한 타겟 날짜를 YYYYMMDD 형식으로 변환
      // 타겟 날짜의 연도, 월, 일을 각각 변수 선언
      let object_year = target_date.getFullYear();
      let object_month = target_date.getMonth() +1;
      let object_date = target_date.getDate();
      // Year (문자열로 형 변환)
      let string_year = String(object_year);
      // Month (한자리수는 앞에 0을 붙이고 문자열로 형 변환)
      if ( object_month < 10 ) {
        object_month = '0' + object_month;
      }
      let string_month = String(object_month);
      // Date (한자리수는 앞에 0을 붙이고 문자열로 형 변환)
      if ( object_date < 10) {
        object_date = '0' + object_date;
      }
      let string_date = String(object_date);
      // YYYYMMDD 형식으로 완성된 fullDate
      let fullDate = string_year + string_month + string_date;
      this.targetFullDate = fullDate;

      // 2. 타겟 날짜에 해당되는 daylist url로 만들어 줌
      let target_url_daylist = this.$store.state.url_daylist + fullDate + '/';
      // data에 해당 daylist url 보관
      this.dayListUrl = target_url_daylist;

      this.getDayList();
    },
    // Post 페이지로 라우팅(유저 토큰값을 헤더로 전송, 라우팅 시 params로 타겟날짜 전달)
    getDayList() {
      let user_token = window.localStorage.getItem('token');
      this.$http.get(this.dayListUrl, {
        headers: { 'Authorization' : `Token ${user_token}` }
      })
      .then(response => {
        this.$router.push({
          name: 'post', 
          params: { date: this.targetFullDate }
        });
      })
      .catch(error => {
        // console.log(error.response);
      })
    }
  }
}
</script>


