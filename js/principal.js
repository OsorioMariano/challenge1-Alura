var fondoImg = document.querySelector(".fondo");
var devolucion = document.querySelector(".devolucion");
var ingreso = document.querySelector(".ingreso");
var main = document.querySelector(".principal");
var restriccion = document.querySelector(".mensaje-restriccion");

var botonEncriptar = document.querySelector(".encriptar");
var botonDesecriptar = document.querySelector(".desencriptar");
var botonCopiar = document.querySelector(".copia");

ingreso.focus();


function encontrarMayuscula(cadena){
    var opcionMayuscula = new RegExp("[A-Z;Ñ]");

    if(opcionMayuscula.test(cadena)){
         return true;
    }else return false;

}

function encontrarAcento(cadena){
    var opcionMayuscula =/[ÁÉÍÓÚáéíóú]/;

    if(opcionMayuscula.test(cadena)){
         return true;
    }else return false;

}

function validarRestricciones(cadena){
    if(encontrarMayuscula(cadena) || encontrarAcento(cadena)){
        
        main.classList.add("error-fondo");
        restriccion.classList.add("error-mensaje");

        setTimeout(function(){
                main.classList.remove("error-fondo");
            restriccion.classList.remove("error-mensaje");
            }, 1000);
            
    return false;
    }else return true;
}

function verificarEspacioEnBlanco (cadena){

    var expresion = /\S/; 
    if(cadena.length > 0 && expresion.exec(cadena) != null){
     return true;
    
    }return false;

}

/**
 * Se crea una expresion regular para buscar cada vocal
 *  en el total del string
 */
/**
 * Condición especial en la vocal i para que 
 * no se pise con el primer cambio de la vocal a por ai.
 */
function reemplazarVocal(cadena){    
    var vocales =["a","e","i","o","u"];
    var reemplazos = ["ai", "enter", "imes", "ober", "ufat"]
    var indice = 0;
    
    var expresionI = /(?<!a)i/g;

    vocales.forEach(function(vocal){
        var expresionVocal = new RegExp(vocal,"g")

        if(vocal == "i"){
            cadena = cadena.replace(expresionI,reemplazos[indice])
        }else{
            cadena = cadena.replace(expresionVocal,reemplazos[indice])
        }        
        indice++;
    });    
    return cadena;
}

function reemplazarEncriptado(cadena){    
    
    var palabrasClave = ["ai", "enter", "imes", "ober", "ufat"]
    var reemplazos =["a","e","i","o","u"];
    var indice = 0;

    palabrasClave.forEach(function(palabraClave){
        var expresionPalabra = new RegExp(palabraClave,"g");
        cadena = cadena.replace(expresionPalabra, reemplazos[indice]);
        indice++;
    });    
    return cadena;
}

/**
 * Se valida entrada, se comprueba contenido en cuadro de devolución 
 * para optar por transformar el ingreso y ocultar el fondo 
 * o solo transformar el ingreso
 */

function transformar(accion){
    var cadena = ingreso.value;  

    var entradaConContenido = verificarEspacioEnBlanco(cadena);
    var entradaSinRestriccion = validarRestricciones(cadena);

    if(entradaConContenido && entradaSinRestriccion){

        if (devolucion.value.length == 0){
        
            fondoImg.classList.add("cambiar-visual")

            setTimeout(function(){
                fondoImg.classList.add("invisible");
                fondoImg.classList.remove("cambiar-visual")
            }, 700)

            devolucion.value = accion(cadena);
            
            botonCopiar.classList.remove("invisible");
    
    
        }else{
    
            devolucion.value = accion(cadena);
    
        }

        ingreso.value ="";
        ingreso.focus();

    }

}

botonEncriptar.addEventListener("click",function(){       
    transformar(reemplazarVocal);          
});


botonDesecriptar.addEventListener("click",function(){
    transformar(reemplazarEncriptado);
});


botonCopiar.addEventListener("click", function(){
    var mensajeCopiar = document.querySelector("#mensaje-copia");

    navigator.clipboard.writeText(devolucion.value);

    devolucion.value = "";
    ingreso.focus();

    botonCopiar.classList.add("invisible");
    mensajeCopiar.classList.remove("invisible");    
    
    setTimeout(function(){
        mensajeCopiar.classList.add("cambiar-visual");

        setTimeout(function(){
            fondoImg.classList.remove("invisible");
            mensajeCopiar.classList.add("invisible");
            mensajeCopiar.classList.remove("cambiar-visual");
        },600);       

    }, 800);
});
