    let ambo = false;
    let terno = false;
    let quaterna = false;
    let cinquina = false;
    let tombola = false;
    let numeri = [];
    for (let i = 1; i <= 90; i++){
        numeri.push(i);
    } 
    let numeroestratto = [];
    for (let i = 1; i <= 90; i++){
        numeroestratto.push(i);
    }    
function generacartelle(){
    document.getElementById("generacartelle").disabled= true;
    let div = document.getElementById("div");
    div.innerHTML=""; 
    let cartelle = document.createElement("table"); 
    for (let r = 0; r < 18; r++){ 
        let tr=document.createElement("tr"); 
        tr.dataset.usciti = 0;      // numeri che sono usciti fino ad adesso per ogni riga
        tr.dataset.premio="no";
        tr.dataset.numeri = "";
        for (let c = 0; c < 5; c++){ 
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
function estrainumero() {
    if (numeroestratto.length == 0) {
        document.getElementById("nestr").innerHTML = "Numeri finiti";
        document.getElementById("estrainumero").disabled=true;
        return;
    }
    let i2 = Math.floor(Math.random() * numeroestratto.length);
    let numero=numeroestratto[i2];
    numeroestratto.splice(i2, 1);
    document.getElementById("nestr").innerHTML = "Il numero estratto è: " + numero;
    let cella = document.getElementById(numero); //trova la cella che contiene il numero estratto
    if (cella && !cella.classList.contains("nestratto")) { //controlla che la cella esisti e che non sia già stata estratta
    cella.classList.add("nestratto");  
    let tr = cella.parentElement; //prende il tr della cella che è uscita, così riesce a risalire alla riga
    tr.dataset.numeri += numero + " "; //numeri usciti in quella riga
    tr.dataset.usciti++; // conta i numeri usciti solo di quella riga
    controllaVincite(tr);
    controllaTombola();
}
}
function controllaVincite(tr) {
    let conto = parseInt(tr.dataset.usciti);
    let p = document.getElementById("risultati");
    if (tr.dataset.premio !== "no") return; // questa riga fa in modo che una stessa riga non faccia ambo, terno ...
    if (conto == 2 && !ambo) {
        ambo = true;
        tr.dataset.premio = "ambo";
        p.innerHTML += "Ambo con i numeri: " + tr.dataset.numeri + "<br>";
    }
    else if (conto == 3 && !terno) {
        terno = true;
        tr.dataset.premio = "terno";
        p.innerHTML += "Terno con i numeri: " + tr.dataset.numeri + "<br>";
    }
    else if (conto == 4 && !quaterna) {
        quaterna = true;
        tr.dataset.premio = "quaterna";
        p.innerHTML += "Quaterna con i numeri: " + tr.dataset.numeri + "<br>";
    }
    else if (conto == 5 && !cinquina) {
        cinquina = true;
        tr.dataset.premio = "cinquina";
        p.innerHTML += "Cinquina con i numeri: " + tr.dataset.numeri + "<br>";
    }
}
function controllaTombola() {
    if (tombola) return;
    let tutti = document.querySelectorAll("tr");
    let p = document.getElementById("risultati");
    for (let i = 0; i < tutti.length; i += 3) { //divide la tabella nelle cartelle
        let tot = 0;
        for (let d = 0; d < 3; d++) {
            tot += parseInt(tutti[i + d].dataset.usciti); //conta tutti i numeri usciti in ogni riga
        }
        if (tot == 15) {
            tombola = true;
            let cartella = i / 3 + 1;
            p.innerHTML += "Tombola, Cartella vincente: " + cartella;
            return;
        }
    }
}
