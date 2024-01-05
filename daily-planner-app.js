$(document).ready(function () {
  // Display current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Create time blocks
  for (let i = 9; i <= 17; i++) {
    createBlock(i);
  }

  // Set interval to update colors every minute
  setInterval(updateColors, 60000);

  // Update colors when the page is loaded
  updateColors();

  // Event listener for save buttons
  $(document).on("click", ".save-btn", function () {
    const hour = $(this).attr("data-hour");
    const eventText = $(`#event-${hour}`).val();
    localStorage.setItem(`event-${hour}`, eventText);
  });

  // Load events from local storage
  for (let i = 9; i <= 17; i++) {
    const storedEvent = localStorage.getItem(`event-${i}`);
    if (storedEvent) {
      $(`#event-${i}`).val(storedEvent);
    }
  }

  // Function to create time block
  function createBlock(hour) {
    const timeBlock = $("<div>").addClass("time-block");
    const time = $("<div>").text(dayjs().hour(hour).format("h A")); // Set the hour using Day.js
    const eventTextarea = $("<textarea>").attr("id", `event-${hour}`);
    const saveBtn = $("<button>").addClass("save-btn").text("Save").attr("data-hour", hour);

    timeBlock.append(time, eventTextarea, saveBtn);
    $("#timeBlocks").append(timeBlock);
  }

  // Function to update colors based on current time
  function updateColors() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
      const blockHour = parseInt($(this).find(".save-btn").attr("data-hour"));

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }
});
