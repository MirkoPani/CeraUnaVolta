export function Call() {
    var element = document.querySelector('#scene');

    // And pass it to panzoom
    panzoom(element, {
        bounds: true,
        boundsPadding: 1,
        maxZoom: 4,
        minZoom: 0.5
    });
}