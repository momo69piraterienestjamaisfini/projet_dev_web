
document.addEventListener("DOMContentLoaded", function () {
const mobileMenu = document.getElementById("mobileMenu");

  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

/* -------- 1. CALCULATRICE -------- */
const calcDisplay = document.getElementById('calc-display');
document.querySelectorAll('#calc [data-key]').forEach(btn => {
  btn.addEventListener('click', () => {
    const k = btn.dataset.key;
    if (k === 'C')       { calcDisplay.value = ''; }
    else if (k === '=')  { try { calcDisplay.value = eval(calcDisplay.value); } catch { calcDisplay.value = 'Err'; } }
    else                 { calcDisplay.value += k; }
  });
});

/* -------- 2. QUESTIONNAIRE -------- */
const questionnaire = [
  { qlabel: 'Quel est le résultat de 2 + 2 ?', qid: 1,
    reponses: [
      { rlabel: '3',  rid: 1, correct: false },
      { rlabel: '4',  rid: 2, correct: true  },
      { rlabel: '22', rid: 3, correct: false }
    ]
  },
  { qlabel: 'La couleur du ciel par temps clair est…', qid: 2,
    reponses: [
      { rlabel: 'Bleu',  rid: 3, correct: true  },
      { rlabel: 'Vert',  rid: 1, correct: false },
      { rlabel: 'Rouge', rid: 2, correct: false }
    ]
  },
  { qlabel: 'Combien de lettres dans « HTML » ?', qid: 3,
    reponses: [
      { rlabel: '3', rid: 3, correct: false },
      { rlabel: '4', rid: 1, correct: true  },
      { rlabel: '5', rid: 2, correct: false }
    ]
  }
];

let current = 0;
let reponses = ''; // ex : A1_2A2_3…

const quizZone = document.getElementById('quiz-zone');
renderQuestion();

/* injecte la question courante */
function renderQuestion() {
  if (current >= questionnaire.length) { return checkContactPage(); }

  const q = questionnaire[current];
  const html =
    `<div class="card bg-base-100 shadow-xl mb-4">
       <div class="card-body">
         <h3 class="card-title">${q.qlabel}</h3>
         <div class="flex flex-wrap gap-2 mt-3">
           ${q.reponses.map(r =>
             `<button class="btn btn-outline" data-rid="${r.rid}">${r.rlabel}</button>`
           ).join('')}
         </div>
       </div>
     </div>`;
  quizZone.innerHTML = html;

  quizZone.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const rid = btn.dataset.rid;
      reponses += `A${q.qid}_${rid}`;
      current++;
      renderQuestion();
    });
  });
}

/* test si la page contact existe puis redirige / affiche un message */
function checkContactPage() {
  const fname = `${reponses}.html`;

  fetch(fname, { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        window.location.href = fname;
      } else {
        quizZone.innerHTML =
          `<div class="alert alert-info max-w-md mx-auto">
             Suite à vos réponses, vous ne souhaitez pas être contacté·e 😌
           </div>`;
      }
    })
    .catch(() => {
      quizZone.innerHTML =
        `<div class="alert alert-error max-w-md mx-auto">
           Erreur réseau ; impossible de vérifier la page de contact.
         </div>`;
    });
}

/* -------- 3. BRUTE-FORCE « HACK » -------- */
document.getElementById('btn-bruteforce').addEventListener('click', bruteForce);

function bruteForce() {
  /* récupère la bonne réponse de chaque question puis compose le nom */
  const brute = questionnaire.map(q => {
    const good = q.reponses.find(r => r.correct);
    return `A${q.qid}_${good.rid}`;
  }).join('');
  window.location.href = `${brute}.html`;
}
});

  