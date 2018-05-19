//////////////////// GLOBALS ////////////////////
var isLoading = $(".blockui");
var destinationCount = 1;
var destinationIDs = [];
var origin = 0
//////////////////// GLOBALS ////////////////////
$(isLoading).show();

$(function () {
    initiateNewTripHandlers();
    createNewDestinationHandlers();
    checkLocalStorageForTrips();
    getDestinations();
    removeSavedTripsHandlers()
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
    initOriginCity();
    initDestinationsSearchBox();
    initReturnToTripListHandler()
    // custom search box message persian date picker initialization
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
                    minDate: unix +  86400000
                };
                to.setDate(unix + 86400000);
                if (to.touched) {
                    if (unix > cachedValue) {
                        $('#display-date-to').html(`${settings_planner.end_date_text}`);
                        $('#date_to').val(unix)
                        to.setDate(unix + 86400000);
                    } else {
                        to.setDate(cachedValue);
                    }
                }
            }

            var sd = new persianDate(from.getState().selected.unixDate);
            $('#display-date-from').html(`${sd.year()}/${sd.month()}/${sd.date()}`);
        }
    });

    // create new trip button
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

        if ($("#display-date-from").text() ===  $("#display-date-to").text()) {
            $.notify(settings_planner.same_date, {
                type: "warning",
                delay: 5000
            });
            $(isLoading).fadeOut(500);
            return;
        }

        if ($("#date-from").val() ===  $("#date-to").val()) {
            $.notify(settings_planner.same_date, {
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
            // stops.push({"destination_id": value, "order_index": key}) // with order
            stops.push({"destination_id": value})
        });
        var payload = {
            "start_date": sd.getFullYear() + '-' + (sd.getMonth() + 1) + '-' + sd.getDate(),
            "end_date": ed.getFullYear() + '-' + (ed.getMonth() + 1) + '-' + ed.getDate(),
            origin: {
                "destination_id": origin
            },
            stops: stops
        }
        $.ajax({
            url: settings_planner.destinations_create_url, type: "POST",
            // headers: {     Authorization: `JWT ${getToken()}` },
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $.notify(settings_planner.success_post, {
                    type: "success",
                    delay: 5000
                });
                resetNewTripForm(to, from)
                saveTripInLocalStorage(data)
                // addTripToTripList(data)
                checkLocalStorageForTrips()
                prepareTimelineView(data)
                prepareMap(data)
                $(isLoading).fadeOut(500)

                // localStorage.setItem('test', JSON.stringify(data));

            },
            error: function (data) {
                $.notify(data.responseJSON.status_text, {
                    type: "danger",
                    delay: 5000
                });
                $(isLoading).hide();
            },
            always: function () {
                $(isLoading).fadeOut(500);
            }
        });
        console.log(payload)
    })

    initTripHeadersHandlers()
});

function createNewDestinationHandlers() {

    $('.create-new-destination')
        .on('click', function (e) {
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
            initDestinationsSearchBox();
        });
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
}

