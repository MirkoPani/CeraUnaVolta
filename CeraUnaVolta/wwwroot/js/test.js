export function Call() {
    //var element = document.querySelector('#scene');

    // And pass it to panzoom
    //panzoom(element, {
    //    bounds: true,
    //    boundsPadding: 1,
    //    maxZoom: 4,
    //    minZoom: 0.5
    //});

    const elem = document.getElementById('scene')
    const panzoom = Panzoom(elem, {
        maxScale: 5,
        contain: 'outside',
        startScale: 1.5
    })

    const parent = elem.parentElement
    // No function bind needed
    parent.addEventListener('wheel', panzoom.zoomWithWheel)

    // This demo binds to shift + wheel
    parent.addEventListener('wheel', function (event) {
        panzoom.zoomWithWheel(event)
    })

}