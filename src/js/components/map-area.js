import React, {Component} from 'react';
import '../../css/components/map-area.css';

class MapArea extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // Invoked immediately after this component is mounted.

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
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    map.setCenter(pos);
                }, () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }) :
                handleLocationError(false, infoWindow, map.getCenter());

            // Error handlers

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.':
                    'Error: Your browser doesn\'t support geolocation.');
            }
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