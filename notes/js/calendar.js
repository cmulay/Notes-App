const calendar = {
    monthNum: document.querySelector(".month-num");
    monthString: document.querySelector(".month-string"),
    days: document.querySelector("#days"),
    date: new Date(),
    todaysDate: new Date(),

init(options) {
    this.options = options;
    this.date.setDate(1);
    this.createMonth();
  },

  createDay(num, day) {
    const newDay = document.createElement("li");
    const dateEl = document.createElement("a");
    dateEl.textContent = num;

    if (num == 1) {
        if (day == 0) {
            newDay.style.marginLeft = 6 * 60 + "px";
        } else {
            newDay.style.marginLeft = (day -1) * 60 + "px";
        }
    }
    if (this.date.toString() == this.todaysDate.toString()) {
        newDay.classList.add("active");
    }
    newDay.appendChild(dateEl);
    days.appendChild(newDay);
  },

  createMonth(){
      const currentMonth = this.date.getMonth();
      while (this.date.getMonth() == currentMonth) {
          this.createDay(
              this.date.getDate(),
              this.date.getDay(),
              this.date.getFullYear()
              );
          this.date.setDate(this.date.getDate() + 1);
      }
      this.date.setDate(1);
      this.date.setMonth(this.date.getMonth()-1);

      this.monthNum.innerHTML = this.monthsAsNum(this.date.getMonth());
      this.monthString.innerHTML = this.monthsAsString(this.date.getMonth());
  },
  
  monthsAsString(monthIndex) {
      return [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
      ][monthIndex];
  },

  monthsAsNum(monthIndex) {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"][
          monthIndex
      ];
  },

  clearCalendar() {
      calendar.days.innerHTML = "";
  },
};