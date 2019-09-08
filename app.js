//DEFINIR VARIABLES UI
const input = document.querySelector('#task');
const btnAgregar = document.querySelector('.btn-agregar');
const btnLimpiar = document.querySelector('.clear-tasks');
const filtro = document.querySelector('#filter');
const listaItems = document.querySelector('.collection');

//CARGAR TODOS LOS EVENT LISTENERS
cargarEventListeners()

//CARGAR TODOS LOS EVENT LISTENERS
function cargarEventListeners(){
  //Evento Cargar DOM
  document.addEventListener('DOMContentLoaded',cargarItems);
  //Evento Agregar Item
  btnAgregar.addEventListener('click', agregarItem);
  //Evento Eliminar Item
  listaItems.addEventListener('click',eliminarItem);
  //Evento Tachar Item
  listaItems.addEventListener('click',tacharItem);
  //Evento Borrar Todo
  btnLimpiar.addEventListener('click',borrarTodo);
  //Evento Filtrar
  filtro.addEventListener('keyup',filtrarItems);
};


//CARGAR ITEMS
function cargarItems(){
  let arrItems, markup;
  if(localStorage.getItem('arrItems') === null){
    arrItems = [];
  }else{
    arrItems= JSON.parse(localStorage.getItem('arrItems'));
  }

  arrItems.forEach(el => {
    markup = `<li class="collection-item">${el}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>`
    listaItems.insertAdjacentHTML("beforeend",markup);
  })
}

//AGREGAR ITEM
function agregarItem(e){
  let markup;
  if(input.value){
    markup = `<li class="collection-item">${input.value}<a class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>`
    listaItems.insertAdjacentHTML("beforeend",markup);
    guardarEnLocalStorage(input.value);
    input.value = '';
  }

  e.preventDefault();
}

//GUARDAR EN LOCAL STORAGE
function guardarEnLocalStorage(item){
  let arrItems;
  if(localStorage.getItem('arrItems') === null){
    arrItems = [];
  }else{
    arrItems= JSON.parse(localStorage.getItem('arrItems'));
  }
  arrItems.push(item);
  localStorage.setItem('arrItems',JSON.stringify(arrItems));
}

//ELIMINAR ITEM
function eliminarItem(e){
  let arrItems;
  if(localStorage.getItem('arrItems') === null){
    arrItems = [];
  }else{
    arrItems= JSON.parse(localStorage.getItem('arrItems'));
  }

  if(event.target.classList.contains('fa-remove')){
    if(confirm('Estas seguro/a?')){
      const index = arrItems.indexOf(event.target.parentElement.parentElement.textContent);
      arrItems.splice(index,1);
      localStorage.setItem('arrItems',JSON.stringify(arrItems));
      event.target.parentElement.parentElement.remove();
    }
  }
}

//BORRAR TODO
function borrarTodo(e){
  if(listaItems.innerHTML){
    if(confirm('Estas seguro/a?')){
      listaItems.innerHTML = '';
      localStorage.removeItem('arrItems');
    }
  }
}

//TACHAR ITEM
function tacharItem(e){
  if(event.target.classList.contains('collection-item')){
    event.target.classList.toggle('tachado');
  }
}

//FILTRAR ITEMS
function filtrarItems(e){
  const text = e.target.value.toLowerCase();
  listaItems.childNodes.forEach(el =>{
    if(!el.textContent.toLowerCase().includes(text)){
      el.classList.add('esconder');
    }else{
      el.classList.remove('esconder');
    }
  })

}
