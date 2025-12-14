const addBtn = document.getElementById("addQuestionBtn");

const questionInput = document.getElementById("question");
const optionInputs = [
  document.getElementById("opt1"),
  document.getElementById("opt2"),
  document.getElementById("opt3"),
  document.getElementById("opt4")
];
const answerInput = document.getElementById("answer");

addBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();
  const options = optionInputs.map(opt => opt.value.trim());
  const answer = answerInput.value.trim();

  /* -------- VALIDATION -------- */

  if (!question || options.some(opt => !opt) || !answer) {
    alert("Fill all fields");
    return;
  }

  if (!options.includes(answer)) {
    alert("Answer must exactly match one of the options");
    return;
  }

  const payload = {
    question,
    options,
    answer
  };

  addBtn.disabled = true;
  addBtn.textContent = "Adding...";

  try {
    const res = await fetch("http://localhost:5000/api/questions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error("Failed to add question");
    }

    alert("Question added successfully");

    // clear form
    questionInput.value = "";
    optionInputs.forEach(opt => (opt.value = ""));
    answerInput.value = "";

  } catch (err) {
    console.error(err);
    alert("Error adding question");
  } finally {
    addBtn.disabled = false;
    addBtn.textContent = "Add Question";
  }
});
