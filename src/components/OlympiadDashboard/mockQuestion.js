

export const mockQuestions = [
  {
    id: 1,
    text: "Jika sebuah mobil bergerak dengan kecepatan 60 km/jam selama 2 jam, berapa jarak yang ditempuh?",
  },
  {
    id: 2,
    text: "Berapa hasil dari 15 + 27 - 8?",
  },
  {
    id: 3,
    text: "Dalam sebuah segitiga siku-siku, jika panjang alas 3 cm dan tinggi 4 cm, berapa panjang hipotenusa? (dalam cm)",
  },
  // Question 30 (matching the image)
  {
    id: 30,
    text: "Jika x + 5 = 12, berapa nilai x?",
  }
];

// Generate more questions to reach 50 total
for (let i = 4; i <= 50; i++) {
  if (i !== 30) { // Skip 30 since we already defined it
    mockQuestions.push({
      id: i,
      text: `Pertanyaan nomor ${i}. Berapa hasil dari ${i} × 2 + 10?`,
    });
  }
}