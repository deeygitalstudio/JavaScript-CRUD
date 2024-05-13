// const selectedRow = null;


// //show alerts

// function showAlert(message, className){
// const div = document.createElement('div');
// div.className = `alert alert-${className}`;

// div.appendChild(document.createTextNode(message));
// const container = document.querySelector('.container');
// const main = document.querySelector('.main');
// container.insertBefore(div, main)

// setTimeout(() => document.querySelector('.alert').remove(), 3000)
// }


// //clearfields
// function clearFields(){
//     document.getElementById('first').value = '';
//     document.getElementById('last').value = '';
//     document.getElementById('num').value = '';
// }


// //Add data

// document.getElementById('submit').addEventListener('click', (e) => {
//     e.preventDefault();


//     const firstEl = document.getElementById('first').value
//     const lastEl = document.getElementById('last').value 
//     const numEl = document.getElementById('num').value 

 
//     if(firstEl == '' || lastEl == '' || numEl == '' ){
//         showAlert('please fill in all fields', 'danger');
//         clearFields()
//     }else{
//         if(selectedRow == null){
//            const list = document.getElementById('student-list');
//            const row = document.createElement('tr');


//            row.innerHTML = `
//             <td>${firstEl}</td>
//             <td>${lastEl}</td>
//             <td>${numEl}</td>

//             <td>
//              <a href="#" class="btn btn-warning btn-sm" id="edit">Edit</a>
//              <a href="#" class="btn btn-danger btn-sm" id="delete">Delete</a>
//             </td>
           
//            `;

//            list.appendChild(row);
//            selectedRow = null;
//                    clearFields()
//            showAlert('Student added successfully', 'success')
//            clearFields()
//         }else{
        
//         }

//         clearFields()
//     }
// })

// //edit Data
// document.getElementById('student-list').addEventListener('click', (e) =>{
//     target = e.target.id
//     parent = e.target.parentElement.parentElement
//      console.log(parent.children);
//    let submitEl = document.getElementById('submit')
         
 
    
//     if(target == "edit"){
//            parent = e.target.parentElement.parentElement
//          document.getElementById('first').value = parent.children[0].textContent
//     document.getElementById('last').value = parent.children[1].textContent
//     document.getElementById('num').value = parent.children[2].textContent

       
//     }

//     if(submitEl.value === 'Save' ){
//          alert('working')
//        }
       
// })
// //Delete Data
// document.getElementById('student-list').addEventListener('click', (e) =>{
//     target = e.target.id
//     parent = e.target.parentElement.parentElement
//     console.log(parent);

//     if(target == "delete"){
//         parent.remove();
//         showAlert('Student data deleted', 'danger')


//     }
// })



function validateForm(){
    var firstEl = document.getElementById('first').value
    var lastEl = document.getElementById('last').value 
    var numEl = document.getElementById('num').value 

    if(firstEl == ""){
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "first name cannot be empty!",
  footer: '<a href="#">Why do I have this issue?</a>'
});

return false;
    }

    if(lastEl == ""){
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Last name cannot be empty!",
  footer: '<a href="#">Why do I have this issue?</a>'
});

return false;
    }
     if(numEl == ""){
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Age cannot be empty",
  footer: '<a href="#">Why do I have this issue?</a>'
});

return false;
    }
 
    else if(numEl < 1){
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Age must not be zero or lesser than zero",
  footer: '<a href="#">Why do I have this issue?</a>'
});

return false;
    }
 
return true;
}

function showData() {
    var peopleList = localStorage.getItem('peopleList') ? JSON.parse(localStorage.getItem('peopleList')) : [];

    var html = '';
    peopleList.forEach((element, index) => {
        html += "<tr>";
        html += '<td>' + element.firstEl + '</td>';
        html += '<td>' + element.lastEl + '</td>';
        html += '<td>' + element.numEl + '</td>';
        html += '<td><button onclick="updateData(' + index + ')" class="btn btn-warning mx-2 btn-sm">Edit</button><button onclick="deleteData(' + index + ')" class="btn btn-danger btn-sm">Delete</button></td>';
        html += "</tr>";

        
    });

    document.getElementById('student-list').innerHTML = html;
}





function addData(e) {
e.preventDefault();
    if (validateForm()) {
        var firstEl = document.getElementById('first').value;
        var lastEl = document.getElementById('last').value;
        var numEl = document.getElementById('num').value;

        var peopleList = localStorage.getItem('peopleList') ? JSON.parse(localStorage.getItem('peopleList')) : [];

        peopleList.push({
            firstEl: firstEl,
            lastEl: lastEl,
            numEl: numEl
        });

        localStorage.setItem('peopleList', JSON.stringify(peopleList));
        showData();

        document.getElementById('first').value = '';
        document.getElementById('last').value = '';
        document.getElementById('num').value = '';
    }
}

document.getElementById('submit').addEventListener('click', addData);

  
document.onload = showData();

function deleteData(index){
    var peopleList = localStorage.getItem('peopleList') ? JSON.parse(localStorage.getItem('peopleList')) : [];

    peopleList.splice(index, 1);

    localStorage.setItem('peopleList', JSON.stringify(peopleList))
    showData()
}



function updateData(index){
     document.getElementById('submit').style.display = 'none';
    document.getElementById('save').style.display = 'block';
   

        var peopleList = localStorage.getItem('peopleList') ? JSON.parse(localStorage.getItem('peopleList')) : [];


        document.getElementById('first').value = peopleList[index].firstEl
        document.getElementById('last').value = peopleList[index].lastEl
        document.getElementById('num').value = peopleList[index].numEl

     document.getElementById('save').onclick = function(){
        if(validateForm()){
            peopleList[index].firstEl = document.getElementById('first').value
            peopleList[index].lastEl = document.getElementById('last').value
            peopleList[index].numEl = document.getElementById('num').value

             localStorage.setItem('peopleList', JSON.stringify(peopleList))
             showData()

             document.getElementById('first').value = '';
        document.getElementById('last').value = '';
        document.getElementById('num').value = '';

     document.getElementById('submit').style.display = 'block';
    document.getElementById('save').style.display = 'none';
        }
     }
}
