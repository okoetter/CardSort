(function() {

  "use strict";

  //Configuration
  var gridId        = "Q4";
  var leftStart     = 10;
  var topStart      = 10;
  var leftOffset    = 3;
  var topOffset     = 6;
  var completeGridLineSelector = "#fieldset_" + gridId + ">table>tbody>tr";
  var relativeCardTextSelector = "th";

  jQuery(function ($) {
    createCards();
    $(".droparea").each(function() { //for each zone
      alignCards(this);
    });

    //makes the cards draggable
    $(".card").draggable({
      cursor: "pointer",
      stack: ".card",
      revert: "invalid",
      revertDuration: 200
    });

    //creates the drop zones
    $(".droparea").droppable({
      accept: ".card",
      drop: function(event, ui) {
        $(this).append(ui.draggable);
        alignCards(this);
        writeData(ui.draggable[0].classList[1], this.parentElement.classList[1]); //write data of dropped card into form
      }
    });

    //reads the grid and creates the cards in DOM on start zone
    function createCards() {
      var items = $(completeGridLineSelector).get(); //get DOM items from jQuery

      for (var i = items.length - 1; i >= 0; i--) { //iterate reverse because first item should be top most -> last in DOM
        var item = items[i];
        var radioId = $(item).find("input[type='radio']:first").attr("id");
        var itemId = radioId.split("_")[1];
        var $newCard = $("<div class=\"card card" + itemId +"\">" + $(item).find(relativeCardTextSelector).text() + "</div>");
        var oldValue = $("input[name='" + gridId + "_" + itemId + "']:checked").val();

        //if nothing checked, put on start zone
        if(oldValue === undefined) {
          $newCard.appendTo(".startzone:first > .droparea:first");
        }
        else { //else put on appropriate drop zone
          $newCard.appendTo(".dropzone" + oldValue + ":first > .droparea:first");
        }
      }
    }

    //aligns the cards on the zones
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

    //writes card sort data back to grid
    function writeData(card, dropzone) {
      var re = /(\d+)$/;
      var cardNo = re.exec(card)[0];

      if(dropzone === "startzone") {
        $("input[id^='" + gridId + "_" + cardNo + "']").prop("checked", false);
      }
      else {
        var dropzoneNo = re.exec(dropzone)[0];
        $("#" + gridId + "_" + cardNo + "_" + dropzoneNo).prop("checked", true);
      }
    }
  });
}());