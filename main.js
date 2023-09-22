// Creacion de Constantes para DOM al interactuar
const formulario = document.querySelector("#formAdd");
const formEdit = document.querySelector("#formEdit");
const dialog = document.querySelector("dialog");

console.log(dialog)

// URL de API MockAPI Requests and Response

// Remplaza la constante URL para conectarse con tu API
const url = "https://650b10a4dfd73d1fab098284.mockapi.io/Tab"


// FUNCIONES

// SUBIR DATOS AL API
formulario.addEventListener("submit", async (e)=>{
    e.preventDefault();
    // Recibe el dato y se pasamos a Object Js para su lectura
    let dato = Object.fromEntries(new FormData(e.target));

    // peticion asincrona
    const res = await fetch(url);         
    console.log(res);

    const data = await res.json();
    console.log(data);

    let config = {
        // metodo de poner o subir al API proveniente de la documentacion
        method: "POST",
        headers:{"content-type":"application/json"},
        // Pasar a JSON el dato
        body:JSON.stringify(dato)
    }
    const envio = await (await fetch(url,config)).json();
    
    //Reload Page when press Button
    location.reload();
});


// FUNCION EDITAR (Problematica)
const editData = async (id)=>{
    let dato;
    let config;
    formEdit.addEventListener("submit",(e)=>{
        e.preventDefault();
        dato = Object.fromEntries(new FormData(e.target));
        config = {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(dato)
        }
        let res = fetch(url+"/"+id,config);

        dialog.close();
    })
}

// FUNCION ELIMINAR
const deleteDAta = async(id)=>{
    let config = {
        method:"DELETE",
        headers:{"content-type":"application/json"}
    }
    let res = await(await fetch( url + "/" + id , config )).json();
    location.reload();
}


document.addEventListener("DOMContentLoaded", async (e)=>{
    const tabla = document.querySelector("#data-table");
    let res = await(await fetch(url)).json();
    console.log(res)
    res.map((element)=>{tabla.insertAdjacentHTML("beforeend",`
    <tr>
        <td>${element.id}</td>
        <td>${element.valor}</td>
        <td>${element.caja}</td>
        <td>
            <button id="${element.id}" class="delet"> 
            
            Eliminar
                
            </button>
            <button id="${element.id}" class="edit"> 
            
            Editar

            </button>
        </td>
    </tr>
    `)})

    //Llamar Metodo Eliminar
    const btDelet = document.querySelectorAll(".delet");
    console.log(btDelet)

    //Llamar Metodo Editar
    const btEdit = document.querySelectorAll(".edit");
    console.log(btEdit);

    // Inicializacion Delete
    btDelet.forEach((element) =>{
        element.addEventListener("click",()=>{
            deleteDAta(element.id);
        })
    });

    // Inicializacion Edit
    btEdit.forEach((element)=>{
        element.addEventListener("click",(event)=>{
            dialog.showModal();
            editData(element.id);
        })
    });
});


    
    
