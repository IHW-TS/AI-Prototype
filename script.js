// Charger les données des cas de test
let testcases;

fetch('testcases.json')
    .then(response => response.json())
    .then(data => {
        testcases = data;
    });

function getDiagnosis() {
    const ageValue = document.getElementById('age').value;
    const sexValue = document.getElementById('sex').value;
    const pregnantValue = document.getElementById('pregnant').checked;
    const disabledValue = document.getElementById('disabled').checked;
    const allergiesValue = document.getElementById('allergies').value.toLowerCase();
    const symptomsText = document.getElementById('symptoms').value.toLowerCase();
    const output = document.getElementById('output');
    const matchedConditions = [];

    for (let testcase of testcases) {
        const ageMatch = ageValue && testcase.age.value == ageValue;
        const sexMatch = sexValue && testcase.sex == sexValue;
        const symptomMatch = testcase.evidence.present.some(evidence =>
            symptomsText.includes(evidence.name.toLowerCase())
        );

        if (symptomMatch && (ageMatch || sexMatch)) {
            matchedConditions.push(...testcase.predicted_conditions.map(condition => condition.name));
        }
    }

    if (matchedConditions.length) {
        output.innerText = 'Conditions possibles : ' + Array.from(new Set(matchedConditions)).join(', ');
    } else {
        output.innerText = 'Aucune condition trouvée.';
    }
}
