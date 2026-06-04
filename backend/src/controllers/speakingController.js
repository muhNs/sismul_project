// Temporary in-memory storage (replace with actual database later)
let speakingScores = [];

// Mock data for speaking questions
const speakingQuestions = {
  3: [
    {
      id: 1,
      kelas: 3,
      instruction: 'Look at the picture and describe what you see.',
      targetSentence: 'The cat is sleeping on the sofa.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['cat', 'sleeping', 'sofa'],
      acceptableVariations: [
        'The cat is sleeping on the couch',
        'A cat is sleeping on the sofa',
        'The cat sleeps on the sofa',
      ],
    },
    {
      id: 2,
      kelas: 3,
      instruction: 'Say what the boy is doing.',
      targetSentence: 'The boy is playing football.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['boy', 'playing', 'football'],
      acceptableVariations: [
        'The boy is playing soccer',
        'A boy is playing football',
        'The boy plays football',
      ],
    },
    {
      id: 3,
      kelas: 3,
      instruction: 'Describe the weather.',
      targetSentence: 'It is sunny today.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['sunny', 'today'],
      acceptableVariations: [
        'It is a sunny day',
        'Today is sunny',
        'The weather is sunny',
      ],
    },
    {
      id: 4,
      kelas: 3,
      instruction: 'What is the girl doing?',
      targetSentence: 'The girl is reading a book.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['girl', 'reading', 'book'],
      acceptableVariations: [
        'The girl reads a book',
        'A girl is reading a book',
        'She is reading a book',
      ],
    },
    {
      id: 5,
      kelas: 3,
      instruction: 'Describe this animal.',
      targetSentence: 'The dog is running in the park.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['dog', 'running', 'park'],
      acceptableVariations: [
        'A dog is running in the park',
        'The dog runs in the park',
        'The dog is running at the park',
      ],
    },
    {
      id: 6,
      kelas: 3,
      instruction: 'What can you see?',
      targetSentence: 'I can see a red apple.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['see', 'red', 'apple'],
      acceptableVariations: [
        'I see a red apple',
        'There is a red apple',
        'A red apple',
      ],
    },
    {
      id: 7,
      kelas: 3,
      instruction: 'Describe the family.',
      targetSentence: 'This is my happy family.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['happy', 'family'],
      acceptableVariations: [
        'This is a happy family',
        'My family is happy',
        'This is my family',
      ],
    },
    {
      id: 8,
      kelas: 3,
      instruction: 'What is this?',
      targetSentence: 'This is a big house.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['big', 'house'],
      acceptableVariations: [
        'This is a large house',
        'It is a big house',
        'A big house',
      ],
    },
    {
      id: 9,
      kelas: 3,
      instruction: 'What time is it?',
      targetSentence: 'It is seven o clock.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['seven', 'clock'],
      acceptableVariations: [
        'It is seven',
        'The time is seven o clock',
        'Seven o clock',
      ],
    },
    {
      id: 10,
      kelas: 3,
      instruction: 'What color is this?',
      targetSentence: 'This is a blue car.',
      imageUrl: '',
      audioUrl: '',
      keywords: ['blue', 'car'],
      acceptableVariations: [
        'It is a blue car',
        'The car is blue',
        'A blue car',
      ],
    },
  ],
  // Add more questions for kelas 4, 5, 6 as needed
};

/**
 * Get speaking questions for a specific kelas
 * GET /api/speaking/questions?kelas=3
 */
exports.getQuestions = (req, res) => {
  try {
    const { kelas } = req.query;

    if (!kelas) {
      return res.status(400).json({ error: 'Kelas parameter is required' });
    }

    const questions = speakingQuestions[kelas];

    if (!questions) {
      return res.status(404).json({ error: `No questions found for kelas ${kelas}` });
    }

    // Shuffle questions and return 10 random ones
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    res.json(selected);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

/**
 * Save highest score for a student
 * POST /api/speaking/save-score
 * Body: { studentId, kelas, chapter, score }
 */
exports.saveScore = (req, res) => {
  try {
    const { studentId, kelas, chapter, score } = req.body;

    // Validation
    if (!studentId || !kelas || !chapter || score === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: studentId, kelas, chapter, score',
      });
    }

    if (score < 0 || score > 100) {
      return res.status(400).json({ error: 'Score must be between 0 and 100' });
    }

    // Find existing score
    const existingIndex = speakingScores.findIndex(
      (s) => s.studentId === studentId && s.kelas === kelas && s.chapter === chapter
    );

    if (existingIndex !== -1) {
      // Check if new score is higher
      const existingScore = speakingScores[existingIndex].score;
      
      if (score > existingScore) {
        // Update with highest score
        speakingScores[existingIndex] = {
          ...speakingScores[existingIndex],
          score,
          updatedAt: new Date().toISOString(),
        };
        
        return res.json({
          message: 'New highest score saved!',
          score,
          previousScore: existingScore,
          isNewHighest: true,
        });
      } else {
        // Keep existing higher score
        return res.json({
          message: 'Score submitted, but previous score was higher',
          score: existingScore,
          submittedScore: score,
          isNewHighest: false,
        });
      }
    } else {
      // Create new score entry
      const newScore = {
        id: speakingScores.length + 1,
        studentId,
        kelas,
        chapter,
        score,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      speakingScores.push(newScore);
      
      return res.status(201).json({
        message: 'Score saved successfully!',
        score,
        isNewHighest: true,
      });
    }
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
};

/**
 * Get all speaking scores for a student
 * GET /api/speaking/scores/:studentId
 */
exports.getScores = (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Student ID is required' });
    }

    const studentScores = speakingScores.filter((s) => s.studentId === studentId);

    if (studentScores.length === 0) {
      return res.json({
        message: 'No scores found for this student',
        scores: [],
      });
    }

    res.json({
      studentId,
      scores: studentScores,
      totalScore: studentScores.reduce((sum, s) => sum + s.score, 0),
      averageScore: (
        studentScores.reduce((sum, s) => sum + s.score, 0) / studentScores.length
      ).toFixed(2),
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
};
