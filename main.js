
//Characters

let page = 1;

$('#prev').click(function () {
   if (page > 1) {
      page--;
      getpage(page);
   }
});

$('#next').click(function () {
   page++;
   getpage(page);
});



function getpage(page = 1) {

   axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)


      .then((res) => {
         console.log(res.data.results[1]);
         $('.charecters').empty()

         $('#currentPage').text(`${page}`);

         for (let el of res.data.results) {
            $('.charecters').append(`<div class="cart">
               <div class="image">
                  <img src="${el.image}">
               </div>
               <div class="name">${el.name}</div>
               <div class="surname">${el.status}</div>
               <div class="gender">${el.gender}</div>
               <div class="location">${el.location.name}</div>
               <button id="btn${el.id}">View</button>
            </div>`)
         }
      })
}

getpage(page)


//Фільтр по виду


$('#speciesFilter').change(function () {
   let specval = $('#speciesFilter').val();


   axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => {

         $('.charecters').empty();


         for (let el of res.data.results) {
            let spec = el.species;

            if (specval === '' || specval === spec) {
               $('.charecters').append(`
                  <div class="cart" id="${el.id}">
                     <div class="image">
                        <img src="${el.image}">
                     </div>
                     <div class="name">${el.name}</div>
                     <div class="status">${el.status}</div>
                     <div class="gender">${el.gender}</div>
                     <div class="location">${el.location.name}</div>
                      <button id="btn${el.id}">View</button>
                  </div>
               `);
            }
         }
      })

});



//Фільтр по статусу

$('#statusFilter').change(function () {
   let statusval = $('#statusFilter').val();


   axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => {

         $('.charecters').empty();


         for (let el of res.data.results) {
            let status = el.status;

            if (statusval === '' || statusval === status) {
               $('.charecters').append(`
                  <div class="cart" id="${el.id}">
                     <div class="image">
                        <img src="${el.image}">
                     </div>
                     <div class="name">${el.name}</div>
                     <div class="status">${el.status}</div>
                     <div class="gender">${el.gender}</div>
                     <div class="location">${el.location.name}</div>
                     <button id="btn${el.id}">View</button>
                  </div>
               `);
            }
         }
      })

});


//Фільтр по гендеру

$('#genderFilter').change(function () {
   let genderval = $('#genderFilter').val();


   axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => {

         $('.charecters').empty();


         for (let el of res.data.results) {
            let gender = el.gender;

            if (genderval === '' || genderval === gender) {
               $('.charecters').append(`
                  <div class="cart" id="${el.id}">
                     <div class="image">
                        <img src="${el.image}">
                     </div>
                     <div class="name">${el.name}</div>
                     <div class="status">${el.status}</div>
                     <div class="gender">${el.gender}</div>
                     <div class="location">${el.location.name}</div>
                     <button id="btn${el.id}">View</button>
                  </div>
               `);
            }
         }
      })

});


$('.wrap').click(function (e) {
   let id = (e.target.id).slice(0, 3);
   if (id == "btn") {
      id = (e.target.id).slice(3);
      console.log(id);

      $('.popup').css('display', 'flex');
      $('.list').css('filter', 'blur(5px)');

      axios.get(`https://rickandmortyapi.com/api/character/${id}`)
         .then(res => {
            console.log(res.data);
            $('.info').empty();
            $('.info').append(`
            <div class="image">
               <img src="${res.data.image}">
            </div>
            <div class="item">
               <div class="name">${res.data.name}</div>
               <div class="status">${res.data.status}</div>
               <div class="gender">${res.data.gender}</div>
               <div class="species">${res.data.species}</div>
               <div class="location">${res.data.location.name}</div>
               <div class="location-url">${res.data.location.url}</div>
               <div class="orgname">${res.data.origin.name}</div>
               <div class="orgurl">${res.data.origin.url}</div>
               <div class="created">${res.data.created}</div>
            </div>
         `);
         })
   }
});



$('#exit').click(function () {
   $('.popup').css('display', 'none')
   $('.list').css('filter', 'none')
})

$('#exit').click(function () {
   $('.popup').css('display', 'none')
   $('.list').css('filter', 'none')
})

