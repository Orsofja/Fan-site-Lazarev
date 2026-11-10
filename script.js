navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const point = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
        name: "Вы здесь"
    });
    const pointLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [point],
        }),
    });
    point.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
            fill: new ol.style.Fill({
                color: 'red'
            }),
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 2
            })
            }),
            text: new ol.style.Text({
            text: point.get('name'),
            font: '14px Arial',
            offsetY: -18,
            fill: new ol.style.Fill({
                color: '#222'
            }),
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 3
            })
            })
        })
    );
    let map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            pointLayer
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([longitude, latitude]),
            zoom: 10,
        })
    })
});
