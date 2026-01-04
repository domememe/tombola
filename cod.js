    let numeri = [];
    for (let i = 1; i <= 90; i++){
        numeri.push(i);
    } 
    let numeroestratto = [];
    for (let i = 1; i <= 90; i++){
        numeroestratto.push(i);
    }    
    let righe = [];
function generacartelle(){
    document.getElementById("generacartelle").disabled= true;
    let div= document.getElementById("div");
    div.innerHTML=""; 
    let cartelle = document.createElement("table"); 
    for (let r = 0; r < 9; r++){ 
        let tr=document.createElement("tr"); 
        for (let c = 0; c < 10; c++){ 
            let td = document.createElement("td"); 
            let n = Math.floor(Math.random() * numeri.length);
            let num = numeri[n];
            td.id = num;
            numeri.splice(n, 1);
            let testo = document.createTextNode(num); 
            td.appendChild(testo); 
            tr.appendChild(td); 
        } 
        cartelle.appendChild(tr); 
    }
    div.appendChild(cartelle);
}
function estraiNumero() {
    if (numeroestratto.length === 0) {
        document.getElementById("nestr").innerHTML = "Numeri finiti";
        return;
    }
    let indice = Math.floor(Math.random() * numeroestratto.length);
    let numero = numeroestratto[indice];
    numeroestratto.splice(indice, 1);
    document.getElementById("nestr").innerHTML = "Il numero estratto è: " + numero;
    let cella = document.getElementById(numero);
    if (cella) {
        cella.classList.add("nestratto");
}
    

}