function initDestinationsSearchBox() {
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

function initOriginCity() {
    var results = prepareDestinations();
    $('.ui.search.origin').search({
        source: results,
        minCharacters: 1,
        onSelect: function (result, response) {
            origin = result.id
            return true;
        }
    });
}

function getDestinations() {
    var url = settings_planner.destinations_url;
    $.ajax({
        url: url, type: "GET",
        // headers: { Authorization: `JWT ${getToken()}` },
        success: function (data) {
            localStorage.setItem("cities", JSON.stringify(data));
            initDestinationsSearchBox();
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
    var destinations = JSON.parse(localStorage.getItem('cities'));
    var results = [];
    $.each(destinations, function (index, dest) {
        results.push({title: dest.local_name, id: dest.id})
    });
    return results;
}

function initiateNewTripHandlers() {
    $('a[href="#new-trip"]')
        .on("click", function (event) {
            event.preventDefault();
            $("#new-trip").addClass("open");
            $('#new-trip > form > .origin').focus();
        });

    $("#new-trip, #new-trip button.close").on("click keyup", function (event) {
        if (
        // event.target == this ||
        event.target.className == "close" || event.keyCode == 27) {
            $(this).removeClass("open");
        }
    });
}

function checkLocalStorageForTrips() {
    var ls = localStorage.getItem("triphistory")
    if (ls === null) {
        ///////////// no trips had been stored
        var message = $('.message-title');
        $(message).html(settings_planner.no_trips_yet);
        $(message).show();

    } else {
        ///////////// trips object exist
        var trips = JSON.parse(ls);
        var message = $('.message-title');
        $(message).empty()
        var tripCount = trips.trips.length;
        if (tripCount === 0) {
            $(message).html(settings_planner.no_trips_yet);
        }
        updateTitlesCount(tripCount)
        var template = generateTripHeaders(trips.trips)

        $(message).append(template)
        $(message).fadeIn(500)
    }

    $(isLoading).fadeOut(500);
}

function saveTripInLocalStorage(data) {
    var ls = localStorage.getItem("triphistory")
    if (ls === null) {
        var triphistory = {
            count: 1,
            trips: []
        }
        triphistory
            .trips
            .push(data);
        localStorage.setItem('triphistory', JSON.stringify(triphistory))
    } else {
        ///////////// trips object exist
        var triphistory = JSON.parse(ls);
        triphistory.count = triphistory.count + 1
        triphistory
            .trips
            .push(data)
        localStorage.setItem('triphistory', JSON.stringify(triphistory))
    }
}

function resetNewTripForm(to, from) {
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
    $("#new-trip").removeClass("open")
}

function generateTripHeaders(trips) {
    var template = '';
    $.each(trips, function (key, value) {
        template += `
            <div class="trip-heading" data-index="${value.identifier}">
                <div class="trip-heading-title">
                    <a href="#">${value.title}</a>
                </div>
                <div class="remove-saved-trip">
                    <a href="#">
                        <i class="fa fa-trash"></i>
                    </a>
                </div>
            </div>
        `;
    });

    return template;
}

function initTripHeadersHandlers() {
    $('.trips')
        .on('click', '.trip-heading-title', function (e) {
            e.preventDefault()
            var uuid = $(this)
                .parent()
                .data('index')
            var ls = getParsedTripHistory()
            var index
            var trips = $.each(ls.trips, function (key, value) {
                if (value.identifier === uuid) {
                    index = key
                }
            })
            prepareMap(trips[index])
            prepareTimelineView(trips[index])            

        })
}

function getParsedTripHistory() {

    return JSON.parse(localStorage.getItem('triphistory'))
}

function addTripToTripList(data) {
    var trips = [data]
    var template = generateTripHeaders(trips)
    var message = $('.message-title')
    var ls = localStorage.getItem("triphistory")
    var t = JSON.parse(ls)
    var tripCount = t.trips.length;
    updateTitlesCount(tripCount)
    message.append(template)

}

function removeSavedTripsHandlers() {
    $('.trips')
        .on('click', '.remove-saved-trip', function (e) {
            e.preventDefault();
            var el = $(this).parent()
            var indexToRemove = $(el).data('index')
            $(el).hide(500, function () {
                $(this).remove()
            })
            removeTripFromLocalStorage(indexToRemove, hideLoading)
        });
}

function showLoading(time) {
    $(isLoading).fadeIn(time);
}

function hideLoading(time) {
    $(isLoading).fadeOut(time);
}

function removeTripFromLocalStorage(index, toggleLoading) {
    var ls = JSON.parse(localStorage.getItem('triphistory'))
    var localIndex
    var a = $.each(ls.trips, function (key, value) {
        if (value.identifier === index) {
            localIndex = key
        }
    })
    ls
        .trips
        .splice(localIndex, 1)
    ls.count -= 1
    localStorage.setItem('triphistory', JSON.stringify(ls))
    updateTitlesCount(ls.count)
    toggleLoading(500)
}

function updateTitlesCount(newCount) {
    // $("#tripCount").html(`${settings_planner.trip_count} (${newCount}) `);
    $("#title-tripcount").html(`${settings_planner.trip_count} (${newCount}) `);
}

function prepareTimelineView(data) {
    $(isLoading).show();
    // data = JSON.parse(localStorage.getItem('test'));

    var transit_mode = findTransitMode(data.end.transit_mode)

    // sumamry
    $(".trip-name").html(data.title)
    $(".trip-duration").html(`${data.local_start_date} - ${data.local_end_date}`)

    //orogin
    $("#origin_local_departure").html(`${settings_planner.start_time}: ${data.origin.local_departure}`);
    $("#origin_name").html(data.origin.destination.name)

    //end
    $("#end_transit_mode").html(`${transit_mode}`);
    $("#end_distance_to_reach").html(`${data.end.distance_to_reach}`);
    $("#end_duration_to_reach").html(`${data.end.duration_to_reach}`);
    $("#destination_local_arrival").html(`${data.end.local_arrival}`);
    $("#destination_name").html(`${data.end.destination.name}`);
    var template = "";
    $.each(data.stops, function (key, value) {
        template += (tripTemplate(value));
    });

    var container = $(".row.stops");
    $(container).empty()
    container.append(template);

    $('.center-wrapper.top').fadeOut(500, function (e) {
        $('.center-wrapper.tabs').fadeIn(500);
    });

    document
                .getElementById("defaultOpen")
                .click();

    $(isLoading).hide();

}

function tripTemplate(stop) {
    var transit_mode = findTransitMode(stop.transit_mode)

    var template = `
        <div class="data">
            <div class="logo">
                ${transit_mode}
            </div>
            <div class="detail">
                <span class="text">${stop.distance_to_reach}</span>
                <span class="text">${stop.duration_to_reach}</span>
            </div>
        </div>
        <div class="raised">
            <div class="title">
                <span>${stop.destination.name}</span>
                <span>${stop.duration}</span>
            </div>
            <div class="subtitle">${settings_planner.arrival_time}: ${stop.local_arrival}</div>
            <div class="subtitle">${settings_planner.leaving_time}: ${stop.local_departure}</div>
        </div>           
     `;
    return template;
}

function findTransitMode(mode) {
    var transit_mode = "";
    switch (mode) {
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

    return transit_mode
}

function prepareMap(data) {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        var directionsDisplay;
        var directionsService = new google
            .maps
            .DirectionsService();
        var map;
        // data = JSON.parse(localStorage.getItem('test'));

        function initialize() {
            directionsDisplay = new google
                .maps
                .DirectionsRenderer({suppressMarkers: true});
            var mapOptions = {
                center: new google
                    .maps
                    .LatLng(data.origin.destination.lat, data.origin.destination.lng),
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google
                .maps
                .Map(document.getElementById('mapcontainer'), mapOptions);
            directionsDisplay.setMap(map);
            // google.maps.event.addDomListener(document.getElementById('routebtn'),
            // 'click', calcRoute);
        }

        function addMarkers() {
            var marker,
                i;
            marker = new google
                .maps
                .Marker({
                    position: new google
                        .maps
                        .LatLng(data.origin.destination.lat, data.origin.destination.lng),
                    map: map,
                    label: "مبدا"
                });

            var waypts = [];

            $.each(data.stops, function (key, value) {
                marker = new google
                    .maps
                    .Marker({
                        position: new google
                            .maps
                            .LatLng(value.destination.lat, value.destination.lng),
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
                travelMode: 'DRIVING'
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
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBFndaoH80NlVGRjJrwr_Jl-ko2CpWm' +
                'tSU',
        () => {
            var directionsDisplay;
            var directionsService = new google
                .maps
                .DirectionsService();
            var map;
            // data = JSON.parse(localStorage.getItem('test'));

            function initialize() {
                directionsDisplay = new google
                    .maps
                    .DirectionsRenderer({suppressMarkers: true});
                var mapOptions = {
                    center: new google
                        .maps
                        .LatLng(data.origin.destination.lat, data.origin.destination.lng),
                    zoom: 5,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google
                    .maps
                    .Map(document.getElementById('mapcontainer'), mapOptions);
                directionsDisplay.setMap(map);
                // google.maps.event.addDomListener(document.getElementById('routebtn'),
                // 'click', calcRoute);
            }

            function addMarkers() {
                var marker,
                    i;
                marker = new google
                    .maps
                    .Marker({
                        position: new google
                            .maps
                            .LatLng(data.origin.destination.lat, data.origin.destination.lng),
                        map: map,
                        label: "مبدا"
                    });

                var waypts = [];

                $.each(data.stops, function (key, value) {
                    if (data.origin.destination.lat !== value.destination.lat && data.origin.destination.lng !== value.destination.lng) {
                        marker = new google
                            .maps
                            .Marker({
                                position: new google
                                    .maps
                                    .LatLng(value.destination.lat, value.destination.lng),
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
                    travelMode: 'DRIVING'
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

function initReturnToTripListHandler() {
    $('#reset')
        .on('click', function (e) {
            e.preventDefault;
            resetPage();
            // preparePlannedTrip();
        });

    $("#title-tripcount").on('click', function (e) {
        e.preventDefault;
        resetPage();        
    });
}

function resetPage() {
    var container = $(".tm");
    container.empty();
    $("#local_start_date").html("");
    $("#origin_name").html("")
    $('#tab-section').fadeOut(500, function (e) {
        $('#planning-section').fadeIn(500);
    });
    $('.input.prompt').val("")
    destinationCount = 1;
    destinationIDs = [];
    origin = 0
}