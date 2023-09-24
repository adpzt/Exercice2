"use strict";

/*

tueur en serie : jason. Est en cavale caché dans une foret. 100pts de vie.

Equipe de choc : caracteristiques, proba de mourir/mettre des degats/mourrir en mettant des dégats. 
5 survivants (généré aléatoirement d'un tableau de prénoms) avec une caractéristique généré aléatoirement.

Le tueur doit attaquer :
- soit le survivant meurt
- soit le survivant esquive et inflige 10 pts de degats
- soit le survivant inflige 15 points de degats mais meurt

Pour chaque action, un message est attendu (Jason a tué x, x a esquivé et a infligé x degats, x est mort, x est mort mais inglige x dégats).

La partie finie quand les survivants ont tué Jason ou que le tueur a tué tout les survivants. A la fin, les morts sont affichés.

*/

//-------------------------------------------*/

let tueur= ["Jason", 60] ;                           // son nom et ses points de vie.
let survivants = ["Norman", "Ludmila", "Océane", "Lucie", "Paul"] ;
let carac = ["Mineur", "Chamane", "Touriste", "Skieur", "Policier"] ;
let proba = [[0.3, 0.4, 0.3], [0.2, 0.7, 0.1], [0.6, 0.2, 0.2], [0.7, 0.1, 0.2], [0.1, 0.6, 0.3]]; // [["est mort", "met des dégats", "meurt en mettant des dégats"] = un tableau de stats avec [[]] un petit tableau et 0.x comme index 0/1/2 des petits tableaux]
let survivantsMorts = [] ;                            // tableau des survivants morts.
let objets = [] ;                                     // tableau des objets (constructor) des survivants.

//-------------------------------------------*/

class Personnages {                                   // création d'une variable class pour crée notre personnage
    constructor(survivants, caractéristiques, probaMort, probaDegats, probaMortDegats) { 
        this.survivants = survivants;                 // crée une caractéristique "survivants" pour construire le personnage.
        this.caractéristiques = caractéristiques;     // crée une caractéristique "caractéristique" pour construire le personnage.
        this.probaMort = probaMort;                   // crée une caractéristique "probaMort" pour construire le personnage.
        this.probaDegats = probaDegats;               // crée une caractéristique "probaDegats" pour construire le personnage.
        this.probaMortDegats = probaMortDegats;       // crée une caractéristique "probaMortDegats" pour construire le personnage.
    } 
}

//-------------------------------------------*/

survivants.forEach(survivant => {                     // Pour chaque survivant, une caractéristique + stats vont etre attribué aléatoirement.

    let c = Math.floor(Math.random() * carac.length); // randomize la longeur de mon tableau carac (5) donc prend un nombre aléatoire entre 0 et 4 ([0, 5[). Le .length = taille d'un élément.
    let caractéristique = carac.splice(c, 1);         // Prend un élément du tableau carac, à partir de l'index (c), en le retirant du tableau. Le chiffre 1 signifie qu'on va retirer UN élément. Le tout est réalisable grace à la commande splice.
    let s = Math.floor(Math.random() * proba.length); // randomize la longeur de mon tableau proba (5) donc prend un nombre aléatoire entre 0 et 4 ([0, 5[). Le .length = taille d'un élément.
    let statsSurvivants = proba.splice(s, 1);         // Prend un élément du tableau proba, à partir de l'index (s), en le retirant du tableau. Le chiffre 1 signifie qu'on va retirer UN élément. Le tout est réalisable grace à la commande splice.

    let personnages = new Personnages(survivant, caractéristique, statsSurvivants[0][0], statsSurvivants[0][1], statsSurvivants[0][2]) ; // création d'un objet (les éléments du constructor) de la class personnages
    objets.push(personnages);                         // .push = permet d'ajouter un élément dans un tableau. () ce qui est ajouté, et ici x pour x.push = le tableau (objets)

})

// console.log(objets);

//-------------------------------------------*/

