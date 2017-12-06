src="https://code.jquery.com/jquery-1.12.4.js"
src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"

$( "#active, #progress, #victory").sortable({
      connectWith: ".connectedSortable",
      update: function(event, ui) {
        var id = ui.item.attr('id');
        var parent = ui.item.parent().attr('id');

        if (parent == "active") {
          $.ajax({
              type:'POST',
              url:"/petitions/" + id + "/active_status"
            });
        }

        if (parent == "progress") {
          $.ajax({
              type:'POST',
              url:"/petitions/" + id + "/progress_status"
            });
        }

        if (parent == "victory") {
          $.ajax({
              type:'POST',
              url:"/petitions/" + id + "/victory_status"
            });
        }
      }
})