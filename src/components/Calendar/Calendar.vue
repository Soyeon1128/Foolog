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
              td.day SUN
              td.day MON
              td.day TUE
              td.day WED
              td.day THU
              td.day FRI
              td.day SAT
          tbody
            tr
              td.date.not-this-month 30
              td.date.not-this-month 31
              td.date 1
              td.date 2
              td.date 3
              td.date 4
              td.date 5
            tr
              td.date 6
              td.date 7
              td.date 8
              td.date 9
              td.date 10
              td.date 11
              td.date 12
            tr
              td.date 13
              td.date 14
              td.date 15
              td.date 16
              td.date 17
              td.date 18
              td.date 19
            tr
              td.date 20
              td.date 21
              td.date 22
              td.date 23
              td.date 24
              td.date 25
              td.date 26
            tr
              td.date 27
              td.date 28
              td.date 29
              td.date 30
              td.date 31
              td.date.not-this-month 1
              td.date.not-this-month 2
</template>

<script>
import HeaderLogo from '../Header'

export default {
  name: 'Calendar',
  components: {
    HeaderLogo

  }
}
</script>

<style lang="sass" scoped>

@import '~grid'

body
  // overflow: hidden

.cal-header 
  height: 100px
  text-align: center
  font-size: 40px
  font-weight: 100
  padding-top: 25px
  box-sizing: border-box
  margin-top: 10px
 
.current-month-header 
  margin: 0 20px
  vertical-align: middle
  /*background: blue */

.btn-prev-month, .btn-next-month 
  border: none
  background: none
  font-size: 20px
  font-weight: 100
  vertical-align: middle

/* cal-table 영역 */
table 
  border-collapse: collapse
  border-top: 1px solid #666
  // padding: 20px
  margin: 0 auto

table thead, table tbody 
  font-size: 20px

table thead 
  text-align: center

table tbody 
  color: #333
  font-weight: 100
  text-align: center  

table td 
  height: 80px
  vertical-align: middle

.not-this-month 
  color: #ccc

.date-img 
  width: 30px
  height: 30px
  overflow: hidden
  float: right

.date-img img 
  width: 100%
  height: auto

.date-img.height-bigger img 
  width: auto
  height: 100%



</style>
