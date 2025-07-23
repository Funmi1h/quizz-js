
let n= 0;     // n sera la variable pour stocker le score pour que j'évite la concaténation   
// Cette fonction vérifie si la réponse contenue dans la case sélectionnée est la bonne ou pas et utilise les styles appropriées dans chaque cas
function checkAnswer(form, questionTable){
    form = new FormData(form);
    let score = document.getElementById('score');
 
    // La valeur de l'input sélectionner par le joueur
    let userAnswer = form.get('questionChoice');
    // La div qui va contenir les mots d'erreurs ou de félicitations
    let divEnPlus = document.querySelector('.en-plus');
    
         // Si la réponse userAnswer correspond a la réponse correcte 
            
        if (userAnswer.trim() === questionTable.correct.trim()){
            console.log( `C'est la bonne réponse `)
            n += 1;
            score.textContent = n
            
            // Logique pour colorer la case en vert 
                // on récupere d'abord la case
            let choiceContainer = document.querySelector('input[name="questionChoice"]:checked')
            choiceContainer.parentElement.style.backgroundColor ='rgba(227, 240, 207, 1)';
            choiceContainer.parentElement.style.border = '2px solid rgba(166, 236, 60, 1)'
            // liste de Mots de félicitations
            let congrats = ['Bravo!', 'Bien joué!', 'Impressionnant', 'Continues comme ça', 'Tu maitrises grave !'];
            
            // Générer un mot de félicitations pour la réponse trouvée
                // indice du mot de félicitaions dans la liste 
            let index = Math.floor(Math.random() * congrats.length);
                // Géneration du mot de félicitations
            let  randomCongratWord = congrats[index];
            
            let paragrapheMotsFelicitaton = document.createElement('p');
            paragrapheMotsFelicitaton.textContent = randomCongratWord;
            divEnPlus.appendChild(paragrapheMotsFelicitaton);
            
        }

        // Si la réponse n'est pas correcte
        if (userAnswer !== questionTable.correct){
            console.log(`C'est une mauvaise réponse `);
            // Logique pour colorer la case en rouge 
            
                // on récupere d'abord la case
            let choiceContainer = document.querySelector('input[name ="questionChoice"]:checked');
            choiceContainer.parentElement.style.backgroundColor ='rgba(240, 149, 126, 1)';
            choiceContainer.parentElement.style.border = '2px solid rgba(230, 120, 93, 1)'

            // Rechercher l'input qui a la bonne réponse et le colorier en green
                // récupérer tous les inputs radio
                let questionChoicesInput = document.querySelectorAll('input[name ="questionChoice"]');
                

                    questionChoicesInput.forEach(input =>{
                        if (input.value.trim() === questionTable.correct.trim()){
                        let trueAnswerChoiceContainer = input.parentElement;
                        trueAnswerChoiceContainer.style.backgroundColor = 'rgba(227, 240, 207, 1)'
                        trueAnswerChoiceContainer.style.border = '1px solid rgba(166, 236, 60, 1)'

                    }
                    })

            // Code pour l'évolution du trait en rouge 

            // Mots d'erreurs
            let errors = ['Oups ! Mauvaise réponse.', 'Pas tout à fait.', 'Tu y étais presque.', 'Dommage!', 'Aïe ! Ce n’était pas la bonne...'];
            // Générer un mot d'erreurs 
                // indice du mot d'erreurs dans la liste 
            let index = Math.floor(Math.random() * errors.length)
                // Géneration du mot de félicitations
            let  randomErrorWord = errors[index]
            let paragrapheMotsError = document.createElement('p')
            paragrapheMotsError.textContent = randomErrorWord
            divEnPlus.appendChild(paragrapheMotsError)
        }

        //  la div  l'explication de la réponse 
        explication = document.querySelector('.explication')
        explication.textContent = questionTable.explicationText
        explication.style.display = 'block'
             
            }


// Cette fonction va permettre de remplir dynamiquement le formulaire du html
function updateForm (questionTable){
    let question = document.getElementById('question');
    question.textContent= questionTable.question;

        // Récupérer les labels 
    let labelChoice0 = document.getElementById('label-choice0');
    let labelChoice1 = document.getElementById('label-choice1');
    let labelChoice2 = document.getElementById('label-choice2');
    let labelChoice3 = document.getElementById('label-choice3');

        // Mise a jour des textes pour les labels 
    labelChoice0.textContent = questionTable.choices[0];
    labelChoice1.textContent = questionTable.choices[1];
    labelChoice2.textContent = questionTable.choices[2];
    labelChoice3.textContent = questionTable.choices[3];

    // Récupérer les inputs radios grace a leur id 
    let choice0 = document.getElementById('choice0');
    let choice1 = document.getElementById('choice1');
    let choice2 = document.getElementById('choice2');
    let choice3 = document.getElementById('choice3');

    //Mettre a jour les valeurs des inputs radios
    choice0.value = labelChoice0.textContent;
    choice1.value = labelChoice1.textContent;
    choice2.value = labelChoice2.textContent;
    choice3.value = labelChoice3.textContent;
  
}


