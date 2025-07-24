
let n= 0;     // n sera la variable pour stocker le score pour que j'évite la concaténation   
// Le texte de la  question 
let questionText = document.getElementById('question');

// Les bouttons continuer et vérifier
let btnContinue = document.querySelector('.btn-continue');
let btnSubmit = document.getElementById('btn-submit');
let score = document.getElementById('score');
// La div qui va contenir les mots d'erreurs ou de félicitations
let divEnPlus = document.querySelector('.en-plus');

//  la div  l'explication de la réponse 
let explication = document.querySelector('.explication');

//  Les inputs radio 
let inputsRadios = document.getElementsByName('questionChoice');

let progress = 0;

let currentQuestionIndex = 0;
// l'affichage du numéro de la question
let questionNumber = document.getElementById('number_question');

// La div pour afficher si le temps est écoulé
let divTempsEcoule = document.querySelector('.tempsEcoule');


// Gestion d'un intervalle de temps de 60s pour chaque question
let timerDisplay = document.getElementById('timer-display');
let timeLimit = 60; // Chaque question a une durée de 60s 
let timerInterval; // Pour le compte a rebours visuel
let timeOutId; // Pour avoir l'identifiant du timer 

// Boutton pour rejouer
let btnReplay = document.getElementById('replay')
btnReplay.style.display = 'none'
// Cette fonction vérifie si la réponse contenue dans la case sélectionnée est la bonne ou pas et utilise les styles appropriées dans chaque cas

