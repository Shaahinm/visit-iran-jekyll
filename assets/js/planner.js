var isLoading = $(".blockui");
// GLOBALS

var destinationCount = 1;
var destinationIDs = [];
var origin = 0
$(isLoading).show();
$(document).ready(function () {

    // modal

    $('a[href="#new-trip"]').on("click", function (event) {
        event.preventDefault();
        $("#new-trip").addClass("open");
        $('#new-trip > form > input[type="search"]').focus();
    });

    $("#new-trip, #new-trip button.close").on("click keyup", function (event) {
        if (
            // event.target == this ||
            event.target.className == "close" ||
            event.keyCode == 27
        ) {
            $(this).removeClass("open");
        }
    });

    $('#reset')
        .on('click', function (e) {
            e.preventDefault;
            resetPage();
            // preparePlannedTrip();
        });

    // submit form
    $('#btnSubmit').click(function (e) {
        e.preventDefault()
        $(isLoading).show();
        if ($("#date-from").val() === "" || $("#date-to").val() === "" || origin === 0 || destinationIDs.length === 0) {
            $.notify(settings_planner.empty_form, {
                type: "warning",
                delay: 5000
            });
            $(isLoading).fadeOut(500);
            return;
        }
        var sd = new
        Date(Number($("#date-from").val()))
        var ed = new
        Date(Number($("#date-to").val()))
        var stops = [];
        $.each(destinationIDs, function (key, value) {
            stops.push({
                "destination_id": value,
                "order_index": key
            })
        });
        console.log(sd, ed, stops, origin);
        var payload = {
            "start_date": sd.getFullYear() + '-' + (sd.getMonth() + 1) + '-' + sd.getDate(),
            "end_date": ed.getFullYear() + '-' + (ed.getMonth() + 1) + '-' + ed.getDate(),
            origin: {
                "destination_id": origin
            },
            stops: stops
        }
        $.ajax({
            url: settings_planner.destinations_create_url,
            type: "POST",
            // headers: {
            //     Authorization: `JWT ${getToken()}`
            // },
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $.notify(settings_planner.success_post, {
                    type: "success",
                    delay: 5000
                });
                resetForm(to, from)
                $(isLoading).fadeOut(500);
                localStorage.setItem('test', JSON.stringify(data));
                preparePlannedTrip(data)
                prepareMap(data)
            },
            error: function (data) {
                $.notify(data.responseJSON.status_text, {
                    type: "danger",
                    delay: 5000
                });
                $(isLoading).hide();
            },
            always: function () {
                $(isLoading).hide();
            }
        });
        console.log(payload)
    })

    // create new destination
    $('.create-new-destination').on('click', function (e) {
        createNewDestination();
    });

    getDestinations();

    // dropdowns
    $.fn.search.settings.templates.message = function (type, message) {
        html = `
        <div class="message empty">
            <div class="header">
                ${settings_planner.dropdown_no_result_header}
            </div>
            <div class="description">
                ${settings_planner.dropdown_no_result_description}
            </div>
        </div>
        `;
        return html;
    };
    initOrigin();
    initSearchBox();

    // dates
    var to,
        from;
    to = $(".trip-date-to").persianDatepicker({
        inline: true,
        altField: '#date-to',
        altFormat: 'u',
        initialValue: false,
        "scroll": {
            "enabled": false
        },
        "calendar": {
            "persian": {
                "enabled": true,
                "locale": "fa",
                "showHint": true,
                "leapYearMode": "astronomical"
            },
            "gregorian": {
                enabled: false,
                showHint: false,
                locale: 'en'
            }
        },
        "navigator": {
            "enabled": true,
            "scroll": {
                "enabled": false
            },
            "text": {
                "btnNextText": "بعدی",
                "btnPrevText": "قبلی"
            }
        },
        "toolbox": {
            "enabled": false
        },
        onSelect: function (unix) {
            to.touched = true;
            if (from && from.options && from.options.maxDate != unix) {
                var cachedValue = from
                    .getState()
                    .selected
                    .unixDate;
                // from.options = {     maxDate: unix };
                if (from.touched) {
                    from.setDate(cachedValue);
                }
            }
            var sd = new persianDate(to.getState().selected.unixDate);
            $('#display-date-to').html(`${sd.year()}/${sd.month()}/${sd.date()}`);
        }
    });
    from = $(".trip-date-from").persianDatepicker({
        inline: true,
        altField: '#date-from',
        altFormat: 'u',
        minDate: new Date(),
        initialValue: false,
        "calendar": {
            "persian": {
                "enabled": true,
                "locale": "fa",
                "showHint": true,
                "leapYearMode": "astronomical"
            },
            "gregorian": {
                enabled: false,
                showHint: false,
                locale: 'en'
            }
        },
        "navigator": {
            "enabled": true,
            "scroll": {
                "enabled": false
            },
            "text": {
                "btnNextText": "بعدی",
                "btnPrevText": "قبلی"
            }
        },
        "toolbox": {
            "enabled": false
        },
        onSelect: function (unix) {
            from.touched = true;
            if (to && to.options && to.options.minDate != unix) {
                var cachedValue = to
                    .getState()
                    .selected
                    .unixDate;
                to.options = {
                    minDate: unix
                };
                to.setDate(unix);
                if (to.touched) {
                    to.setDate(cachedValue);
                }
            }

            var sd = new persianDate(from.getState().selected.unixDate);
            $('#display-date-from').html(`${sd.year()}/${sd.month()}/${sd.date()}`);
        }
    });

    // remove destination row handler
    $('.destinations').on('click', '.remover', function (e) {
        var order = $(this)
            .closest('.row')
            .data('count');

        if (typeof destinationIDs[order] !== 'undefined') {
            destinationIDs.splice(order, 1);
        }

        destinationCount--;

        $(this)
            .closest('.row')
            .fadeOut(500, function () {
                $(this).remove()
            })
    });

});

