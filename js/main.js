const pokemon = pokemons;
const elList = document.querySelector(".hero__pokemons-list");
const temp = document.querySelector(".hero__temp").content;
const fragment  = document.createDocumentFragment();
const elForm = document.querySelector(".site-header__form");
const elInput = elForm.querySelector(".site-header__form-inp");
const btnList = document.querySelector(".site-header__sort-btn-list");
// const modal = document.querySelector(".modal-body");
const modalList = document.querySelector(".modal-list");


function render(arr,node,inpvalue) {
    node.innerHTML = "";
    arr.forEach(item =>{
        
        const tempClone = temp.cloneNode(true);
        tempClone.querySelector(".hero__pokemons-item-img").src = item.img;
        tempClone.querySelector(".hero__pokemons-item-name").textContent = item.name;
        tempClone.querySelector(".hero__item-pokemons-weight").textContent = ` ${item.weight}`;
        tempClone.querySelector(".hero__item-pokemons-height").textContent = ` ${item.height}`;
        tempClone.querySelector(".hero__item-pokemons-egg").textContent =`${textContent = item.egg}`;
        tempClone.querySelector(".hero__item-pokemons-candy-count").textContent = ` ${item.candy_count}`;
        tempClone.querySelector(".hero__item-pokemons-btn").dataset.id= item.id
        
        const regax =  new RegExp(`${inpvalue}`,"gi");      ///inpvalue,gi/;
        if (inpvalue) {
            tempClone.querySelector(".hero__pokemons-item-name").innerHTML = item.name.replace(regax,`<span class ="mark">$&</span>`);
        }
        
        fragment.appendChild(tempClone);
    })
    node.appendChild(fragment)
}
render(pokemon,elList)

// elForm.addEventListener("submit",evt => {
//     evt.preventDefault();
//     const searchedItem = elForm.children[0].value.trim();

// })
elInput.addEventListener("keyup",evt => {
    evt.preventDefault();
    const searchValeu = elInput.value.trim().toLowerCase();
    const searchedItems = pokemon.filter(item => item.name.toLowerCase().includes(searchValeu))
    render(searchedItems,elList,searchValeu)
})



btnList.addEventListener("click",evt => {
    evt.preventDefault();
    if (evt.target.matches(".site-hero__sort-btn--a-z")) {
        const sortedarr  = pokemon.sort((a,b) => {
            const first = a.name.toLowerCase().charCodeAt(0);
            const second = b.name.toLowerCase().charCodeAt(0);
            return first - second;
        })
        render(sortedarr,elList)
    }
    if (evt.target.matches(".site-hero__sort-btn--z-a")) {
        const sortedarr  = pokemon.sort((a,b) => {
            const first = a.name.toLowerCase().charCodeAt(0);
            const second = b.name.toLowerCase().charCodeAt(0);
            return second - first;
        })
        render(sortedarr,elList)
        
    }
})

elList.addEventListener("click",evt => {
    if (evt.target.matches(".hero__item-pokemons-btn")) {
        // modalList.textContent = "";
        const findItem = pokemon.find(item => item.id == evt.target.dataset.id)
        const modalTitle = document.querySelector(".modal-title").textContent = findItem.name
        modalList.children[0].textContent = `CANDY:${findItem.candy}`;
        modalList.children[1].textContent = `AVG_SPAWNS: ${findItem.avg_spawns}`;
        modalList.children[2].textContent = `SPAWN_TIME ${findItem.spawn_time}`;
        modalList.children[3].textContent = `MULTIPLAYERS: ${findItem.multipliers[0]}`;

    }
})