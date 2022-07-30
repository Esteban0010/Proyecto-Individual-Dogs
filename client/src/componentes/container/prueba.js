const prueba =[
    { 
        id:1,
        nombre:'aaa',
    },
    { 
        id:2,
        nombre:'bbb',
    },
    { 
        id:3,
        nombre:'ccc',
    },
    { 
        id:4,
        nombre:'ddd',
    },
]

const a =['ccc','ddd']



let temp = prueba.filter(t => a.includes(t.nombre))
temp =temp.map(t => t.id)
console.log(temp)

const ValidarFormulario= (e,input)=>{
    switch(e.target.name){
        case "name":
            if(!input.name){

            }
            else if(regexBreed.name.test(e.target.value)){
                
                
            }else{
                return 'Contiene digitos'
            }
        break;
        case "name":

        break;
        case "name":

        break;
        case "name":

        break;
        case "name":

        break;
    }
}
    // let errors = [];
    // const reg = new RegExp('^[0-9]+$')

    // if (!input.name) {
    //     return "Este campo es requerido"

    // } else if (!expreR.name.test(input.name)) {
    //     return  alert('nombre: solo debe contener letras');
    // }
    // if (!input.weight_max) {
    //     return "Este campo es requerido" 
    // }
    // else if (!reg.test(input.weight_max)) {
    //     return alert("peso: solo debe contener numeros")
    // }
    // if (!input.weight_min) {
    //     return "Este campo es requerido"
    // }
    // else if (!reg.test(input.weight_min)) {
    //     return alert("peso: solo debe contener numeros")
    // }
    // if (input.weight_max && input.weight_min && Number(input.weight_min) >= Number(input.weight_max)) {
    //     return alert("El peso mínimo no puede ser superior o igual al peso máximo")
    // }
    // if (!input.height_max) {
    //     return "Este campo es requerido"
    // } else if (!reg.test(input.height_max)) {
    //     return alert("altura: solo debe contener numeros")
    // }
    // if (!input.height_min) {
    //     return "Este campo es requerido"
    // } else if (!reg.test(input.height_min)) {
    //     return alert("altura: solo debe contener numeros")
    // }
    // if (input.height_max && input.height_min && Number(input.height_min) >= Number(input.height_max)) {
    //     return alert("La altura mínima no puede ser superior o igual al máximo");
    // }
    // if(!reg.test(input.life_span_min)){
    //     return 
    // }
    // if(!reg.test(input.life_span_max)){
    //     return alert("esperanza de vida: solo debe contener numeros")
    // }
    // if(input.life_span_max && input.life_span_min && Number(input.life_span_min) >= Number(input.life_span_max)) {
    //     return alert("el valor de esperanza de vida mínimo no puede ser superior o igual al máximo")
    // }