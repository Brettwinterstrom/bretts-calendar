$(document).ready(function () {
    //when the page load
    function pageLoad(params) {
        //get current time
        var currentTime = moment().hour();
        //assign of color
        var timeBlockAarry = $(".time-block");
        timeBlockAarry.each(function (timeBlockIndex) {
            var $timeBlock = $(timeBlockAarry[timeBlockIndex]);
            var dataAttr = parseInt($timeBlock.attr("data"));
            //check if past presetn ofr future
            if (dataAttr < currentTime) {
                $timeBlock.addClass("past");
            } else if (dataAttr === currentTime) {
                $timeBlock.addClass("present");
            } else {
                $timeBlock.addClass("future");
            }
        });
        //display the current time
        $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
        //get local data and handle if there is no data
        timeBlockAarry.each(function (timeBlockIndex) {
            //get id
            var id = $(timeBlockAarry[timeBlockIndex]).attr("data");
            //grab stored data
            var data = localStorage.getItem(`hour-${id}`);
            //check if data
            if (data) {
                $(`[data=${id}] textarea`).val(data);
            } else {
                $(`[data=${id}] textarea`).val("");
            }
        });
    }

    $(".saveBtn").on("click", function (event) {
        //get the input 
        var value = $(event.target).siblings("textarea").val();
        //get the id
        var id = $(event.target).closest(".time-block").attr("data");
        //update the storage with new data
        localStorage.setItem(`hour-${id}`, value);
    });

    pageLoad();
});
