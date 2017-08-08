<template lang="pug">
  .calendar-container
    header-logo
    .calendar.susy-main
      .cal-header
        button.btn-prev-month
          | <
        span.current-month-header
          | Aug 2017
        button.btn-next-month
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
import HeaderLogo from '../Header'

export default {
  name: 'Calendar',
  components: {
    HeaderLogo
  },
  created () {
    this.makeCalendar();
  },
  data () {
    return {
      currentMonth: new Date(),
      arrDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      arrWeek: ["1st-week", "2nd-week", "3rd-week", "4th-week", "5th-week", "6th-week"],
      arrIsThisMonth : [],
      arrTargetDate: [],
    }
  },
  computed: {
    makeShortDate() {
      
    }
  },
  methods: {
    makeCalendar() {

      this.currentMonth.setDate(1);

      let targetDate = new Date(this.currentMonth.getTime());
      targetDate.setDate(targetDate.getDate() - targetDate.getDay());

      for(let i=0; i<100; i++) {
        
        let isThisMonth = "";

        if (this.currentMonth.getMonth() != targetDate.getMonth()) {
          isThisMonth = 'not-this-month'
        } else {
          isThisMonth = 'this-month'
        };

        this.arrIsThisMonth.push(isThisMonth);

        this.arrTargetDate.push(new Date(targetDate).getDate());

        targetDate.setDate(targetDate.getDate() + 1);

        if(i % 7 ==6) {
          if(this.currentMonth.getMonth() != targetDate.getMonth()) {
            break;
          }
        }
      }  
    }
  }
}

</script>


