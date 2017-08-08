<template lang="pug">
  .calendar-container
    header-logo
    .calendar.susy-main
      .cal-header
        span.current-cal-header(v-text="calHeader")        
        .cal-header-btn-group
          button.btn-prev-month(@click="onPrevCalendar")
            | <
          button.btn-next-month(@click="onNextCalendar")
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
              td.date(v-for="m in 7" :class="arrIsThisMonth[ (n-1)*7 + m-1 ]") {{ arrTargetDate[ (n-1)*7 + m-1 ] }}
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
  },
  data() {
    return {
      currentMonth: new Date(),
      calHeader: '',
      arrDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      arrIsThisMonth : [],
      arrTargetDate: [],
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

        // 달력 셀에 삽입되는 날짜를 배열 arrTargetDate에 푸시
        this.arrTargetDate.push(new Date(targetDate).getDate());

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
    onPrevCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() - 1);
      this.makeCalendar();
    },
    // 다음달 달력 생성 함수
    onNextCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() + 1);
      this.makeCalendar();
    },
  }
}
</script>


