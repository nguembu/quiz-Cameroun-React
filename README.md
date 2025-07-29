# 🧠 Quiz Culture Générale Cameroun - React

Mini Quiz React sur la culture générale du Cameroun, avec niveaux de difficulté progressifs et timer intégré.

---

## 📖 Description

Ce projet est un quiz interactif réalisé en **React**, destiné à tester les connaissances sur le Cameroun à travers 3 niveaux de difficulté : facile, moyen, difficile.

- Timer de 15 secondes par question pour pimenter le défi ⏳  
- Effets sonores pour réponses correctes ou incorrectes 🔊  
- Transition fluide entre les niveaux  
- Résumé final et possibilité de rejouer 🔄  

Ce quiz peut être utilisé comme outil éducatif, ludique ou même pour s'entraîner à mieux connaître le Cameroun.

---

## 🚀 Fonctionnalités

- 3 niveaux de difficulté avec questions spécifiques à chaque niveau  
- Timer visuel avec changement de couleur quand le temps est presque écoulé  
- Effets sonores pour valider les réponses  
- Transitions animées entre niveaux pour une expérience utilisateur fluide  
- Score affiché à la fin de chaque niveau avec possibilité de passer au niveau supérieur si la note est suffisante  
- Bouton recommencer pour refaire le quiz depuis le début ou rejouer un niveau  

---

## 🛠️ Technologies utilisées

- React (hooks : `useState`, `useEffect`, `useCallback`, `useRef`)  
- CSS-in-JS avec styles inline et animations clés (`@keyframes`)  
- Audio HTML5 pour les effets sonores  
- Gestion du timer avec `setInterval` et nettoyage propre  
- Gestion avancée des états pour navigation entre questions et niveaux  

---

## ⚙️ Installation & lancement

Clonez le dépôt :

```bash
git clone git@github.com:nguembu/quiz-Cameroun-react.git
cd quiz-Cameroun-react
Installez les dépendances :

bash
Copier
Modifier
npm install
Lancez le projet en mode développement :

bash
Copier
Modifier
npm start
Ouvrez dans votre navigateur :

http://localhost:3000
📂 Structure du projet
bash
Copier
Modifier
/src
  /components
    - QuestionCard.jsx      # Composant pour afficher une question avec ses options
  /data
    - questionsByLevel.js   # Questions triées par niveaux : easy, medium, hard
  - App.jsx                # Composant principal qui gère le quiz, timer, score, niveaux
/public
  /sounds
    - correct.mp3          # Son réponse correcte
    - wrong.mp3            # Son réponse incorrecte
🎨 Personnalisation
Modifier ou ajouter des questions dans /src/data/questionsByLevel.js

Modifier la durée du timer dans la constante TIMER_DURATION

Changer les seuils de passage entre niveaux dans la constante PASS_SCORE

Personnaliser les styles dans App.jsx et QuestionCard.jsx

🤝 Contribution
Contributions, suggestions et améliorations sont les bienvenues !
N’hésitez pas à faire un fork, proposer des issues ou ouvrir une pull request.

🌱 Avenir
Voici quelques idées pour faire évoluer ce quiz :

Ajouter des catégories thématiques (histoire, géographie, culture…)

Intégrer un système de compte utilisateur pour suivre les progrès

Ajouter un classement en ligne avec scores des joueurs

Proposer des quiz multijoueurs en temps réel

Optimiser l’accessibilité pour tous les profils

👨‍💻 Auteur
Johnny Nguembu – Développeur web full-stack passionné par la création d’applications éducatives et interactives.

Merci d’avoir testé ce quiz ! 🎉


