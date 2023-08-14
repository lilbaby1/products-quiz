// Questions of which the quiz consists of.
// For some question only a single answer could be picked and for others,
// multiple could be picked. That is why every question has a property multipleAnswers (boolean).
export const questions = [
  { question: "What's your hair type or texture?", multipleAnswers: false },
  { question: "How often do you wash your hair?", multipleAnswers: false },
  {
    question: "What benefit do you look for in your hair products?",
    multipleAnswers: true,
  },
  {
    question: "Is there anything troubling you about your hair?",
    multipleAnswers: true,
  },
  {
    question: "What is your natural hair color(s) today?",
    multipleAnswers: false,
  },
]

// This is the array of possible answers for each question from the quiz.
export const answers = {
  0: ["Straight", "Curly", "Wavy", "Fine"],
  1: [
    "Daily",
    "Every other day",
    "Twice a weel",
    "Once a week",
    "Every two weeks",
  ],
  2: [
    "Anti-breakage",
    "Hydration",
    "Soothing dry scalp",
    "Repairs appearance of damaged hair",
    "Volume",
    "Curl and coil enhancing",
  ],
  3: ["Breakage", "Frizz", "Scalp dryness", "Damage", "Tangling"],
  4: ["Black", "Brown", "Blonde", "Red/Orange", "Silver/Grey"],
}

// This is an object which has keys that are identical to the strings inside the answers array.
// For each key there is an array of "keywords" that are associated with the meaning of the key.
// This object is used in order to fetch data for products based on the values inside it.
export const keywords = {
  "Anti-breakage": ["breaking", "damage", "strong", "renew"],
  "Soothing dry scalp": [
    "dry",
    "dry scalp",
    "irritation",
    "irritate",
    "inflam",
    "cool",
  ],
  "Repairs appearance of damaged hair": ["repair", "damage", "renew"],
  "Curl and coil enhancing": ["curl", "coil"],
  "Scalp dryness": [
    "dry",
    "dry scalp",
    "irritation",
    "irritate",
    "inflam",
    "cool",
  ],
  Tangling: ["tangle", "untangle", "straighten"],
  "Silver/Grey": ["silver", "grey", "color"],
}

export const answerAplhabeticalIndex = "abcdefghijklmnopqrstuvwxyz".split("")
