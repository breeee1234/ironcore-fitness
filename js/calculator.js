/* ==========================================================================
   IRONCORE FITNESS - BMI & FITNESS GOAL CALCULATOR
   Interactive calculation, visual gauge, and tailored workout recommendation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBMICalculator();
});

function initBMICalculator() {
  const form = document.getElementById('bmiForm');
  if (!form) return;

  const heightInput = document.getElementById('bmiHeight');
  const weightInput = document.getElementById('bmiWeight');
  const ageInput = document.getElementById('bmiAge');
  const genderInput = document.getElementById('bmiGender');
  const valueDisplay = document.getElementById('bmiValueDisplay');
  const categoryDisplay = document.getElementById('bmiCategoryDisplay');
  const adviceDisplay = document.getElementById('bmiAdviceDisplay');
  const recProgramBtn = document.getElementById('bmiRecommendBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      window.showToast('Please enter valid height and weight values.', 'error');
      return;
    }

    // BMI Formula: weight (kg) / (height (m) * height (m))
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    valueDisplay.textContent = bmi;

    let category = '';
    let categoryColor = '#FFFFFF';
    let advice = '';
    let recommendedProgram = 'Personal Training';

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = '#38BDF8';
      advice = 'Your BMI suggests you need healthy mass. We recommend high-protein nutrition paired with our Hypertrophy & Weight Training program.';
      recommendedProgram = 'Weight Training';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = 'Optimal Fitness';
      categoryColor = '#10B981';
      advice = 'You are in prime shape! Level up your athletic endurance and functional strength with our high-intensity CrossFit & Strength conditioning.';
      recommendedProgram = 'CrossFit';
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = 'Overweight';
      categoryColor = '#FF5A1F';
      advice = 'Targeted metabolic conditioning and cardiovascular training will incinerate fat while preserving lean muscle mass.';
      recommendedProgram = 'Cardio Training';
    } else {
      category = 'Obesity Class';
      categoryColor = '#EF4444';
      advice = 'Our certified elite personal coaches will tailor a safe, progressive fat-loss regimen with customized nutrition planning.';
      recommendedProgram = 'Personal Training';
    }

    categoryDisplay.textContent = category;
    categoryDisplay.style.color = categoryColor;
    adviceDisplay.textContent = advice;

    if (recProgramBtn) {
      recProgramBtn.style.display = 'inline-flex';
      recProgramBtn.setAttribute('data-program', recommendedProgram);
      recProgramBtn.innerHTML = `Claim Free Trial for <strong>${recommendedProgram}</strong> <i class="fa-solid fa-arrow-right"></i>`;
    }

    window.showToast(`BMI Calculated: ${bmi} (${category})`, 'success');
  });

  if (recProgramBtn) {
    recProgramBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const prog = recProgramBtn.getAttribute('data-program') || 'Strength Training';
      if (window.openJoinModal) {
        window.openJoinModal('Premium', prog);
      }
    });
  }
}
