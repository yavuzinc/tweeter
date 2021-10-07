$(() => {
    let clicks = 0;
    $('#tweet-text').on('keyup', () => {
        var theCount = $('#counter');
        clicks = 140 - ($('#tweet-text').val().length);
        $('#counter').text(clicks);
        if (clicks < 0) {
            theCount.css('color', '#ff0000');
            theCount.css('font-weight','bold');
          } else {
            theCount.css('color', '#FFFFFF');
            theCount.css('font-weight','normal');
          }
    })
})


  