function getDestinations() {
    var url = settings_planner.destinations_url;
    $.ajax({
        url: url,
        type: "GET",
        // headers: { Authorization: `JWT ${getToken()}` },
        success: function (data) {
            localStorage.setItem("destination", JSON.stringify(data));
            initSearchBox();
            $(isLoading).fadeOut(500);
        },
        error: function (data) {
            $.notify(settings_planner.server_error, {
                type: "danger",
                delay: 5000
            });
            $(isLoading).hide();
        },
        always: function () {
            $(isLoading).hide();
        }
    });
}

function prepareDestinations() {
    var destinations = JSON.parse(localStorage.getItem('destination'));
    var results = [];
    $.each(destinations, function (index, dest) {
        results.push({
            title: dest.local_name,
            id: dest.id
        })
    });
    return results;
}

function createNewDestination() {
    console.log(destinationIDs, destinationCount);
    var template = `
    <div class="row" data-count="${destinationCount}">
        <div class="ui search destination">
            <input class="input prompt" type="text" placeholder="مقصد بعدی را انتخاب نمایید">
            <div class="results"></div>
        </div>
        <span class="remover">
            <i class="fa fa-trash" style="color: gray"></i>
        </span>
    </div>`;

    $('.destinations.holder').append(template);
    destinationCount++;
    initSearchBox();
}

function initSearchBox() {
    var results = prepareDestinations();
    $('.ui.search.destination').search({
        source: results,
        minCharacters: 1,
        onSelect: function (result, response) {
            var order = $(this)
                .parent()
                .data('count');
            if (typeof destinationIDs[order] === 'undefined') {
                window
                    .destinationIDs
                    .push(result.id);
            } else {
                destinationIDs.splice(order, 1, result.id);
            }

            return true;
        }
    });
}

function initOrigin() {
    var results = prepareDestinations();
    $('.ui.search.origin').search({
        source: results,
        minCharacters: 1,
        onSelect: function (result, response) {
            origin = result.id
            console.log(origin)
            return true;
        }
    });
}

function resetForm(to, from) {
    $('.input.prompt').val("")
    destinationCount = 1;
    destinationIDs = [];
    origin = 0
    $.each($('.row'), function (key, value) {
        if ($(this).data('count') > 0) {
            $(this)
                .fadeOut(500, function () {
                    $(this).remove();
                })
        }
    });

    to.setDate(new Date());
    from.setDate(new Date());

    $('#display-date-from').html(`${settings_planner.start_date_text}`);
    $('#display-date-to').html(`${settings_planner.end_date_text}`);
}

function preparePlannedTrip(data) {
    $(isLoading).show();
    // data = JSON.parse(localStorage.getItem('test'));
    var template = "";
    $.each(data.stops, function (key, value) {
        template += (tripTemplate(value));
    });

    $("#local_start_date").html(data.local_start_date);
    $("#orign_name").html(data.origin.destination.name)
    var container = $(".tm");
    container.append(template);
    $('.trip-planner').fadeOut(500, function (e) {
        $('.trip-timeline').fadeIn(500);
    });

    $("#distance-to-reach").html(`${data.origin.distance_to_reach}<i class="fa fa-car"></i>`);
    $("#duration-to-reach").html(`${data.origin.duration_to_reach}`);
    $("#home_name").html(`${data.origin.destination.name}`);
    $("#local_end_date").html(`${data.local_end_date}`);

}

