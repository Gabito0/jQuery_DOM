// keep track of which element remove
let currentId = 0;
// list of all movies in memory for sorting /repainting
let moviesList = [];

$(function(){
    // when you click the delete button, remove the closeest parent tr

    $("#movie-form").on('submit', function(e){
        e.preventDefault();
        console.log('works?')
        let title = $('#name').val();
        let rating = $('#ratings').val();

        let movieData = {title, rating, currentId};
        console.log(movieData)
        currentId++
        moviesList.push(movieData);
        const HTMLtoAppend = createMovieDataHTML(movieData);

        $('#movie-table-body').append(HTMLtoAppend);
        $('#movie-form').trigger('reset');
    })

    // when the delete btn is clicked, remove the closet parent tr adn remove from the array of movies

    $('body').on('click', '.btn.btn-danger', function(evt){
        // find the index where this movie is 
        let indexRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data('deleteId'))
        // console.log(indexRemoveAt)
        //remove it form the array of movies
        moviesList.splice(indexRemoveAt,1);
        //remove it from the DOM    
        $(evt.target).closest('tr').remove();
    });

    //when an arrow is clicked
    $(".fas").on('click', function(evt){

        // figure out what direction we are sorting adn the key to sort by
        let direction = $(evt.target).hasClass('fa-sort-down') ? 'down' : 'up';
        // console.log(direction)
        let keySortBy = $(evt.target).attr('id');
        // console.log(keySortBy)
        let sortedMovies = sortBy(moviesList, keySortBy, direction)

        // empty the table
        $("#movie-table-body").empty();

        // loop over our object of sortedMoives and append a new row
        for(let movie of sortedMovies){
            const HTMLtoAppend = createMovieDataHTML(movie);
            $('#movie-table-body').append(HTMLtoAppend);
        }

        // toggle the arrow
        $(evt.target).toggleClass('fa-sort-down');
        $(evt.target).toggleClass('fa-sort-up');

    })
});

function sortBy(array, keySortBy, direction){
    return array.sort(function(a,b){
        // since rating is a number, we have to convert the string to number
        if(keySortBy === 'rating'){
            a[keySortBy] = +a[keySortBy];
            b[keySortBy] = +b[keySortBy];
        }
        if(a[keySortBy] > b[keySortBy]){
            return direction === 'up' ? 1: -1;
        }else if(b[keySortBy] >a[keySortBy]){
            return direction === 'up'? -1: 1;
        }
        return 0;
    })
    

    
}
function createMovieDataHTML(data){
    return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
            <button class="btn btn-danger" data-delete-id =${data.currentId}>
            Delete
        </td>
    <tr>
    `

}