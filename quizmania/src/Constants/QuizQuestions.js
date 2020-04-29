const QUIZ_CONSTANTS = {
  quiz_id: "12345",
  quiz_name: "Marvel Vs DC",
  quiz_max_mark: 3,
  quiz_questions: [
    {
      question_id: 0,
      question_type: "mcqs",
      question_text: "Which are the following are in MCU ? ",
      options: ["Super Man", "Spider Man", "Wonder Woman", "Flash"],
      correct_answer: [1],
    },
    {
      question_id: 1,
      question_type: "mcqs",
      question_text: "Which are the following are in DCU ?",
      options: ["Thor", "Spider Man", "Iron Man", "Flash"],
      correct_answer: [3],
    },
    {
      question_id: 2,
      question_type: "mcqs",
      question_text: "What type of Infinity Stone does Doctor Strange had ?",
      options: ["Power", "Time", "Mind", "Space"],
      correct_answer: [1],
    },
    {
      question_id: 3,
      question_type: "mcqs",
      question_text:
        "Who snapped the Infinity Gauntlet to bring back everyone who disappeared?",
      options: ["The Hulk", "Thanos", "Captain America", "Iron Man"],
      correct_answer: [0],
    },
  ],
};

export default QUIZ_CONSTANTS;
