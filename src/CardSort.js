(function() {

  "use strict";

  //Configuration
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
    }
  });
}());