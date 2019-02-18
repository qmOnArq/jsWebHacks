setInterval(
    () => {
        $('*').each(function(){ 
            const text = $(this)
                .clone()
                .children()
                .remove()
                .end()
                .text()
                .trim(); 
            const hasNumber = !!(' ' + text).match(/[^\u200B\d](\d+.?\d*)+/g);
            
            if (hasNumber) {
                $(this).css({background: 'red', color: 'white'});
            }
        });
    }
, 1000);

// Uses \u200B to mark localized entities