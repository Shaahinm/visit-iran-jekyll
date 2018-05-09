var isLoading = $(".blockui");
// GLOBALS

var destinationCount = 1;
var destinationIDs = [];
// $(isLoading).show();
$(document).ready(function () {

    $('#btnSubmit').click(function (e) {
        e.preventDefault()
        var sd = new Date(Number($("#date-from").val()))
        var ed = new Date(Number($("#date-to").val()))
        var stops = [];
        $.each(destinationIDs, function (key, value) {
            stops.push({
                "destination_id": value,
                "order_index": key
            })
        });

        var payload = {
            "start_date": sd.getFullYear() + '-' + (sd.getMonth() + 1) + '-' +  sd.getDate(),
            "end_date": ed.getFullYear()  + '-' + (ed.getMonth() + 1) + '-' + ed.getDate(),
            origin_id: 500,
            stops: stops
        }

        $.ajax({
            url: settings_planner.destinations_create_url,
            type: "POST",
            headers: {
                Authorization: `JWT ${getToken()}`
            },
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $.notify(settings_comments_province.success, {
                    type: "success",
                    delay: 5000
                });
                console.log(data);
                $(isLoading).fadeOut(500);
            },
            error: function (data) {
                $.notify(data.responseJSON.status_text, {
                    type: "danger",
                    delay: 5000
                });
                $(isLoading).hide();
            },
            always: function () {
                resetLoginModal();
                $(isLoading).hide();
            }
        });

        console.log(payload)
    })

    // create new destination
    $('.create-new-destination').on('click', function (e) {
        createNewDestination();
    });

    // getDestinations();

    initSearchBox();


    // dates

    var to, from;
    to = $(".trip-date-to").persianDatepicker({
        inline: true,
        altField: '#date-to',
        altFormat: 'u',
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
                "enabled": true
            },
            "text": {
                "btnNextText": "بعدی",
                "btnPrevText": "قبلی"
            }
        },
        "toolbox": {
            "enabled": false,
        },
        onSelect: function (unix) {
            to.touched = true;
            if (from && from.options && from.options.maxDate != unix) {
                var cachedValue = from.getState().selected.unixDate;
                from.options = {
                    maxDate: unix
                };
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
                "enabled": true
            },
            "text": {
                "btnNextText": "بعدی",
                "btnPrevText": "قبلی"
            }
        },
        "toolbox": {
            "enabled": false,
        },
        onSelect: function (unix) {
            from.touched = true;
            if (to && to.options && to.options.minDate != unix) {
                var cachedValue = to.getState().selected.unixDate;
                to.options = {
                    minDate: unix
                };
                if (to.touched) {
                    to.setDate(cachedValue);
                }
            }
            console.log();
            var sd = new persianDate(from.getState().selected.unixDate);
            $('#display-date-from').html(`${sd.year()}/${sd.month()}/${sd.date()}`);
        }
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
            $.notify(settings_profile.server_error, {
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
            title: dest.name,
            id: dest.id
        })
    });
    return results;
}

function createNewDestination() {
    var template = `
    <div class="row">
        <div class="ui search">
            <input class="input prompt" type="text" placeholder="مقصد بعدی را انتخاب نمایید">
            <div class="results"></div>
        </div>
    </div>`;

    $('.destinations').append(template);
    initSearchBox();
}


function initSearchBox() {
    var results = prepareDestinations();
    $('.ui.search')
        .search({
            source: results,
            minCharacters: 1,
            onSelect: function (result, response) {
                window.destinationIDs.push(result.id);
                return true;
            }
        });
}