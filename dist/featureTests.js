(function() {

    function assert(msg, exp) {
        window.console.log(msg + ': ' + (exp ? 'OK' : 'Not OK'));
    }

    var el = document.createElement('p');

    assert('Element classList', 'classList' in el);
    assert('Add event listener', 'addEventListener' in el);
    assert('querySelectorAll', 'querySelectorAll' in el);
    assert('matches', el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector);
    assert('XMLHttpRequest', 'XMLHttpRequest' in window);
    assert('getComputedStyle', 'getComputedStyle' in window);
    assert('getBoundingClientRect', 'getBoundingClientRect' in el);

})();