function tripTemplate(stop) {
    var transit_mode = "";
    switch (stop.transit_mode) {
        case 'drive':
            transit_mode = `<i class="fa fa-car"></i>`;
            break;
        case 'bus':
            transit_mode = `<i class="fa fa-bus"></i>`;
            break;
        case 'train':
            transit_mode = `<i class="fa fa-train" aria-hidden="true"></i>`;
            break;
        case 'train':
            transit_mode = `<i class = "fas fa-plane" > </i>`;
            break;
        default:
            break;
    }
    var image = (stop.destination.images.length > 0) ? stop.destination.images[0] : "/static/tourismiran/assets/images/avatar-placholder.png";
    var template = `
    <div class="container">
        <div class="content">
            <div class="data">
                <div class="distance-to-reach">
                    ${stop.distance_to_reach}
                    ${transit_mode}
                </div>
                <div class="duration-to-reach">
                    ${stop.duration_to_reach}
                </div>
                <div class="local-arrival">
                    ${stop.local_arrival}
                    <i class="fa fa-bell"></i>
                </div>
            </div>
            <div class="image">
                <div class="name">
                    ${stop.destination.name}
                </div>
                <img src="http://visitiran.ir${image}" alt="">
            </div>
            <div class="data bottom">
                <div class="local-departure">
                <i class="fa fa-hourglass"></i>
                    ${stop.local_departure}
                </div>
            </div>
        </div>
    </div>
    `;

    return template;
}

function resetPage() {
    var container = $(".tm");
    container.empty();
    $("#local_start_date").html("");
    $("#orign_name").html("")
    $('.trip-timeline').fadeOut(500, function (e) {
        $('.trip-planner').fadeIn(500);
    });
    $('.input.prompt').val("")
    destinationCount = 1;
    destinationIDs = [];
    origin = 0
}

function prepareMap(data) {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        // data = JSON.parse(localStorage.getItem('test'));

        function initialize() {
            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });
            var mapOptions = {
                center: new google.maps.LatLng(data.origin.destination.lat, data.origin.destination.lng),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('mapcontainer'), mapOptions);
            directionsDisplay.setMap(map);
            // google.maps.event.addDomListener(document.getElementById('routebtn'), 'click', calcRoute);
        }

        function addMarkers() {
            var marker, i;
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(data.origin.destination.lat, data.origin.destination.lng),
                map: map,
                label: "مبدا",
            });

            var waypts = [];

            $.each(data.stops, function (key, value) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value.destination.lat, value.destination.lng),
                    map: map,
                    // icon: markerIcon,
                    label: "" + (key + 1)
                });

                waypts.push({
                    location: {
                        lat: value.destination.lat,
                        lng: value.destination.lng
                    },
                    stopover: true
                });

            });

            directionsService.route({
                origin: {
                    lat: data.origin.destination.lat,
                    lng: data.origin.destination.lng
                },
                destination: {
                    lat: data.origin.destination.lat,
                    lng: data.origin.destination.lng
                },
                waypoints: waypts,
                // optimizeWaypoints: true,
                travelMode: 'DRIVING',
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
        initialize()
        addMarkers()

    } else {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBFndaoH80NlVGRjJrwr_Jl-ko2CpWmtSU', () => {
            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            var map;
            data = JSON.parse(localStorage.getItem('test'));

            function initialize() {
                directionsDisplay = new google.maps.DirectionsRenderer({
                    suppressMarkers: true
                });
                var mapOptions = {
                    center: new google.maps.LatLng(data.origin.destination.lat, data.origin.destination.lng),
                    zoom: 5,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById('mapcontainer'), mapOptions);
                directionsDisplay.setMap(map);
                // google.maps.event.addDomListener(document.getElementById('routebtn'), 'click', calcRoute);
            }

            function addMarkers() {
                var marker, i;
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.origin.destination.lat, data.origin.destination.lng),
                    map: map,
                    label: "مبدا",
                });

                var waypts = [];

                $.each(data.stops, function (key, value) {
                    if (data.origin.destination.lat !== value.destination.lat && data.origin.destination.lng !== value.destination.lng) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(value.destination.lat, value.destination.lng),
                            map: map,
                            // icon: markerIcon,
                            label: "" + (key + 1)
                        });

                    }
                    waypts.push({
                        location: {
                            lat: value.destination.lat,
                            lng: value.destination.lng
                        },
                        stopover: true
                    });

                });

                directionsService.route({
                    origin: {
                        lat: data.origin.destination.lat,
                        lng: data.origin.destination.lng
                    },
                    destination: {
                        lat: data.origin.destination.lat,
                        lng: data.origin.destination.lng
                    },
                    waypoints: waypts,
                    // optimizeWaypoints: true,
                    travelMode: 'DRIVING',
                }, function (response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }
            initialize()
            addMarkers()
        })
    }
}


// maps