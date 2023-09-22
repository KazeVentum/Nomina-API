// Creacion de Constantes para DOM al interactuar
const formulario = document.querySelector("#formAdd");
const formEdit = document.querySelector("#formEdit");
const dialog = document.querySelector("dialog");

console.log(dialog)

// URL de API MockAPI Requests and Response
const url = "https://650b10a4dfd73d1fab098284.mockapi.io/tab"


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
}
