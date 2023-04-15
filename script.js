const containers=document.querySelectorAll('.choice-grid div');
const domande= document.getElementsByClassName('question-name');
const checkboxes= document.querySelectorAll('img.checkbox');
const bottone=document.querySelector('button');

let risposta1=0;
let risposta2=0;
let risposta3=0;
let finito=0;
let risultato;
let risposte=[];

function seleziona(event){

    const contenitore= event.currentTarget;
    
    for (let i=0; i<containers.length; i++){
        
        if(containers[i].dataset.questionId===contenitore.dataset.questionId){
             
            if(containers[i].dataset.choiceId===contenitore.dataset.choiceId && finito===0){
                
                if(contenitore.dataset.questionId==='one'){
                    risposta1=1;
                    risposte[0]=contenitore.dataset.choiceId;
                }
                    else if(contenitore.dataset.questionId==='two'){
                        risposta2=1;
                        risposte[1]=contenitore.dataset.choiceId;
                    }
                        else if(contenitore.dataset.questionId==='three'){
                            risposta3=1;
                            risposte[2]=contenitore.dataset.choiceId;
                        }

                     
                    aggiorna(contenitore, i);

            }
                else if(finito===0){
                    deseleziona(containers[i], i);
                }
        }
    }

    if(risposta1===1 && risposta2===1 && risposta3===1){

        risultato=getRisultato(risposte[0], risposte[1], risposte[2]);
        mostraRisposta(risultato);
        finito=1;
        for(let k=0; k<containers.length; k++){
        containers[k].removeEventListener('click', seleziona);
        }

    }
    
}

function aggiorna(contenitore, indice){
    
    contenitore.classList.remove("grigio");
    contenitore.classList.add("checked"); 

    const casella = checkboxes[indice];
    casella.innerHTML='';
    casella.src="images/checked.png";

    contenitore.classList.remove("unchecked");

    contenitore.removeEventListener('click', seleziona);
}

function deseleziona(contenitore, indice){

    const casella = checkboxes[indice];
    casella.innerHTML='';
    casella.src="images/unchecked.png";

    contenitore.classList.remove("checked");
    contenitore.classList.add("grigio");
    contenitore.classList.add("unchecked");

    contenitore.addEventListener('click', seleziona);

}

function getRisultato(a, b, c){
    if(a===b){
        return a;
    }
        else if(b===c){
            return b;
        }
            else if(a===c){
                return c;
            }
                else{
                    return a;
                }
    
}

function mostraRisposta(result){
    const title=document.querySelector('h2');
    const testo=document.querySelector('p');

    title.textContent=RESULTS_MAP[result].title;
    testo.textContent=RESULTS_MAP[result].contents;

}

function reset(event){

    const title=document.querySelector('h2');
    const testo=document.querySelector('p');

    title.innerHTML='';
    testo.innerHTML='';

    risposta1=0;
    risposta2=0;
    risposta3=0;
    finito=0;

    for(let k=0; k<checkboxes.length; k++){
        checkboxes[k].innerHTML='';
        checkboxes[k].src="images/unchecked.png";
    }

    for( let j=0; j<risposte.length; j++){
        risposte.pop();
    }

    for(let i=0; i<containers.length; i++){
        containers[i].classList.remove("unchecked");
        containers[i].classList.remove("checked");
        containers[i].classList.add("grigio");
        containers[i].addEventListener('click', seleziona);
        
    }

}


for (const container of containers){
    container.addEventListener('click', seleziona);
    container.classList.add("grigio");
}

bottone.addEventListener('click', reset);