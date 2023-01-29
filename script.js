const input = document.querySelector('.input');
const dropdownList = document.querySelector('.dropdown-list');
const list = document.querySelector('.list');



async function dropdownMenu() {
  try {
    input.value = input.value.trim();
    if (input.value === '') {
      dropdownList.innerHTML = '';
      return
    }

    const response = await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=5`);
    const data = await response.json();
    if (data.items) {
      dropdownList.innerHTML = '';
      data.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.classList.add('dropdown-el');

        li.addEventListener('click', () => {
          list.insertAdjacentHTML('beforeend', 
          `<li class="list__element">
            <p>Name: ${item.name}</p>
            <p>Owner: ${item.owner.login}</p>
            <p>Stars: ${item.stargazers_count}</p>
            <button class="close-button"></button>
          </li>`);
          const closeButtons = document.querySelectorAll('.close-button');
          closeButtons.forEach((button) => {
            button.addEventListener('click', () => {
              button.parentElement.remove()
            })
          })
          console.log()
          dropdownList.innerHTML = '';
          input.value = '';
        });
        dropdownList.append(li);
      });
    }
  }
  catch(error) {
    console.log(error)
  }
}

const debounce = (fn, debounceTime) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() =>{
          fn.apply(this, args);
      }, debounceTime)
  }
};

function getRepo() {
  input.addEventListener('input', debounce(dropdownMenu, 400));
}

// function closeButton() {

// }

getRepo()