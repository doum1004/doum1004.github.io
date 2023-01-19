// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });

    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });

    hideInvitedElements();
    commentScript();
})

function hideInvitedElements() {
    const urlParams = new URL(location.href).searchParams;
    const invited = urlParams.get('invited');
    document.querySelectorAll("[invited]").forEach(function (item) {
        if (invited == null)
            item.style.display = 'none';
    });
}

function commentScript() {
    const formWrap = document.querySelector('.form_wrap_line');
    const inputName = document.querySelector('#input-comment-name');
    const inputPass = document.querySelector('#input-comment-pass');
    const inputContent = document.querySelector('#input-comment-content');
    const inputSubmit = document.querySelector('#input-comment-submit');

    inputName.addEventListener('keyup', activeEvent);
    inputPass.addEventListener('keyup', activeEvent);
    inputContent.addEventListener('keyup', activeEvent);

    function activeEvent() {
        switch(!(inputName.value && inputPass.value && inputContent.value)){
            case true : inputSubmit.disabled = true; break;
            case false : inputSubmit.disabled = false; break
        }
    }
}

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});

