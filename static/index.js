const ul_interval = document.getElementById('ul-interval-container');

  function get_titles() {
    const ul_timers = document.getElementById('ul-timers-container');

    const h1 = ul_timers.querySelectorAll('h1')
    const footer = ul_timers.querySelectorAll('footer')

    return [h1, footer]
  }

  function get_data(type) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const times = data.map(item => item.timeframes[type])
        const [main_time, previous_time] = get_titles()

        main_time.forEach((obj, index) => {
          obj.textContent = `${times[index].current}hrs`
          previous_time[index].textContent = `${type == 'daily' ? "Yesterday" : type == 'weekly' ? "Last Week" : "Last Month"} - ${times[index].previous}hrs`
        })
      })
  }

  $(ul_interval).children().toArray().forEach(li => {
    $(li).click(function (e) {
      tabindex = $(this).attr('tabindex')
      switch (tabindex) {
        case '1':
          get_data('daily')
          break;
        case '2':
          get_data('weekly')
          break;
        case '3':
          get_data('monthly')
          break;
      }
    })
  })

  $(document).ready(() => {
    get_data('weekly')
  })