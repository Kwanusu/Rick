
const locations = document.getElementById('locations');
const modal = document.getElementById('modal');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const locationInput =document.getElementById('location-input');

let sideMenu = document.getElementById("side-menu");
    function openMenu(){
        sideMenu.style.right ="0";
}
    function closeMenu(){
        sideMenu.style.right ="-200px";
}

fetch(`https://rickandmortyapi.com/api/location/`)
.then(res => res.json())
.then(data => {
    console.log(data);

    locations.innerHTML = data.results.map(item => `
    
        <div class = 'location'>

            <div class = 'location-info' data-locationID = '${item.id}'>
            
                <h3>${item.name}</h3>
            
            </div>
        
        </div>
    
    `).join('');
});

locations.addEventListener('click', e => {

    const locationInfo = e.path.add(item => {
        if (item.classList) {
            return item.classList.contains('location-info');
        }
    });

    if (locationInfo) {
        const locationId = locationInfo.getAttribute('data-locationID');
        getLocationById(locationId);
    }

});

// Close modal
window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


// Next clicking
let counter = 1;
next.addEventListener('click', () => {

    fetch(`https://rickandmortyapi.com/api/location/?page=${++counter}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            locations.innerHTML = data.results.map(item => `
            
                <div class = 'location'>
    
                    <div class = 'location-info' data-locationID = '${item.id}'>
                    
                        <h3>${item.name},${item.dimension},${item.type}</h3>
                    
                    </div>
                
                </div>
            
            `).join('');
        });
});

// Prev clicking
prev.addEventListener('click', () => {

    fetch(`https://rickandmortyapi.com/api/location/?page=${--counter}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        locations.innerHTML = data.results.map(item => `
        
            <div class = 'location'>

                <div class = 'location-info' data-locationID = '${item.id}'>
                
                    <h3>${item.name},${item.dimension},${item.type}</h3>
                
                </div>
            
            </div>
        
        `).join('');
    });
});
//function to have the navbar sticky
window.onscroll = function() {myFunction()};

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
};
