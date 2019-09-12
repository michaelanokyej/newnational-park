'use strict'
function getParks(state, results){
    const params = {
        results,
        start:'start=3',
        key: 'api_key=RaYswaUxaB9BWohOoxp1qBuF5mSz9pFYsvP7NOWo'
    };
    fetch(`https://developer.nps.gov/api/v1/parks?${state}&${results}&${params.key}&q=${state}`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.errorMessage').text(`Something went wrong: ${err.message}`);
    });

    function displayResults(responseJson){
        let array = responseJson.data;
        if(array === undefined || array.length === 0){
            alert('Sorry, something went wrong, check input.');
        }else{
            for(let i=0; i < array.length; i++){
                $('.displayedResults').append(`
                <h3>Park Name: ${array[i].fullName}</h3>
                <p>Description: ${array[i].description}</p>
                <p>URL: ${array[i].url}</p>
                `)
            }
        }
        $('section').removeClass('hidden');
    }
}











function callOnSubmit(){
    $('.submitButton').on('click', event =>{
        event.preventDefault();
        $('.displayedResults').empty();
        if($('.maxParks').val() > 10){
            alert('Sorry, choose a number between 1 and 10');
        }else{
        let state = `stateCode=`+$('.state').val();
        let results = `limit=`+$('.maxParks').val();
        console.log(`user = ${state} - user = ${results}`);
        getParks(state, results);
        }
    });
}






$(callOnSubmit);