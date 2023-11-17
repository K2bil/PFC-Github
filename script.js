let message = document.getElementById("message");
let nextBtn = document.getElementById("next");
let iapierreBtn = document.getElementById("iapierre");
let iafeuilleBtn = document.getElementById("iafeuille");
let iaciseauxBtn = document.getElementById("iaciseaux");
let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdi = document.getElementById("score-ordi");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];

const jouerManche = (e) => {
    let choix = e.target.closest(".btn-joueur");

    btnJoueur.forEach((btn) => {
        btn.classList.add("desactivated");
        btn.removeEventListener("click", jouerManche);
    });

    choix.classList.remove("desactivated");
    choix.classList.add("active");

    let choixJoueur = choix.id;
    let choixOrdi = fairechoixIA();

    verifierGagnat(choixJoueur, choixOrdi);

    nextBtn.style.visibility = "visible";
};

const PIERRE = "pierre";
const FEUILLE= "feuille";
const CISEAUX = "ciseaux";

const fairechoixIA = () =>{
    //0-pierre 1-feuille 2-ciseaux

    let nbAleatoire = Math.floor(Math.random() * 3);

    switch (nbAleatoire) {
        case 0:
            iapierreBtn.classList.add("active");
            return PIERRE;
        case 1:
            iafeuilleBtn.classList.add("active");
            return FEUILLE;
        default:
            iaciseauxBtn.classList.add("active");
            return CISEAUX;
    }
};

const verifierGagnat = (choixJoueur, choixOrdi) => {
    if (choixJoueur == choixOrdi) {
        message.textContent = "Egalité !"
    }
    if (choixJoueur == PIERRE) {
        if (choixOrdi == FEUILLE) {
            return victoireIA();
        }else if (choixOrdi == CISEAUX) {
            return victoireJoueur();
        }
    }
    if (choixJoueur == FEUILLE) {
        if (choixOrdi == CISEAUX) {
            return victoireIA();
        }else if (choixOrdi == PIERRE) {
            return victoireJoueur();
        }
    }
    if (choixJoueur == CISEAUX) {
        if (choixOrdi == PIERRE) {
            return victoireIA();
        }else if (choixOrdi == FEUILLE) {
            return victoireJoueur();
        }
    }
};

const victoireIA = () => {
    message.textContent = "Perdu!";
    scoreOrdi.textContent++;
};
const victoireJoueur = () => {
    message.textContent = "Gagné! :)";
    scoreJoueur.textContent++;
};

const nouvelManche = () => {
    btnJoueur.forEach((btn) =>{
        btn.classList.remove("desactivated");
        btn.classList.remove("active");
        btn.addEventListener("click", jouerManche);
    });

    nextBtn.style.visibility = "hidden";

    iapierreBtn.classList.remove("active");
    iafeuilleBtn.classList.remove("active");
    iaciseauxBtn.classList.remove("active");

    message.textContent = "A vous de jouer"
};
nextBtn.addEventListener("click", nouvelManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click", () => {
    scoreJoueur.textContent = 0;
    scoreOrdi.textContent = 0;

    nouvelManche();
});