// Cette fonction va nettoyer tous les champs quand on passe a la prochaine question
function resetUi(){
    console.log('Ressetting Ui 🆒🆗📝')
    // d´selectionner les bouttons radios
    let inputsRadios = document.getElementsByName('questionChoice');
   for (let input of inputsRadios) {
        input.checked = false;
        input.disabled = false;
    }
    // enlever le texte de l'explication
    let explication = document.querySelector('.explication');
    explication.textContent = ''
    explication.style.display = 'none';
    
    // enlever les mots de félicitations ou d'erreur
     let divEnPlus = document.querySelector('.en-plus');
     divEnPlus.innerHTML = "";
    // enlever les styles sur les choiceContainer
    let choiceContainers = document.querySelectorAll('.choice_container')
    for (let choiceContainer of choiceContainers){
        choiceContainer.style.backgroundColor = "transparent";
        choiceContainer.style.border = "none"
    }
    
    
    let btnContinue = document.querySelector('.btn-continue')
    let btnSubmit = document.getElementById('btn-submit')
    btnContinue.style.display = 'none';
    btnSubmit.style.display = 'block';


    }



// Sélctionner l'input radio quand la div qui lui correspond est selectionné
    // Récupérer tous les div de choice_container
choiceContainers = document.querySelectorAll('.choice_container');
    //Un eventlistener sur chaque div choiceContainer pour sélectionner l'input radio au click
choiceContainers.forEach(divchoiceContainer =>{
    divchoiceContainer.addEventListener('click', function(){
        const input = divchoiceContainer.querySelector('input[type="radio"]')
        input.checked = true
    })
})

//Empecher l'utilisation du bouton Vérifier si aucun input n'est choisi

function activateSubmit(){
    let inputsRadios = document.getElementsByName('questionChoice');

const anyInputSelected =Array.from(inputsRadios).some(input => input.checked);
if (anyInputSelected === false){

    let btnSubmit = document.getElementById('btn-submit');
    btnSubmit.style.opacity = '0.5';
    btnSubmit.style.cursor = 'not-allowed';
   
}
// Le style du boutton vérifier si un input est coché 
if (anyInputSelected){

    let btnSubmit = document.getElementById('btn-submit');
    btnSubmit.style.opacity = '1';
    btnSubmit.style.cursor = 'pointer';
    btnSubmit.disabled = false;
}
}

// Désactiver le boutton vérifier quand aucun input n'est sélctionné

let inputsRadios = document.getElementsByName('questionChoice');
inputsRadios.forEach(input =>{
    input.addEventListener('change', activateSubmit)
})

// Les tableau d'objets des  questions
let question1 = {
    question :  "Que renvoie \" typeof null \" en JavaScript",
    choices : ["A. \" null \"", "B. \"object \"", "C. \" undefined \"", "D. \" function \" "],
    correct : "B. \"object \"",
    explicationText : " C'est une bizarrerie historique de JavaScript. typeof null retourne 'object' à cause d'une erreur dans la première implémentation du langage, et cela n'a jamais été corrigé pour des raisons de compatiblité."
};


let question2 = {
    question: "Quelle est la différence entre '==' et '===' en JavaScript ?",
    choices: ["A. Aucune", "B. '===' compare uniquement les valeurs", "C. '==' compare les types et les valeurs", "D. '===' compare types et valeurs strictement"],
    correct: "D. '===' compare types et valeurs strictement",
    explicationText: "'==' effectue une conversion de type implicite avant comparaison. '===' (égalité stricte) compare les types et les valeurs sans conversion."
};


let question3 = {
    question: "Que fait la méthode `event.preventDefault()` ?",
    choices: ["A. Empêche l'exécution du script", "B. Empêche le rechargement de la page", "C. Empêche le comportement par défaut de l'événement", "D. Arrête la propagation de l'événement"],
    correct: "C. Empêche le comportement par défaut de l'événement",
    explicationText: "Cette méthode empêche le comportement par défaut d'un événement, comme le submit d'un formulaire ou le clic sur un lien."
};


