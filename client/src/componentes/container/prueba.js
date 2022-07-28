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