function checkAnswer(form, questionTable){
    timerDisplay.style.display = 'none'
    form = new FormData(form);
    
     
    // La valeur de l'input sélectionner par le joueur
    let userAnswer = form.get('questionChoice');    
         // Si la réponse userAnswer correspond a la réponse correcte 
            
        if (userAnswer.trim() === questionTable.correct.trim()){
            console.log( `C'est la bonne réponse `)
            n += 1;
            score.textContent = `Score : ${n}`;
            
                // on récupere d'abord la case
            let choiceContainer = document.querySelector('input[name="questionChoice"]:checked')
            choiceContainer.parentElement.style.backgroundColor ='rgba(83, 228, 126, 1)';
            choiceContainer.parentElement.style.border = '2px solid rgba(137, 247, 103, 1)'
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
            choiceContainer.parentElement.style.border = '2px solid rgba(235, 64, 21, 1)'

            // Rechercher l'input qui a la bonne réponse et le colorier en green
                // récupérer tous les inputs radio
                let questionChoicesInput = document.querySelectorAll('input[name ="questionChoice"]');
        
                    questionChoicesInput.forEach(input =>{
                        if (input.value.trim() === questionTable.correct.trim()){
                        let trueAnswerChoiceContainer = input.parentElement;
                        trueAnswerChoiceContainer.style.backgroundColor = 'rgba(83, 228, 126, 1)';
                        trueAnswerChoiceContainer.style.border = '2px solid rgba(137, 247, 103, 1)';

                    }
                    })
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

        // aFFichage de l'explication;
        explication.textContent = questionTable.explicationText;
        explication.style.display = 'block';

        // désactiver tous les boutons radios
        inputsRadios.forEach(input =>{
            input.disabled = true;
        });
        
        // Afficher les bouttons continuer et submit 
        btnContinue.style.display = 'block';
        btnSubmit.style.display = 'none';
  

             
    }


// Cette fonction va permettre de remplir dynamiquement le formulaire du html
function updateForm (questionTable){
    questionText.textContent= questionTable.question;

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

    setUpRadioListeners()
  
}


// Cette fonction va nettoyer tous les champs quand on passe a la prochaine question
function resetUi(){
    console.log('Ressetting Ui 🆒🆗📝')

    // d´selectionner les bouttons radios
    let inputsRadios = document.getElementsByName('questionChoice');
   for (let input of inputsRadios) {
        input.checked = false;
        input.disabled = false; // on réactive les inputs pour les questions qui suivent 
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
        choiceContainer.style.border = "none";
    }
    
    // Afficher le boutton vérifier et enlever le boutton continuer
    let btnContinue = document.querySelector('.btn-continue');
    let btnSubmit = document.getElementById('btn-submit');
    btnContinue.style.display = 'none';
    btnSubmit.style.display = 'block';


    }

function setUpRadioListeners(){
    inputsRadios.forEach(radio => {
            // Mettre la couleur bleu sur le container de l'input sélctionner 
            if (radio.checked) {
                const choiceContainer = radio.closest('.choice_container');
                choiceContainer.style.backgroundColor = "rgba(190, 204, 235, 0.3)";
                choiceContainer.style.border = "2px solid rgb(56, 111, 231)";
            };

            // Réinitialiser la couleur quand l'input n'est plus s´lectionné
            if (radio.checked === false) {
                const choiceContainer = radio.closest('.choice_container');
                choiceContainer.style.backgroundColor = "transparent";
                choiceContainer.style.border = "none";
            };

        });
    }

//Empecher l'utilisation du bouton Vérifier si aucun input n'est choisi

function activateSubmit(){
    let inputsRadios = document.getElementsByName('questionChoice');
    let btnSubmit = document.getElementById('btn-submit');

    
const anyInputSelected =Array.from(inputsRadios).some(input => input.checked);
if (anyInputSelected === false){
    console.log('Le bouton vérifier ne peut etre coché');
    btnSubmit.style.opacity = '0.5';
    btnSubmit.style.cursor = 'not-allowed';
    btnSubmit.disabled = true;
   
}
// Le style du boutton vérifier si un input est coché 
if (anyInputSelected === true){
    console.log('Le bouton vérifier peut etre coché');
    btnSubmit.style.opacity = '1';
    btnSubmit.style.cursor = 'pointer';
    btnSubmit.disabled = false;

};
setUpRadioListeners();
}

// Sélctionner l'input radio quand la div qui lui correspond est selectionné
    // Récupérer tous les div de choice_container
choiceContainers = document.querySelectorAll('.choice_container');
    //Un eventlistener sur chaque div choiceContainer pour sélectionner l'input radio au click
choiceContainers.forEach(divchoiceContainer =>{
    divchoiceContainer.addEventListener('click', function(){
        const input = divchoiceContainer.querySelector('input[type="radio"]')
        input.checked = true;
        activateSubmit();

    })
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

let questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

function updateprogressBar(){
    console.log('Le trait évolue');
    let progressBar = document.querySelector('.evolution');
    
    if(progressBar.style.width === "900px"){
        progressBar.style.width = '900px';
    } else{
    progress += 60;
    progressBar.style.width = `${progress}px `;
    }
    

}

// Pour colorer l'input sélectionner ou le décolorer s'il est déselectionner


// Fonction pour déclencher le compte  rembours pour chaque question
function startQuestionTimer(){
    let timeLeft = timeLimit; //Pour réinitialiser le temps 
    timerDisplay.style.display = 'block';
    timerDisplay.textContent = `Temps restant: ${timeLeft}`;
    
    if (timerInterval){
        clearInterval(timerInterval);
    }

    if (timeOutId){
        clearTimeout(timeOutId);
    }

    timerInterval = setInterval(() =>{
        timeLeft--;
        timerDisplay.textContent = `Temps restant: ${timeLeft}s`;
        if(timeLeft <= 15){
            timerDisplay.style.color = 'red';
        }
        if (timeLeft <=0){
            clearInterval(timerInterval);
            handleTimeExpired()
        }
    }, 1000);

    timeOutId = setTimeout(() => {
        handleTimeExpired()
    }, timeLimit * 1000);
}

    // Fonction pour ce qui va se passer quand le temps sera écoulé
function handleTimeExpired(){
    console.log('Temps écoulé!')
    clearInterval(timerInterval); // Arreter le compte a rebours visuel
    clearTimeout(timeOutId); // Arreter le timer principal
    //Afficher le message temps écoulé
    divTempsEcoule.textContent = 'Le temps est écoulé.';

    // Désactiver les boutons radios
    inputsRadios.forEach(input =>{
        input.disabled = true;
    })

    // Afficher le boutton continuer et enlever le bouton vérifier
    btnContinue.style.display = 'block';
    btnSubmit.style.display = 'none';

    // Afficher le texte de l'explication

    explication.textContent = questions[currentQuestionIndex].explicationText
    explication.style.display = 'block'

    // Colorer l'input de la bonne réponse en vert 

    inputsRadios.forEach(radio =>{
        if (radio.value === questions[currentQuestionIndex].correct){
            radio.style.backgroundColor = "rgba(83, 228, 126, 1)'";
            radio.style.border = "2px solid rgba(137, 247, 103, 1)";

        }
    })

}

let infos = document.querySelector('.infos')
let jeu = document.querySelector('.jeu')
jeu.style.display = 'none'
let loader = document.getElementById('loader')
let play = document.getElementById('play')


document.addEventListener('DOMContentLoaded', () => {
    play.addEventListener("click", () =>{
        setTimeout(() => {
                    infos.style.display= "none"
                    loader.style.display = 'none';
                    jeu.style.display = 'block';                    
            }, 3000);

    })

        //mise a jour du formulaires avec la premiere question et propositions de réponses lorsque la page se charge 
        questionNumber.textContent = `Question: ${currentQuestionIndex +1} / ${questions.length} `;
        updateForm(questions[currentQuestionIndex]);
        activateSubmit();
        btnContinue.style.display = 'none';
        btnSubmit.style.display = 'block';
        startQuestionTimer()



})


function finalWord(){
    if(1 < score <= 3){
        explication.textContent = `Bravo tu as fini le Quizz avec un score de ${n} sur ${questions.length} ! Il faut travailler dur pour améliorer tes compétences!`
    }
    if(4 <= score <= 5){
        explication.textContent = `Bravo tu as fini le Quizz avec un score de ${n} sur ${questions.length} ! C'est un bou début mais il y a encore du travail à faire!`

    }
    if (6 <= score <= 7){
        explication.textContent = `Bravo tu as fini le Quizz avec un score de ${n} sur ${questions.length} ! Tu as montré des compétences solides continues comme ça!`

    }
    if(8 <= score <= 9){
        explication.textContent = `Bravo tu as fini le Quizz avec un score de ${n} sur ${questions.length} ! Excellente performance tu es vraiment doué!`

    }
    if (score === 10){
        explication.textContent = `Bravo tu as fini le Quizz avec un score de ${n} sur ${questions.length} ! Parfait1 Tu as démontré une maitrise exceptionnelle`

    }
}


const quizForm = document.getElementById('quizForm');
quizForm.addEventListener('submit', function(event){
    event.preventDefault();
    checkAnswer(quizForm, questions[currentQuestionIndex]);
    })

btnContinue.addEventListener('click', () =>{
            currentQuestionIndex++;
            updateprogressBar()

            if (currentQuestionIndex < questions.length){
                questionNumber.textContent = `Question: ${currentQuestionIndex +1} `;
                console.log(currentQuestionIndex+1);
                resetUi(); // Pour réinitialiser l'interface utilisateur
                updateForm(questions[currentQuestionIndex]); // POUr charger la nouvelle question
                activateSubmit(); // ACTIVER ou désactiver la nouvelle question  
                startQuestionTimer()
 } else {
                // Le quizz est fini
                console.log('Le quizz est fini😊😊⏲️')
                resetUi();
                questionNumber.textContent = 'Quizz terminé !!';
                finalWord();
                explication.style.display = 'block';
                btnContinue.style.display = 'none';
                btnSubmit.style.display = 'none';
                quizForm.style.display = 'none';
                questionText.textContent = '';
                timerDisplay.style.display = "none";
                btnReplay.style.display = 'block'
                btnReplay.addEventListener('click', () =>{
                    location.reload()
                })
                score.style.display = 'none'
                   
            }

    })
    

