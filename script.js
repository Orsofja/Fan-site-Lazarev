let condition = true;
let start = 0;
let end = 0;

$('.nav-small-icon').click(function () {
    if(condition) {
        forward();
    }
    else {
        backward();
    }
})

$('.container').on('touchstart', function (event) {
    start = event.originalEvent.touches[0].pageX;
})

$('.container').on('touchend', function (event) {
    end = event.originalEvent.changedTouches[0].pageX;
    if (end - start >= 100 && condition) {
        forward();
    }
    else if (start - end >= 100 && !condition) {
        backward();
    }
})

function forward() {
    anime({
        targets: '.nav-small',
        translateX: ['-100%', '0'],
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });
    anime({
        targets: '.icon',
        rotate: 90,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });
    anime({
        targets: '.stick',
        rotate: 180,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });
    condition = !condition;
}

function backward() {
    anime({
        targets: '.nav-small',
        translateX: ['0', '-100%'],
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });
    anime({
        targets: '.icon',
        rotate: 0,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });
    anime({
        targets: '.stick',
        rotate: 0,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });
    condition = !condition;
}

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