let question4 = {
    question: "Que vaut l'expression `[] + {}` en JavaScript ?",
    choices: ["A. '[object Object]'", "B. 'undefined'", "C. '0'", "D. '[object Object][object Object]'"],
    correct: "A. '[object Object]'",
    explicationText: "L'opérateur + convertit les deux objets en chaînes. Un tableau vide devient '', et un objet devient '[object Object]', donc résultat : '[object Object]'."
};


let question5 = {
    question: "Qu’est-ce qu’une closure (fermeture) en JavaScript ?",
    choices: ["A. Une fonction qui se ferme automatiquement", "B. Une fonction qui retourne une autre fonction", "C. Une fonction ayant accès à sa portée parent même après que celle-ci ait terminé", "D. Une erreur de compilation"],
    correct: "C. Une fonction ayant accès à sa portée parent même après que celle-ci ait terminé",
    explicationText: "Une closure permet à une fonction interne de se souvenir de l’environnement dans lequel elle a été créée, même si l’environnement externe a terminé son exécution."
};


let question6 = {
    question: "Que fait `setTimeout(() => {}, 0)` ?",
    choices: ["A. Exécute immédiatement la fonction", "B. Bloque le thread principal", "C. Ajoute la fonction à la file d'attente d'exécution", "D. Lève une erreur"],
    correct: "C. Ajoute la fonction à la file d'attente d'exécution",
    explicationText: "Même avec un délai de 0 ms, la fonction est exécutée après que la pile d'exécution soit vide. Elle est mise dans la 'task queue'."
};


let question7 = {
    question: "Quelle est la valeur de `typeof NaN` ?",
    choices: ["A. 'NaN'", "B. 'undefined'", "C. 'number'", "D. 'object'"],
    correct: "C. 'number'",
    explicationText: "`NaN` signifie 'Not-a-Number', mais paradoxalement, `typeof NaN` renvoie 'number' car c’est un bug historique dans JavaScript."
};


let question8 = {
    question: "Quel mot-clé permet de créer une promesse ?",
    choices: ["A. `await`", "B. `new Promise`", "C. `setTimeout`", "D. `async`"],
    correct: "B. `new Promise`",
    explicationText: "On crée une promesse avec `new Promise((resolve, reject) => { ... })`. Les mots-clés `async` et `await` sont utilisés pour la consommer."
};


let question9 = {
    question: "Quelle méthode convertit un tableau en chaîne de caractères ?",
    choices: ["A. `split()`", "B. `toString()`", "C. `parse()`", "D. `join('')`"],
    correct: "B. `toString()`",
    explicationText: "`toString()` convertit un tableau en chaîne, séparant les éléments par des virgules. `join()` le fait aussi, mais on peut spécifier le séparateur."
};


let question10 = {
    question: "Quel est le résultat de `'5' - 2` en JavaScript ?",
    choices: ["A. '3'", "B. NaN", "C. 3", "D. '52'"],
    correct: "C. 3",
    explicationText: "Avec l'opérateur `-`, JavaScript convertit automatiquement la chaîne `'5'` en nombre. Donc `'5' - 2` donne `3`."
};
        // On met tous ces tableaux d'objets dans une liste pour pouvoir faire une boucle

let questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]



let currentQuestionIndex = 0;
// le numéro de la question
let questionNumber = document.getElementById('number_question');
questionNumber.textContent = `Question: ${currentQuestionIndex +1} `


document.addEventListener('DOMContentLoaded', () => {
        //mise a jour du formulaires avec la premiere question et propositions de réponses lorsque la page se charge 
        updateForm(questions[currentQuestionIndex])
        activateSubmit()
        })


const quizForm = document.getElementById('quizForm');
quizForm.addEventListener('submit', function(event){
    event.preventDefault();
    checkAnswer(quizForm, questions[currentQuestionIndex]);

    // récupérer le boutton submit et le faire disparaitre 
    btnSubmit = document.getElementById("btn-submit");
    btnSubmit.style.display = 'none';

    // Ajout du bouton pour continuer qu'on va ajouter dans la div explication
    let btnContinue = document.querySelector('.btn-continue');
    btnContinue.style.display = 'block';



    btnContinue.addEventListener('click', () =>{
            currentQuestionIndex++;
            questionNumber.textContent = `Question: ${currentQuestionIndex +1} `

            if (currentQuestionIndex < questions.length){
                resetUi()
                updateForm(questions[currentQuestionIndex])
                
                

            } else {
                if(currentQuestionIndex === 9){
                    console.log("On est a la derniere question")
                    resetUi();
                    updateForm(questions[currentQuestionIndex]);
                    btnSubmit.style.display = 'none'


                }
                
                
            }
            
            

    })
    

})

explication.textContent = 'Bravo tu as fini le Quizz';
explication.style.display = 'block';
btnContinue.style.display = 'none';



