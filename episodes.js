
const episodes = document.getElementById('episodes');
const modal = document.getElementById('modal');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const episodeInput =document.getElementById('episode-input');

let sideMenu = document.getElementById("side-menu");
    function openMenu(){
        sideMenu.style.right ="0";
}
    function closeMenu(){
        sideMenu.style.right ="-200px";
}

fetch(`https://rickandmortyapi.com/api/episode/`)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        episodes.innerHTML = data.results.map(item => `
        
            <div class = 'episodes'>

                <div class = 'episode-info' data-episodeID = '${item.id}'>
                
                    <h3>${item.name}</h3>
                
                </div>
            
            </div>
        
        `).join('');
    });
    
episodes.addEventListener('click', e => {

    const episodeInfo = e.path.add(item => {
        if (item.classList) {
            return item.classList.contains('episode-info');
        }
    });

    if (episodeInfo) {
        const episodeId = episodeInfo.getAttribute('data-episodeID');
        getEpisodeById(episodeId);
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
 
     fetch(`https://rickandmortyapi.com/api/episode/?page=${++counter}`)
         .then(res => res.json())
         .then(data => {
             console.log(data);
 
             episodes.innerHTML = data.results.map(item => `
             
                 <div class = 'episode'>
     
                     <div class = 'episode-info' data-episodeID = '${item.id}'>
                     
                         <h3>${item.name}</h3>
                     
                     </div>
                 
                 </div>
             
             `).join('');
         });
 });
 
 // Prev clicking
 prev.addEventListener('click', () => {
 
     fetch(`https://rickandmortyapi.com/api/episode/?page=${--counter}`)
         .then(res => res.json())
         .then(data => {
             console.log(data);
 
             episodes.innerHTML = data.results.map(item => `
             
                 <div class = 'episode'>
     
                     <div class = 'episode-info' data-episodeID = '${item.id}'>
                     
                         <h3>${item.name}</h3>
                     
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
    