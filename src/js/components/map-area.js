import React, {Component} from 'react';
import '../../css/components/map-area.css';
import regionEngLdnCity from '../../assets/geojson/eng.ldn.city.geojson';

class MapArea extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // Invoked immediately after this component is mounted.

        // Global variables
        const isGeoLocationEnabled = this.props.enableGeoLocation;

        function initMap() {

            // Create a Google Map
            const map = new google.maps.Map(document.getElementById('map-area'), {
                center: {lat: 51.514727, lng: -0.08152},
                zoom: 18
            });
            map.setOptions({
                minZoom: 5
            });

            // Create an Info Window
            const infoWindow = new google.maps.InfoWindow({map: map});

            // Setup geolocation to find user's location.
            (navigator.geolocation) ?
                navigator.geolocation.getCurrentPosition((position) => {
                    let pos;

                    // This is more for debugging purposes. Should remove in production.
                    (isGeoLocationEnabled) ?
                        pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        } :
                        pos = map.getCenter();

                    // Center map view
                    infoWindow.setPosition(pos),
                    infoWindow.setContent('Location found.'),
                    map.setCenter(pos)
                }, () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }) :
                handleLocationError(false, infoWindow, map.getCenter());

            // Geolocation error handlers
            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
            }


            // Load region boundaries 2
            try {
                const cityFeature = addCity();
                console.log(cityFeature.length);
                let i;
                for (i = 0; i < cityFeature.length; i++) {
                    map.data.overrideStyle(cityFeature[i], {
                        clickable: false,
                        fillColor: '#C8E6C9', // Green 100
                        strokeWeight: 1
                    })
                }
            } catch (e) {
                console.log('Something went wrong.')
            }

            function addCity() {
                try {
                    console.log('ello');
                    return map.data.addGeoJson(regionEngLdnCity, { idPropertyName: 'CITY'});
                } catch(e) {
                    console.log('Cannot load geojson.');
                }
            }


            // Load region boundaries
            /*loadRegionBoundaries().then((features) => {
                let i;
                for (i = 0; i < features.length; i++) {
                    map.data.overrideStyle(features[i], {
                        clickable: false,
                        fillColor: '#C8E6C9', // Green 100
                        strokeWeight: 1
                    })
                }
            }).catch((e) => {
                console.log('Error: Something went wrong.');
            });

            function loadRegionBoundaries() {
                return new Promise((resolve, reject) => {
                    try {
                        map.data.loadGeoJson(
                            regionEngLdnCity,
                            {idPropertyName: 'BOUNDARY'},
                            (features) => {
                                resolve(features);
                            }
                        );
                    } catch (e) {
                        reject(e);
                    }
                })
            }*/


            /*map.data.loadGeoJson(
             'assets/geojson/eng.ldn.city.geojson',
             {idPropertyName: 'BOUNDARY'},
             () => {
             console.log('Region boundaries loaded.');
             map.data.setStyle({
             fillColor: '#81C784', // Green 300
             strokeWeight: 1
             });
             }
             );*/

        }

        initMap();
    }

    render() {
        return (
            <div id="map-area">

            </div>
        )

    }
}

export default MapArea