$('.characters').click(function () {
   $('.listep').css('display', 'none')
   $('.list').css('display', 'flex')
   $('.listloc').css('display', 'none')
   $('.listwatch').css('display', 'none')
})
$('.episodess').click(function () {
   $('.listep').css('display', 'flex')
   $('.list').css('display', 'none')
   $('.listloc').css('display', 'none')
   $('.listwatch').css('display', 'none')
})
$('.locations').click(function () {
   $('.listep').css('display', 'none')
   $('.list').css('display', 'none')
   $('.listloc').css('display', 'flex')
   $('.listwatch').css('display', 'none')
})
$('.watchlist').click(function () {
   $('.listep').css('display', 'none')
   $('.list').css('display', 'none')
   $('.listloc').css('display', 'none')
   $('.listwatch').css('display', 'flex')
})


//Episodes

let pageep = 1;

$('#prevep').click(function () {
   if (pageep > 1) {
      pageep--;
      getpageep(pageep);
   }
});

$('#nextep').click(function () {
   pageep++;
   getpageep(pageep);
});

$('#searchButton').click(function () {
   const searchName = $('#searchInput').val().trim();
   getpageep(1, searchName);
});

function getpageep(pageep = 1, name = '') {
   let apiUrl = `https://rickandmortyapi.com/api/episode/?page=${pageep}`;

   if (name) {
      apiUrl += `&name=${encodeURIComponent(name)}`;
   }

   axios.get(apiUrl)
      .then((res) => {
         console.log(res.data.results);
         $('.episodes').empty();
         $('#currentPageep').text(`${pageep}`);

         for (let el of res.data.results) {
            $('.episodes').append(`
               <div class="cart">
                  <div class="name">${el.name}</div>
                  <div class="airdate">Air date: ${el.air_date}</div>
               </div>
            `);
         }
      })
      .catch((error) => {
         console.error(error);
         alert("No such name found, try another one!");
      });
}

getpageep(pageep);


//Locations

let pageloc = 1;

$('#prevloc').click(function () {
   if (pageloc > 1) {
      pageloc--;
      getpageloc(pageloc);
   }
});

$('#nextloc').click(function () {
   pageloc++;
   getpageloc(pageloc);
});



function getpageloc(pageloc = 1) {

   axios.get(`https://rickandmortyapi.com/api/location/?page=${pageloc}`)


      .then((res) => {
         console.log(res.data.results[1]);
         $('#locationn').empty()

         $('#currentPageloc').text(`${pageloc}`);

         for (let el of res.data.results) {
            $('#locationn').append(`<div class="cart">
               <div class="name">${el.name}</div>
               <div class="type">${el.type}</div>
               <div class="dimension">${el.dimension}</div>
            </div>`)
         }
      })
}

getpageloc(pageloc)

//Watchlist

let dataList = JSON.parse(localStorage.getItem('datalist')) || [];

$('#watchbtn').click(function () {
   let searchWatch = $('#searchWatch').val();

   axios.get(`https://rickandmortyapi.com/api/episode?name=${searchWatch}`)
      .then(response => {
         let episode = response.data.results[0];

         if (!dataList.some(el => el.id === episode.id)) {
            dataList.push(episode);
            localStorage.setItem('datalist', JSON.stringify(dataList));
            watchlistLoad();
         } else {
            alert('This episode is already listed, try another one!');
         }
      });
});

console.log(dataList);

function watchlistLoad() {
   $('.watchlistcontainer').empty();

   for (let el of dataList) {
      $('.watchlistcontainer').append(`
         <div class="cart" data-id="${el.id}">
            <div class="inform">
               <div class="name">${el.name}</div>
               <div class="airdate">Air date: ${el.air_date}</div>
            </div>
            <div class="deleteBtn" data-id="${el.id}"><i class="fa-solid fa-xmark fa-lg" style="color: #ff0000;"></i></div>
         </div>
      `);
   }
}

$(document).on('click', '.deleteBtn', function () {
   let idToDelete = $(this).data('id');

   dataList = dataList.filter(el => el.id !== idToDelete);

   localStorage.setItem('datalist', JSON.stringify(dataList));

   watchlistLoad();
});

watchlistLoad();


document.getElementById('burgerIcon').addEventListener('click', function () {
   // Toggle the active class on the icon and filters container
   this.classList.toggle('active');
   document.getElementById('filtersContainer').classList.toggle('active');
});