function attaqueTueur(survivantCible, chiffreSurvivants) {  
    let valeurAleatoire = Math.random()                            // Math.random = prend un chiffre aléatoire entre 0,0 et 0, 99 ( [0, 1[ ). C'est comme un dé.

    if (valeurAleatoire < survivantCible["probaMort"]) {           // si la valeur aléatoire est inferieure à la probabilité de mourir, alors Jason tuera le survivant.
        console.log("Jason a tué", survivantCible["survivants"]); 
        survivantsMorts.push(survivantCible["survivants"]);        // .push = permet d'ajouter un élément dans un tableau. () ce qui est ajouté, et ici x pour x.push = le tableau (objets)
        objets.splice(chiffreSurvivants, 1);                       // Supprimer du tableau joueur le survivant grace à la méthode .splice et 1 = le nombre de survivants supprimé (à partir de l'index ciblé).

      } else if (survivantCible["probaMort"] + survivantCible["probaDegats"] > valeurAleatoire) {   // si la valeur aléatoire est superieur à la probabilité de mourir + probabilité de mettre des dégats, alors le survivant esquivera Jason et lui infligera des dégats (-10).
        console.log(survivantCible["survivants"],"esquive et met 10 de dégâts à Jason ! 🤛");         
        tueur[1] = tueur[1] - 10;                                                                   // [1] = index 1 de la variable tueur. Le tueur perd 10 de dégats.

      } else {  // (survivantCible["probaMort"] + survivantCible["probaDegats"] < valeurAleatoire)
        console.log(survivantCible["survivants"], "se sacrifie et met 15 dégâts à Jason !. 🗡️");    
        tueur[1] = tueur[1] - 15;                                                                   // [1] = index 1 de la variable tueur. Le tueur perd 15 de dégats.
        survivantsMorts.push(survivantCible["survivants"]);                                         // .push = permet d'ajouter un élément dans un tableau. () ce qui est ajouté, et ici x pour x.push = le tableau (objets)
        objets.splice(chiffreSurvivants, 1);                                                        // Supprimer du tableau joueur le survivant grace à la méthode .splice et 1 = le nombre de survivants supprimé (à partir de l'index ciblé).
      }

    console.log("Survivants morts :", survivantsMorts);            // 
    combat()

};

//-------------------------------------------*/

function combat() {
    let affichageMort = "" ;                               // variable pour afficher les morts à la fin.

    if (objets.length >= 1 && tueur[1] > 0) {              // si il reste des survivants (objets) et que Jason est toujours vivants (pts de vie > à zéro)
        let chiffreSurvivants = Math.floor(Math.random() * objets.length);  // prend aléatoirement un chiffre (=survivants) entre 0 et la taille du tableau objets (-1 car dernier exclu)
        let survivantCible = objets[chiffreSurvivants]     // utilise le chiffre comme index pour récupérer un survivant
        attaqueTueur(survivantCible, chiffreSurvivants)    // J'appelle la fonction attaque de jason (attaqueTueur)

    } else if (objets.length >= 1 && tueur[1] <= 0) {      // Si il reste des survivants et que jason a 0 pts de vie (ou moins).
        for (let i = 0; i < survivantsMorts.length; i++) { // boucle. quand index i inferieur a la taille du tableau de survivant mort.
             let tombeau = survivantsMorts[i];             // variable tombeau, pour entre le mort dans un tableau tombeau
    
            if (survivantsMorts.length != 1) {
                if (tombeau == survivantsMorts[survivantsMorts.length - 1]) {            // si tombeau = index [i] des survivantsMorts, et qu'il est égal au dernier élément du tableau survivantMort
                    affichageMort = affichageMort + "et " + tombeau + "." ;             // alors l'affichage mettera un "et" devant son prénom de survivant et un "." a la fin pour finir la phrase.
                } else if (tombeau == survivantsMorts[survivantsMorts.length - 2]) {     // sinon, si l'index [i] des survivantsMorts est égal à l'avant dernier élément du tableau survivantMort
                    affichageMort = affichageMort + tombeau + " " ;                      // alors l'affichage mettera un " " (un espace) après le prénom du survivant afin de placer le "et" pour le dernier.
                } 
                
                else {                                                                   
                    affichageMort = affichageMort + tombeau + ", " ;                      // ici, l'affichage mettra seulement une virgule
                }
            } else {
                affichageMort = affichageMort + tombeau + ".";
            }
        }

    if (affichageMort == "") {
        console.log("Jason est mort ! Et PERSONNE n'est décedé avec lui !! 🦸")
    } else {
        console.log("Jason est mort ! Il a tué " + affichageMort + "⚰️")
    }

    } else if (objets.length == 0 && tueur[1] > 0) {                                 // Si les survivants sont morts et que Jason est vivant
        console.log("Jason a gagné, il ne reste plus aucun survivant. 🪦");

    } else if (objets.length == 0 && tueur[1] <= 0) {                                // Si tout le monde est mort à cause du fait que le dernier survivant à causé des dégats en mourrant à Jason.
        console.log("Tous le monde est mort." + affichageMort + " RIP... 💐");
    }

}

combat()
