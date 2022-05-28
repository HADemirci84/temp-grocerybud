const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//edit option (varibles)
let edit;
let editFlag = false;
let editID = "";

//event listen
// submit form
form.addEventListener('submit', addItem)
// remove item
clearBtn.addEventListener('click', clearItems)
//function
function addItem(e){
    e.preventDefault();
   const value = grocery.value;
   const id = new Date().getTime().toString();
   if(value && !editFlag ){
       const element = document.createElement('article');
       //add class
       element.classList.add('grocery-item');
       //add id (data set)
    const attr = document.createAttribute('data-id');
    attr.value=id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
                    const deleteBtn = element.querySelector('.delete-btn');
                    const editBtn = element.querySelector('.edit-btn');
                    deleteBtn.addEventListener('click', deleteItem);
                    editBtn.addEventListener('click', editItem);
                    //append
                    list.appendChild(element);
                    displayAlert('item added to list', 'success');
                    container.classList.add('show-container');
                    //add to local storage
                    addToLocalStorage(id,value)
                    //set to default
                    setBackToDefault();

   }
   else if(value && editFlag){
       editElement.innerHTML= value;
       displayAlert('value changed', 'success');
       //editLocalStorage
      editLocalStorage(editID, value)
       setBackToDefault();
   }
   else{
       displayAlert('please enter value', 'danger')
   }
}
//display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`)
    },1000)
}

//remove items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length>0){
items.forEach(function(item){
    list.removeChild(item);

})
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
     local.storage.removeItem('list');

}
//delete item
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
    container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    localeStorage.remove('list');
}
//edit item
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';

}
//set to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};

//local storage
function addToLocalStorage(id, value){
   const grocery = {id, value};
   const items = getLocalStorage();
   console.log(items)
   items.push(grocery);
   
   
}

function removeLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id){
            return item
        }
    
    })
    localStorage.setItem('list', JSON.stringify(items))
}

function editLocalStorage(editID, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id === id){
            id.value = value
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage(){
   return localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
}