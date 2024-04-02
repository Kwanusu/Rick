
const characters = document.getElementById('characters');
const modal = document.getElementById('modal');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const characterInput =document.getElementById('characterInput');

let sideMenu = document.getElementById("side-menu");
    function openMenu(){
        sideMenu.style.right ="0";
}
    function closeMenu(){
        sideMenu.style.right ="-200px";
}

fetch(`https://rickandmortyapi.com/api/character/`)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        characters.innerHTML = data.results.map(item => `
        
            <div class = 'character'>
            
                <img src = '${item.image}' />

                <div class = 'character-info' data-characterID = '${item.id}'>
                
                    <h3>${item.name},${item.status},${item.gender},${item.species}</h3>
                
                </div>
            
            </div>
        
        `).join('');
    });
    
    characters.addEventListener('click', e => {

        const characterInfo = e.path.add(item => {
            if (item.classList) {
                return item.classList.contains('character-info');
            }
        });
    
        if (characterInfo) {
            const characterId = characterInfo.getAttribute('data-characterID');
            getCharacterById(characterId);
        }
    
    });
    
    //Close modal
    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    
    // Next clicking
    let counter = 1;
    next.addEventListener('click', () => {
    
        fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
    
                characters.innerHTML = data.results.map(item => `
                
                    <div class = 'character'>
                    
                        <img src = '${item.image}' />
        
                        <div class = 'character-info' data-characterID = '${item.id}'>
                        
                            <h3>${item.name},${item.status},${item.gender},${item.species}}</h3>
                        
                        </div>
                    
                    </div>
                
                `).join('');
            });
    });
    
    // Prev clicking
    prev.addEventListener('click', () => {
    
        fetch(`https://rickandmortyapi.com/api/character/?page=${--counter}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
    
                characters.innerHTML = data.results.map(item => `
                
                    <div class = 'character'>
                    
                        <img src = '${item.image}' />
        
                        <div class = 'character-info' data-characterID = '${item.id}'>
                        
                            <h3>${item.name},${item.status},${item.gender},${item.species}</h3>
                        
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
    
