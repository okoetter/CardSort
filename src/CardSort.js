(function() {

  "use strict";

  //Configuration
  var GridId = "Q4";
  var leftStart = 10;
  var topStart = 10;
  var leftOffset = 3;
  var topOffset = 6;

  function alignCards(dropzone) {
    var left = leftStart; //reset offsets to top for new zone
    var top = topStart;

    $(dropzone).find(".card").each(function() { //for each card in this zone
      $(this).css({
          "top": top,
          "left": left
      });
      left += leftOffset; //increase offsets for new card in same zone
      top += topOffset;
    });
  }

  function writeData(card, dropzone) {
    var re = /(\d+)$/;
    var cardNo = re.exec(card)[0];

    if(dropzone === "startzone") {
      console.log("selector:", ".card[id^='" + GridId + "_" + cardNo + "']");
      $("input[id^='" + GridId + "_" + cardNo + "']").prop("checked", false);
    }
    else {
      var dropzoneNo = re.exec(dropzone)[0];
      $("#" + GridId + "_" + cardNo + "_" + dropzoneNo).prop("checked", true);
    }
  }

  //init card positions
  $(function () {
    $(".droparea").each(function() { //for each zone
      alignCards(this);
    });
  });

  //
  $(".card").draggable({
    cursor: "pointer",
    stack: ".card",
    revert: "invalid",
    revertDuration: 200
  });

  $(".droparea").droppable({
    accept: ".card",
    drop: function(event, ui) {
      $(this).append(ui.draggable);
      alignCards(this);
      writeData(ui.draggable[0].classList[1], this.parentElement.classList[1]); //write data of dropped card into form
    }
  });
}());