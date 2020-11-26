export function InitializeTestMap() {
    var mapMinZoom = 0;
    var mapMaxZoom = 2;

    L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
        // At zoom 0, tile 268x268px should represent the entire "world" of size 1202x1202.
        // scale is therefore 1202 / 256 = 4.69 (use the reverse in transformation, i.e. 1/32).
        // We want the center of tile 0/0/0 to be coordinates [0, 0], so offset is 1202 * 1/4.69 / 2 = 256 / 2 = 128.
        transformation: new L.Transformation(1 / 7.45, 128, -1 / 7.45, 128)
    });

    var mapBounds = L.latLngBounds([
        [-1907 / 2, -1907 / 2],
        [1907 / 2, 1907 / 2]
    ]);

    var map = L.map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: L.CRS.MySimple,
        maxBoundsViscosity: 1.0,
        bounds: mapBounds,
        zoomControl: false
    }).setView([0, 0], mapMaxZoom);

    map.attributionControl.setPrefix();

    window.latLngToPixels = function (latlng) {
        return window.map.project([latlng.lat, latlng.lng], window.map.getMaxZoom());
    };
    window.pixelsToLatLng = function (x, y) {
        return window.map.unproject([x, y], window.map.getMaxZoom());
    };

    /*var mapBounds = new L.LatLngBounds(
      map.unproject([-8576/2, -8576/2], mapMaxZoom),
      map.unproject([8576/2, 8576/2], mapMaxZoom));*/


    map.fitBounds(mapBounds);

    //L.rectangle(mapBounds).addTo(map);

    L.tileLayer('maps/1944map/{z}/{y}/{x}.jpg', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        bounds: mapBounds,
        noWrap: true,
        tms: false,
        maxBoundsViscosity: 1.0
    }).addTo(map);

    L.marker([0, 0]).addTo(map).on('click', function () {
        onClick(0);
    });

    L.marker([-128, 128]).addTo(map).on('click', function () {
        onClick(1);
    });

    L.marker([294, -470]).addTo(map).bindPopup("Casa di Mirko");

    var popup = L.popup();

    //function onMapClick(e) {
    //    popup
    //        .setLatLng(e.latlng)
    //        .setContent("You clicked in " + e.latlng.toString())
    //        .openOn(map);
    //} .4

    //map.on('click', onMapClick);

    //map.on('drag', function () {
    //    map.panInsideBounds(mapBounds, { animate: false });
    //});


    // USing Leaflet.Coordinates plugin at https://github.com/MrMufflon/Leaflet.Coordinates

     //Patch first to avoid longitude wrapping.
    //L.Control.Coordinates.include({
    //    _update: function (evt) {
    //        var pos = evt.latlng,
    //            opts = this.options;
    //        if (pos) {
    //            //pos = pos.wrap(); // Remove that instruction.
    //            this._currentPos = pos;
    //            this._inputY.value = L.NumberFormatter.round(pos.lat, opts.decimals, opts.decimalSeperator);
    //            this._inputX.value = L.NumberFormatter.round(pos.lng, opts.decimals, opts.decimalSeperator);
    //            this._label.innerHTML = this._createCoordinateLabel(pos);
    //        }
    //    }
    //});

    //L.control.coordinates({
    //    position: "bottomleft",
    //    decimals: 0, //optional default 4
    //    decimalSeperator: ".", //optional default "."
    //    labelTemplateLat: "Latitude: {y}", //optional default "Lat: {y}"
    //    labelTemplateLng: "Longitude: {x}", //optional default "Lng: {x}"
    //    enableUserInput: true, //optional default true
    //    useDMS: false, //optional default false
    //    useLatLngOrder: true, //ordering of labels, default false-> lng-lat
    //    markerType: L.marker, //optional default L.marker
    //    markerProps: {} //optional default {}
    //}).addTo(map);

    function onClick(index) {
        DotNet.invokeMethodAsync('CeraUnaVolta', 'UpdateMessageCaller', index);
    }


}