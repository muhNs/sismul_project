import { SkillCategory, QuestionType } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/** Returns the 0-based index of the word that contains "___" */
function getMissingWordIndex(exercise: string): number {
    return exercise.split(' ').findIndex((w) => w.includes('___'));
}

// ─────────────────────────────────────────────────────────────
// Data definitions
// ─────────────────────────────────────────────────────────────

type MCQ = {
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    correctAnswer: 'A' | 'B' | 'C';
};

type Writing = {
    exercise: string;   // sentence containing ___
    correctAnswer: string;
};

type Speaking = {
    questionText: string;   // full sentence / text to read aloud
    correctAnswer: string;  // reference string for STT
};

type MaterialSeed<T> = {
    chapter: number;
    gradeLevel: number;
    title: string;
    questions: T[];
};

// ─────────────────────────────────────────────────────────────
// READING
// ─────────────────────────────────────────────────────────────

const readingData: MaterialSeed<MCQ>[] = [
    // Grade 3
    {
        chapter: 1, gradeLevel: 3, title: 'Animals',
        questions: [
            { questionText: 'What animal is this?', optionA: 'Cat', optionB: 'Dog', optionC: 'Bird', correctAnswer: 'A' },
            { questionText: 'What color is the dog?', optionA: 'Black', optionB: 'Brown', optionC: 'White', correctAnswer: 'B' },
            { questionText: 'Where is the fish?', optionA: 'In the sky', optionB: 'On the tree', optionC: 'In the water', correctAnswer: 'C' },
            { questionText: 'What can the bird do?', optionA: 'Swim', optionB: 'Fly', optionC: 'Run', correctAnswer: 'B' },
            { questionText: 'What does the rabbit eat?', optionA: 'Apple', optionB: 'Banana', optionC: 'Carrots', correctAnswer: 'C' },
            { questionText: 'What color is the duck?', optionA: 'Yellow', optionB: 'Green', optionC: 'Red', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 2, gradeLevel: 3, title: 'Fruits & Colors',
        questions: [
            { questionText: 'What color is the apple?', optionA: 'Blue', optionB: 'Red', optionC: 'Yellow', correctAnswer: 'B' },
            { questionText: 'What fruit is this?', optionA: 'Banana', optionB: 'Orange', optionC: 'Grape', correctAnswer: 'A' },
            { questionText: 'What shape is the orange?', optionA: 'Square', optionB: 'Triangle', optionC: 'Round', correctAnswer: 'C' },
            { questionText: 'Is the watermelon big?', optionA: 'Yes', optionB: 'No', optionC: "I don't know", correctAnswer: 'A' },
            { questionText: 'What color are the grapes?', optionA: 'Green', optionB: 'Purple', optionC: 'Black', correctAnswer: 'B' },
            { questionText: 'How does it taste?', optionA: 'Sour', optionB: 'Spicy', optionC: 'Sweet', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 3, gradeLevel: 3, title: 'Classroom',
        questions: [
            { questionText: 'What is this?', optionA: 'Bag', optionB: 'Book', optionC: 'Pen', correctAnswer: 'B' },
            { questionText: 'What do I use to write?', optionA: 'Pencil', optionB: 'Eraser', optionC: 'Ruler', correctAnswer: 'A' },
            { questionText: 'What color is the board?', optionA: 'Black', optionB: 'Green', optionC: 'White', correctAnswer: 'C' },
            { questionText: 'What color is the bag?', optionA: 'Blue', optionB: 'Red', optionC: 'Yellow', correctAnswer: 'A' },
            { questionText: 'Where do I sit?', optionA: 'Table', optionB: 'Chair', optionC: 'Floor', correctAnswer: 'B' },
            { questionText: 'Where is the book?', optionA: 'In the bag', optionB: 'On the desk', optionC: 'Under the chair', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 4, gradeLevel: 3, title: 'Numbers',
        questions: [
            { questionText: 'How many apples are there?', optionA: 'One', optionB: 'Two', optionC: 'Three', correctAnswer: 'B' },
            { questionText: 'What number is this?', optionA: 'Four', optionB: 'Five', optionC: 'Six', correctAnswer: 'B' },
            { questionText: 'How many cats do you see?', optionA: 'Three', optionB: 'Two', optionC: 'One', correctAnswer: 'A' },
            { questionText: 'What number is this?', optionA: 'Eight', optionB: 'Nine', optionC: 'Ten', correctAnswer: 'C' },
            { questionText: 'How many books do you have?', optionA: 'One', optionB: 'Two', optionC: 'Three', correctAnswer: 'A' },
            { questionText: 'How many birds are there?', optionA: 'Four', optionB: 'Five', optionC: 'Six', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 5, gradeLevel: 3, title: 'Family',
        questions: [
            { questionText: 'Who is he?', optionA: 'Mother', optionB: 'Father', optionC: 'Brother', correctAnswer: 'B' },
            { questionText: 'Who is she?', optionA: 'Mother', optionB: 'Sister', optionC: 'Father', correctAnswer: 'A' },
            { questionText: 'What is the baby doing?', optionA: 'Crying', optionB: 'Eating', optionC: 'Sleeping', correctAnswer: 'C' },
            { questionText: 'Is he a boy or a girl?', optionA: 'Boy', optionB: 'Girl', optionC: 'Man', correctAnswer: 'A' },
            { questionText: 'Who is old?', optionA: 'Baby', optionB: 'Grandfather', optionC: 'Sister', correctAnswer: 'B' },
            { questionText: 'Is she a girl?', optionA: 'Yes', optionB: 'No', optionC: 'Maybe', correctAnswer: 'A' },
        ],
    },
    // Grade 4
    {
        chapter: 1, gradeLevel: 4, title: 'Daily Routine',
        questions: [
            { questionText: 'What time do you wake up?', optionA: 'Five o\'clock', optionB: 'Six o\'clock', optionC: 'Seven o\'clock', correctAnswer: 'B' },
            { questionText: 'What does she do?', optionA: 'Brushes teeth', optionB: 'Washes face', optionC: 'Combs hair', correctAnswer: 'A' },
            { questionText: 'Where do they eat?', optionA: 'Kitchen', optionB: 'Living room', optionC: 'Dining room', correctAnswer: 'C' },
            { questionText: 'How does he go to school?', optionA: 'By car', optionB: 'By bus', optionC: 'By bike', correctAnswer: 'B' },
            { questionText: 'What time do you go to bed?', optionA: 'Eight o\'clock', optionB: 'Nine o\'clock', optionC: 'Ten o\'clock', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 2, gradeLevel: 4, title: 'Professions',
        questions: [
            { questionText: 'Where does Mr. Budi work?', optionA: 'Hospital', optionB: 'Bank', optionC: 'School', correctAnswer: 'C' },
            { questionText: 'Who does the doctor help?', optionA: 'Sick people', optionB: 'Animals', optionC: 'Students', correctAnswer: 'A' },
            { questionText: 'What does the farmer plant?', optionA: 'Corn', optionB: 'Rice', optionC: 'Apple', correctAnswer: 'B' },
            { questionText: 'What does the policeman do?', optionA: 'Drives a bus', optionB: 'Cooks food', optionC: 'Catches the thief', correctAnswer: 'C' },
            { questionText: 'Where does a chef cook?', optionA: 'In the garden', optionB: 'In the kitchen', optionC: 'In the garage', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 3, gradeLevel: 4, title: 'House',
        questions: [
            { questionText: 'What is in the living room?', optionA: 'Sofa and TV', optionB: 'Bed and lamp', optionC: 'Stove and pan', correctAnswer: 'A' },
            { questionText: 'What does mother cook?', optionA: 'Rice', optionB: 'Soup', optionC: 'Egg', correctAnswer: 'B' },
            { questionText: 'Where do you take a bath?', optionA: 'Bedroom', optionB: 'Kitchen', optionC: 'Bathroom', correctAnswer: 'C' },
            { questionText: 'What color is the blanket?', optionA: 'Red', optionB: 'Green', optionC: 'Blue', correctAnswer: 'B' },
            { questionText: 'Where does father park his car?', optionA: 'Garage', optionB: 'Garden', optionC: 'Balcony', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 4, gradeLevel: 4, title: 'Clothes',
        questions: [
            { questionText: 'What does he wear?', optionA: 'Shirt', optionB: 'T-shirt', optionC: 'Jacket', correctAnswer: 'B' },
            { questionText: 'What color is the skirt?', optionA: 'Blue', optionB: 'Pink', optionC: 'Yellow', correctAnswer: 'A' },
            { questionText: 'What color are the shoes?', optionA: 'Brown', optionB: 'White', optionC: 'Black', correctAnswer: 'C' },
            { questionText: 'Why does he wear a hat?', optionA: 'It is cold', optionB: 'It is hot', optionC: 'It is raining', correctAnswer: 'B' },
            { questionText: 'What do you need?', optionA: 'Hat', optionB: 'Shorts', optionC: 'Jacket', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 5, gradeLevel: 4, title: 'Hobbies',
        questions: [
            { questionText: 'Where do they play?', optionA: 'In the field', optionB: 'In the pool', optionC: 'In the house', correctAnswer: 'A' },
            { questionText: 'What is my hobby?', optionA: 'Singing', optionB: 'Reading', optionC: 'Dancing', correctAnswer: 'B' },
            { questionText: 'When does she go swimming?', optionA: 'Monday', optionB: 'Friday', optionC: 'Sunday', correctAnswer: 'C' },
            { questionText: 'Who do I ride my bicycle with?', optionA: 'Friends', optionB: 'Family', optionC: 'Teacher', correctAnswer: 'A' },
            { questionText: 'What does Siti do?', optionA: 'Dances', optionB: 'Sings', optionC: 'Plays', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 6, gradeLevel: 4, title: 'Transport',
        questions: [
            { questionText: 'How is the train?', optionA: 'Short and slow', optionB: 'Long and fast', optionC: 'Small and loud', correctAnswer: 'B' },
            { questionText: 'Where does a plane fly?', optionA: 'On the street', optionB: 'In the water', optionC: 'In the sky', correctAnswer: 'C' },
            { questionText: 'Where does the ship sail?', optionA: 'On the sea', optionB: 'In the sky', optionC: 'On the road', correctAnswer: 'A' },
            { questionText: 'What does father ride?', optionA: 'Car', optionB: 'Bicycle', optionC: 'Motorcycle', correctAnswer: 'C' },
            { questionText: 'What do students take?', optionA: 'Taxi', optionB: 'School bus', optionC: 'Train', correctAnswer: 'B' },
        ],
    },
    // Grade 5
    {
        chapter: 1, gradeLevel: 5, title: 'Public Places',
        questions: [
            { questionText: 'Who works at the hospital?', optionA: 'Teachers', optionB: 'Doctors and nurses', optionC: 'Police officers', correctAnswer: 'B' },
            { questionText: 'What do students do in the library?', optionA: 'Play football', optionB: 'Buy food', optionC: 'Read books', correctAnswer: 'C' },
            { questionText: 'Where does mother buy vegetables?', optionA: 'Supermarket', optionB: 'Post office', optionC: 'Bank', correctAnswer: 'A' },
            { questionText: 'Why does father go to the bank?', optionA: 'To buy a book', optionB: 'To save money', optionC: 'To eat lunch', correctAnswer: 'B' },
            { questionText: 'Where does he send a letter?', optionA: 'Post office', optionB: 'Hospital', optionC: 'School', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 2, gradeLevel: 5, title: 'Weather',
        questions: [
            { questionText: 'What should you bring?', optionA: 'Sunglasses', optionB: 'Umbrella', optionC: 'Hat', correctAnswer: 'B' },
            { questionText: 'How is the weather today?', optionA: 'Sunny', optionB: 'Snowy', optionC: 'Cloudy', correctAnswer: 'A' },
            { questionText: 'Why does the kite fly high?', optionA: 'It is raining', optionB: 'It is windy', optionC: 'It is hot', correctAnswer: 'B' },
            { questionText: 'When do they make a snowman?', optionA: 'Summer', optionB: 'Winter', optionC: 'Autumn', correctAnswer: 'B' },
            { questionText: 'What will happen soon?', optionA: 'It will rain', optionB: 'It will snow', optionC: 'The sun will shine', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 3, gradeLevel: 5, title: 'Food & Drink',
        questions: [
            { questionText: 'What is his favorite food?', optionA: 'Noodles', optionB: 'Fried chicken', optionC: 'Fried rice', correctAnswer: 'C' },
            { questionText: 'What does she drink?', optionA: 'Milk', optionB: 'Orange juice', optionC: 'Tea', correctAnswer: 'B' },
            { questionText: 'What do they eat?', optionA: 'Hot chicken noodles', optionB: 'Cold soup', optionC: 'Sweet bread', correctAnswer: 'A' },
            { questionText: 'How does the ice cream taste?', optionA: 'Sour', optionB: 'Spicy', optionC: 'Sweet', correctAnswer: 'C' },
            { questionText: 'What do we eat for breakfast?', optionA: 'Bread and jam', optionB: 'Rice and fish', optionC: 'Cake', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 4, gradeLevel: 5, title: 'Feelings',
        questions: [
            { questionText: 'Why is Andi happy?', optionA: 'He is sick', optionB: 'He gets a bicycle', optionC: 'He lost a toy', correctAnswer: 'B' },
            { questionText: 'How does she feel?', optionA: 'Sad', optionB: 'Angry', optionC: 'Happy', correctAnswer: 'A' },
            { questionText: 'Who broke the toy car?', optionA: 'His sister', optionB: 'His friend', optionC: 'His brother', correctAnswer: 'C' },
            { questionText: 'Why are they tired?', optionA: 'They played football', optionB: 'They slept all day', optionC: 'They watched TV', correctAnswer: 'A' },
            { questionText: 'How do you feel?', optionA: 'Thirsty', optionB: 'Hungry', optionC: 'Full', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 5, gradeLevel: 5, title: 'Appearance',
        questions: [
            { questionText: 'What kind of hair does she have?', optionA: 'Short and curly', optionB: 'Long and straight', optionC: 'Bald', correctAnswer: 'B' },
            { questionText: 'Is Budi tall or short?', optionA: 'Short', optionB: 'Tall', optionC: 'Fat', correctAnswer: 'B' },
            { questionText: 'What kind of eyes does she have?', optionA: 'Small', optionB: 'Slanted', optionC: 'Big and round', correctAnswer: 'C' },
            { questionText: 'What is the color of his hair?', optionA: 'Black', optionB: 'White', optionC: 'Brown', correctAnswer: 'B' },
            { questionText: 'How is his body?', optionA: 'Strong', optionB: 'Weak', optionC: 'Thin', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 6, gradeLevel: 5, title: 'Daily Chores',
        questions: [
            { questionText: 'When do you sweep the floor?', optionA: 'Every night', optionB: 'Every afternoon', optionC: 'Every morning', correctAnswer: 'C' },
            { questionText: 'What does the sister do?', optionA: 'Sweeps the floor', optionB: 'Washes the dishes', optionC: 'Cooks food', correctAnswer: 'B' },
            { questionText: 'What does he do after waking up?', optionA: 'Takes a bath', optionB: 'Eats breakfast', optionC: 'Makes his bed', correctAnswer: 'C' },
            { questionText: 'Where are the plants?', optionA: 'In the garden', optionB: 'In the bedroom', optionC: 'In the kitchen', correctAnswer: 'A' },
            { questionText: 'What does Doni feed his cat?', optionA: 'Meat and water', optionB: 'Fish and milk', optionC: 'Bread and cheese', correctAnswer: 'B' },
        ],
    },
    // Grade 6
    {
        chapter: 1, gradeLevel: 6, title: 'Directions',
        questions: [
            { questionText: 'Where is the bank?', optionA: 'Behind the hospital', optionB: 'Between the hospital and post office', optionC: 'Next to the school', correctAnswer: 'B' },
            { questionText: 'What must you do when the light is red?', optionA: 'Stop', optionB: 'Go straight', optionC: 'Turn left', correctAnswer: 'A' },
            { questionText: 'Where should you turn to find the bookstore?', optionA: 'Turn left', optionB: 'Go straight', optionC: 'Turn right', correctAnswer: 'C' },
            { questionText: 'Where is the school?', optionA: 'Opposite the park', optionB: 'Behind the park', optionC: 'Next to the bank', correctAnswer: 'A' },
            { questionText: 'What can you find in the city?', optionA: 'Tall buildings', optionB: 'Big farms', optionC: 'Quiet villages', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 2, gradeLevel: 6, title: 'Health',
        questions: [
            { questionText: 'Why does Budi have a stomachache?', optionA: 'He ate spicy food', optionB: 'He drank cold water', optionC: 'He played in the rain', correctAnswer: 'A' },
            { questionText: 'Why does Siti go to the dentist?', optionA: 'She has an earache', optionB: 'She has a toothache', optionC: 'She has a headache', correctAnswer: 'B' },
            { questionText: 'How many times should you take the medicine?', optionA: 'Once a day', optionB: 'Twice a day', optionC: 'Three times a day', correctAnswer: 'C' },
            { questionText: 'What does the doctor use to check temperature?', optionA: 'Stethoscope', optionB: 'Thermometer', optionC: 'Syringe', correctAnswer: 'B' },
            { questionText: 'What keeps our body healthy?', optionA: 'Eating candies', optionB: 'Eating fruits and vegetables', optionC: 'Drinking soda', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 3, gradeLevel: 6, title: 'Holidays',
        questions: [
            { questionText: 'Where did the family go?', optionA: 'To the mountain', optionB: 'To the beach', optionC: 'To the zoo', correctAnswer: 'B' },
            { questionText: 'What are they setting up?', optionA: 'A tent', optionB: 'A campfire', optionC: 'A table', correctAnswer: 'A' },
            { questionText: 'What did they see at the museum?', optionA: 'Live animals', optionB: 'Fossils and statues', optionC: 'Only paintings', correctAnswer: 'B' },
            { questionText: 'Which animal is the largest on land?', optionA: 'Lion', optionB: 'Giraffe', optionC: 'Elephant', correctAnswer: 'C' },
            { questionText: 'How was the weather on the mountain?', optionA: 'Very hot', optionB: 'Very cold', optionC: 'Warm and sunny', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 4, gradeLevel: 6, title: 'Animals & Habitats',
        questions: [
            { questionText: 'Why is the lion called the king of the jungle?', optionA: 'It is very fast', optionB: 'It is very small', optionC: 'It is very strong', correctAnswer: 'C' },
            { questionText: 'Where do camels survive?', optionA: 'In the thick forest', optionB: 'In the deep ocean', optionC: 'In the hot desert', correctAnswer: 'C' },
            { questionText: 'What can penguins do well?', optionA: 'Fly', optionB: 'Swim', optionC: 'Run', correctAnswer: 'B' },
            { questionText: 'Where does the kangaroo carry its baby?', optionA: 'On its back', optionB: 'In a pouch', optionC: 'On its head', correctAnswer: 'B' },
            { questionText: 'What is the biggest mammal in the ocean?', optionA: 'Shark', optionB: 'Dolphin', optionC: 'Blue whale', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 5, gradeLevel: 6, title: 'Personality',
        questions: [
            { questionText: 'What kind of girl is Rina?', optionA: 'Lazy', optionB: 'Helpful', optionC: 'Angry', correctAnswer: 'B' },
            { questionText: 'Why did Anton get a perfect score?', optionA: 'He is smart', optionB: 'He is lazy', optionC: 'He is naughty', correctAnswer: 'A' },
            { questionText: 'What does an honest person do?', optionA: 'Tells lies', optionB: 'Tells the truth', optionC: 'Keeps bad secrets', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 6, gradeLevel: 6, title: 'Materials',
        questions: [
            { questionText: 'What are the tables and chairs made of?', optionA: 'Plastic', optionB: 'Iron', optionC: 'Wood', correctAnswer: 'C' },
            { questionText: 'What is the ring made of?', optionA: 'Silver', optionB: 'Gold', optionC: 'Copper', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 7, gradeLevel: 6, title: 'Technology',
        questions: [
            { questionText: 'What do people use smartphones for?', optionA: 'To cook food', optionB: 'To call friends', optionC: 'To wash clothes', correctAnswer: 'B' },
            { questionText: 'What do you use to type your homework?', optionA: 'Television', optionB: 'Radio', optionC: 'Computer', correctAnswer: 'C' },
            { questionText: 'What does he send to his teacher?', optionA: 'A package', optionB: 'An email', optionC: 'A physical letter', correctAnswer: 'B' },
            { questionText: 'How does the internet help us?', optionA: 'Find information quickly', optionB: 'Make us feel tired', optionC: 'Hide our books', correctAnswer: 'A' },
            { questionText: 'Who uses a camera to take pictures?', optionA: 'Doctors', optionB: 'Photographers', optionC: 'Farmers', correctAnswer: 'B' },
        ],
    },
];

// ─────────────────────────────────────────────────────────────
// LISTENING
// ─────────────────────────────────────────────────────────────

const listeningData: MaterialSeed<MCQ>[] = [
    // Grade 3
    {
        chapter: 1, gradeLevel: 3, title: 'Animals',
        questions: [
            { questionText: 'Hewan apakah yang diucapkan?', optionA: 'Kucing', optionB: 'Anjing', optionC: 'Burung', correctAnswer: 'A' },
            { questionText: 'Hewan apakah yang diucapkan?', optionA: 'Ikan', optionB: 'Anjing', optionC: 'Kelinci', correctAnswer: 'B' },
            { questionText: 'Hewan apakah yang diucapkan?', optionA: 'Burung', optionB: 'Bebek', optionC: 'Ular', correctAnswer: 'A' },
            { questionText: 'Hewan apakah yang diucapkan?', optionA: 'Kucing', optionB: 'Burung', optionC: 'Ikan', correctAnswer: 'C' },
            { questionText: 'Hewan apakah yang diucapkan?', optionA: 'Monyet', optionB: 'Singa', optionC: 'Gajah', correctAnswer: 'A' },
            { questionText: 'Hewan apakah yang diucapkan?', optionA: 'Jerapah', optionB: 'Harimau', optionC: 'Gajah', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 2, gradeLevel: 3, title: 'Fruits',
        questions: [
            { questionText: 'Buah apakah yang diucapkan?', optionA: 'Pisang', optionB: 'Apel', optionC: 'Jeruk', correctAnswer: 'B' },
            { questionText: 'Buah apakah yang diucapkan?', optionA: 'Pisang', optionB: 'Semangka', optionC: 'Anggur', correctAnswer: 'A' },
            { questionText: 'Buah apakah yang diucapkan?', optionA: 'Jeruk', optionB: 'Mangga', optionC: 'Melon', correctAnswer: 'A' },
            { questionText: 'Buah apakah yang diucapkan?', optionA: 'Nanas', optionB: 'Semangka', optionC: 'Pepaya', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 3, gradeLevel: 3, title: 'Numbers',
        questions: [
            { questionText: 'Angka berapakah yang diucapkan?', optionA: '1', optionB: '2', optionC: '3', correctAnswer: 'A' },
            { questionText: 'Angka berapakah yang diucapkan?', optionA: '2', optionB: '3', optionC: '4', correctAnswer: 'B' },
            { questionText: 'Angka berapakah yang diucapkan?', optionA: '4', optionB: '5', optionC: '6', correctAnswer: 'B' },
            { questionText: 'Angka berapakah yang diucapkan?', optionA: '7', optionB: '8', optionC: '9', correctAnswer: 'A' },
            { questionText: 'Angka berapakah yang diucapkan?', optionA: '8', optionB: '9', optionC: '10', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 4, gradeLevel: 3, title: 'Colors',
        questions: [
            { questionText: 'Warna apakah yang diucapkan?', optionA: 'Biru', optionB: 'Merah', optionC: 'Kuning', correctAnswer: 'B' },
            { questionText: 'Warna apakah yang diucapkan?', optionA: 'Hijau', optionB: 'Hitam', optionC: 'Biru', correctAnswer: 'C' },
            { questionText: 'Warna apakah yang diucapkan?', optionA: 'Kuning', optionB: 'Putih', optionC: 'Cokelat', correctAnswer: 'A' },
            { questionText: 'Warna apakah yang diucapkan?', optionA: 'Merah', optionB: 'Hijau', optionC: 'Ungu', correctAnswer: 'B' },
            { questionText: 'Warna apakah yang diucapkan?', optionA: 'Hitam', optionB: 'Putih', optionC: 'Abu-abu', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 5, gradeLevel: 3, title: 'Greetings',
        questions: [
            { questionText: 'Apa arti dari sapaan tersebut?', optionA: 'Selamat malam', optionB: 'Selamat pagi', optionC: 'Selamat siang', correctAnswer: 'B' },
            { questionText: 'Apa arti dari sapaan tersebut?', optionA: 'Selamat tidur / malam', optionB: 'Selamat sore', optionC: 'Selamat tinggal', correctAnswer: 'A' },
            { questionText: 'Apa arti dari ucapan tersebut?', optionA: 'Sama-sama', optionB: 'Terima kasih', optionC: 'Maaf', correctAnswer: 'B' },
            { questionText: 'Apa arti dari ucapan tersebut?', optionA: 'Maaf', optionB: 'Tolong', optionC: 'Permisi', correctAnswer: 'A' },
            { questionText: 'Apa arti dari sapaan tersebut?', optionA: 'Halo', optionB: 'Sampai jumpa', optionC: 'Terima kasih', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 6, gradeLevel: 3, title: 'Body Parts',
        questions: [
            { questionText: 'Bagian tubuh mana yang diucapkan?', optionA: 'Hidung', optionB: 'Mata', optionC: 'Telinga', correctAnswer: 'B' },
            { questionText: 'Bagian tubuh mana yang diucapkan?', optionA: 'Hidung', optionB: 'Mulut', optionC: 'Gigi', correctAnswer: 'A' },
            { questionText: 'Bagian tubuh mana yang diucapkan?', optionA: 'Kepala', optionB: 'Telinga', optionC: 'Tangan', correctAnswer: 'B' },
            { questionText: 'Bagian tubuh mana yang diucapkan?', optionA: 'Kaki', optionB: 'Perut', optionC: 'Mulut', correctAnswer: 'C' },
            { questionText: 'Bagian tubuh mana yang diucapkan?', optionA: 'Tangan', optionB: 'Jari', optionC: 'Lengan', correctAnswer: 'A' },
        ],
    },
    // Grade 4
    {
        chapter: 1, gradeLevel: 4, title: 'Daily Routine',
        questions: [
            { questionText: 'Jam berapakah yang diucapkan?', optionA: 'Jam lima', optionB: 'Jam enam', optionC: 'Jam tujuh', correctAnswer: 'B' },
            { questionText: 'Aktivitas apa yang sedang dilakukan?', optionA: 'Mandi', optionB: 'Makan', optionC: 'Menggosok gigi', correctAnswer: 'C' },
            { questionText: 'Kegiatan apa yang disebutkan?', optionA: 'Sarapan', optionB: 'Makan siang', optionC: 'Makan malam', correctAnswer: 'A' },
            { questionText: 'Ke manakah dia pergi?', optionA: 'Ke pasar', optionB: 'Ke sekolah', optionC: 'Ke taman', correctAnswer: 'B' },
            { questionText: 'Jam berapa dia tidur?', optionA: 'Jam delapan', optionB: 'Jam sembilan', optionC: 'Jam sepuluh', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 2, gradeLevel: 4, title: 'Professions',
        questions: [
            { questionText: 'Apa profesi yang disebutkan?', optionA: 'Guru', optionB: 'Dokter', optionC: 'Polisi', correctAnswer: 'A' },
            { questionText: 'Siapa yang ditolong oleh dokter?', optionA: 'Murid sekolah', optionB: 'Hewan', optionC: 'Orang sakit', correctAnswer: 'C' },
            { questionText: 'Apa yang ditanam oleh petani?', optionA: 'Jagung', optionB: 'Padi', optionC: 'Bunga', correctAnswer: 'B' },
            { questionText: 'Siapa yang ditangkap oleh polisi?', optionA: 'Pencuri', optionB: 'Dokter', optionC: 'Guru', correctAnswer: 'A' },
            { questionText: 'Di mana koki tersebut memasak?', optionA: 'Di dapur', optionB: 'Di garasi', optionC: 'Di kamar', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 3, gradeLevel: 4, title: 'House',
        questions: [
            { questionText: 'Benda apa yang ada di ruang tamu?', optionA: 'Meja makan', optionB: 'Sofa', optionC: 'Kompor', correctAnswer: 'B' },
            { questionText: 'Di ruangan manakah ibu berada?', optionA: 'Di dapur', optionB: 'Di kamar mandi', optionC: 'Di garasi', correctAnswer: 'A' },
            { questionText: 'Apa yang dilakukan di kamar mandi?', optionA: 'Tidur', optionB: 'Mandi', optionC: 'Makan', correctAnswer: 'B' },
            { questionText: 'Di manakah letak selimut itu?', optionA: 'Di lantai', optionB: 'Di atas meja', optionC: 'Di atas kasur', correctAnswer: 'C' },
            { questionText: 'Di manakah letak mobil?', optionA: 'Di jalan', optionB: 'Di garasi', optionC: 'Di ruang tamu', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 4, gradeLevel: 4, title: 'Clothes',
        questions: [
            { questionText: 'Apa warna kaos yang dipakai?', optionA: 'Biru', optionB: 'Merah', optionC: 'Kuning', correctAnswer: 'B' },
            { questionText: 'Pakaian apa yang dia pakai?', optionA: 'Rok', optionB: 'Celana panjang', optionC: 'Jaket', correctAnswer: 'A' },
            { questionText: 'Apa warna sepatu yang disebutkan?', optionA: 'Putih', optionB: 'Cokelat', optionC: 'Hitam', correctAnswer: 'C' },
            { questionText: 'Benda apa yang diminta untuk dipakai?', optionA: 'Sepatu', optionB: 'Topi', optionC: 'Kacamata', correctAnswer: 'B' },
            { questionText: 'Pakaian apa yang dipakai saat dingin?', optionA: 'Kaos oblong', optionB: 'Celana pendek', optionC: 'Jaket', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 5, gradeLevel: 4, title: 'Hobbies',
        questions: [
            { questionText: 'Olahraga apa yang dimainkan?', optionA: 'Bola basket', optionB: 'Sepak bola', optionC: 'Renang', correctAnswer: 'B' },
            { questionText: 'Apa hobi yang disebutkan?', optionA: 'Membaca', optionB: 'Bernyanyi', optionC: 'Menari', correctAnswer: 'A' },
            { questionText: 'Olahraga apa yang dia lakukan?', optionA: 'Berlari', optionB: 'Memancing', optionC: 'Berenang', correctAnswer: 'C' },
            { questionText: 'Kendaraan apa yang dinaiki?', optionA: 'Sepeda', optionB: 'Sepeda motor', optionC: 'Mobil', correctAnswer: 'A' },
            { questionText: 'Apa yang dilakukan Siti?', optionA: 'Menari', optionB: 'Melukis', optionC: 'Bernyanyi', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 6, gradeLevel: 4, title: 'Transport',
        questions: [
            { questionText: 'Bagaimana laju kereta api tersebut?', optionA: 'Lambat', optionB: 'Berisik', optionC: 'Sangat cepat', correctAnswer: 'C' },
            { questionText: 'Di manakah pesawat itu terbang?', optionA: 'Di jalan raya', optionB: 'Di laut', optionC: 'Di langit', correctAnswer: 'C' },
            { questionText: 'Kendaraan apakah yang dibilang besar?', optionA: 'Kapal laut', optionB: 'Mobil', optionC: 'Kereta', correctAnswer: 'A' },
            { questionText: 'Kendaraan apa yang dikendarai ayah?', optionA: 'Sepeda motor', optionB: 'Mobil', optionC: 'Truk', correctAnswer: 'A' },
            { questionText: 'Kendaraan apa yang dipakai ke sekolah?', optionA: 'Taksi', optionB: 'Bus', optionC: 'Kereta', correctAnswer: 'B' },
        ],
    },
    // Grade 5
    {
        chapter: 1, gradeLevel: 5, title: 'Public Places',
        questions: [
            { questionText: 'Di manakah dokter bekerja?', optionA: 'Di sekolah', optionB: 'Di rumah sakit', optionC: 'Di pasar', correctAnswer: 'B' },
            { questionText: 'Apa yang dia pinjam dari perpustakaan?', optionA: 'Buku', optionB: 'Uang', optionC: 'Makanan', correctAnswer: 'A' },
            { questionText: 'Di mana ibu membeli buah?', optionA: 'Supermarket', optionB: 'Bank', optionC: 'Kantor pos', correctAnswer: 'A' },
            { questionText: 'Apa yang dilakukan ayah di bank?', optionA: 'Meminjam buku', optionB: 'Mengirim surat', optionC: 'Menyimpan uang', correctAnswer: 'C' },
            { questionText: 'Di manakah dia mengirim surat?', optionA: 'Kantor pos', optionB: 'Bank', optionC: 'Rumah sakit', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 2, gradeLevel: 5, title: 'Weather',
        questions: [
            { questionText: 'Bagaimana cuaca di luar?', optionA: 'Cerah', optionB: 'Hujan', optionC: 'Berangin', correctAnswer: 'B' },
            { questionText: 'Bagaimana cuaca hari ini?', optionA: 'Cerah', optionB: 'Berawan', optionC: 'Berkabut', correctAnswer: 'A' },
            { questionText: 'Bagaimana cuaca hari ini?', optionA: 'Panas', optionB: 'Hujan', optionC: 'Berangin', correctAnswer: 'C' },
            { questionText: 'Kapan salju turun?', optionA: 'Musim panas', optionB: 'Musim dingin', optionC: 'Musim gugur', correctAnswer: 'B' },
            { questionText: 'Bagaimana keadaan langit?', optionA: 'Biru cerah', optionB: 'Berawan', optionC: 'Gelap gulita', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 3, gradeLevel: 5, title: 'Food & Drink',
        questions: [
            { questionText: 'Makanan apa yang dia makan?', optionA: 'Mie goreng', optionB: 'Nasi goreng', optionC: 'Roti bakar', correctAnswer: 'B' },
            { questionText: 'Minuman apa yang dia minum?', optionA: 'Susu', optionB: 'Jus apel', optionC: 'Jus jeruk', correctAnswer: 'C' },
            { questionText: 'Bagaimana keadaan mie ayam tersebut?', optionA: 'Dingin', optionB: 'Panas', optionC: 'Manis', correctAnswer: 'B' },
            { questionText: 'Bagaimana rasa es krim itu?', optionA: 'Manis', optionB: 'Asam', optionC: 'Pahit', correctAnswer: 'A' },
            { questionText: 'Apa yang mereka makan untuk sarapan?', optionA: 'Nasi', optionB: 'Telur', optionC: 'Roti', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 4, gradeLevel: 5, title: 'Feelings',
        questions: [
            { questionText: 'Bagaimana perasaannya?', optionA: 'Sedih', optionB: 'Bahagia / Senang', optionC: 'Marah', correctAnswer: 'B' },
            { questionText: 'Bagaimana perasaannya?', optionA: 'Sedih', optionB: 'Lelah', optionC: 'Takut', correctAnswer: 'A' },
            { questionText: 'Bagaimana perasaan anak laki-laki itu?', optionA: 'Terkejut', optionB: 'Senang', optionC: 'Marah', correctAnswer: 'C' },
            { questionText: 'Bagaimana perasaan mereka?', optionA: 'Lelah', optionB: 'Lapar', optionC: 'Haus', correctAnswer: 'A' },
            { questionText: 'Apa yang dia rasakan?', optionA: 'Haus', optionB: 'Ngantuk', optionC: 'Lapar', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 5, gradeLevel: 5, title: 'Appearance',
        questions: [
            { questionText: 'Seperti apa rambutnya?', optionA: 'Pendek', optionB: 'Panjang', optionC: 'Botak', correctAnswer: 'B' },
            { questionText: 'Bagaimana postur tubuh Budi?', optionA: 'Pendek', optionB: 'Gemuk', optionC: 'Tinggi', correctAnswer: 'C' },
            { questionText: 'Seperti apa mata anak perempuan itu?', optionA: 'Kecil', optionB: 'Sipit', optionC: 'Besar', correctAnswer: 'C' },
            { questionText: 'Apa warna rambut kakek?', optionA: 'Hitam', optionB: 'Putih', optionC: 'Cokelat', correctAnswer: 'B' },
            { questionText: 'Bagaimana keadaan laki-laki tersebut?', optionA: 'Kuat', optionB: 'Lemah', optionC: 'Kurus', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 6, gradeLevel: 5, title: 'Daily Chores',
        questions: [
            { questionText: 'Apa yang sedang dia lakukan?', optionA: 'Menyapu lantai', optionB: 'Mengepel lantai', optionC: 'Mencuci baju', correctAnswer: 'A' },
            { questionText: 'Apa yang dicuci oleh kakak?', optionA: 'Baju', optionB: 'Sepatu', optionC: 'Piring kotor', correctAnswer: 'C' },
            { questionText: 'Apa yang sedang dia rapikan?', optionA: 'Meja belajar', optionB: 'Tempat tidur', optionC: 'Lemari pakaian', correctAnswer: 'B' },
            { questionText: 'Apa yang mereka siram?', optionA: 'Bunga / Tanaman', optionB: 'Jalanan', optionC: 'Mobil', correctAnswer: 'A' },
            { questionText: 'Apa yang dilakukan Doni?', optionA: 'Memandikan kucing', optionB: 'Memberi makan kucing', optionC: 'Mengajak kucing bermain', correctAnswer: 'B' },
        ],
    },
    // Grade 6
    {
        chapter: 1, gradeLevel: 6, title: 'Directions',
        questions: [
            { questionText: 'Di manakah letak bank tersebut?', optionA: 'Di belakang rumah sakit', optionB: 'Di antara rumah sakit dan kantor pos', optionC: 'Di sebelah sekolah', correctAnswer: 'B' },
            { questionText: 'Apa yang harus dilakukan saat lampu lalu lintas berwarna merah?', optionA: 'Berhenti', optionB: 'Jalan terus', optionC: 'Belok kiri', correctAnswer: 'A' },
            { questionText: 'Ke arah mana kita harus berbelok di perempatan?', optionA: 'Kiri', optionB: 'Kanan', optionC: 'Lurus', correctAnswer: 'B' },
            { questionText: 'Di manakah letak sekolah?', optionA: 'Di seberang taman', optionB: 'Di belakang taman', optionC: 'Di samping taman', correctAnswer: 'A' },
            { questionText: 'Apa yang banyak terdapat di kota?', optionA: 'Sawah', optionB: 'Pegunungan', optionC: 'Gedung-gedung tinggi', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 2, gradeLevel: 6, title: 'Health',
        questions: [
            { questionText: 'Sakit apa yang sedang dialami oleh Budi?', optionA: 'Sakit gigi', optionB: 'Sakit perut', optionC: 'Sakit kepala', correctAnswer: 'B' },
            { questionText: 'Ke manakah Siti pergi berobat?', optionA: 'Ke dokter gigi', optionB: 'Ke pasar', optionC: 'Ke rumah sakit umum', correctAnswer: 'A' },
            { questionText: 'Berapa kali obat tersebut harus diminum dalam sehari?', optionA: 'Satu kali', optionB: 'Dua kali', optionC: 'Tiga kali', correctAnswer: 'C' },
            { questionText: 'Alat kesehatan apa yang disebutkan?', optionA: 'Stetoskop', optionB: 'Termometer', optionC: 'Jarum suntik', correctAnswer: 'B' },
            { questionText: 'Apa manfaat makan buah-buahan?', optionA: 'Membuat sakit', optionB: 'Menjaga tubuh tetap sehat', optionC: 'Membuat lelah', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 3, gradeLevel: 6, title: 'Holidays',
        questions: [
            { questionText: 'Ke manakah mereka pergi berlibur?', optionA: 'Ke gunung', optionB: 'Ke kebun binatang', optionC: 'Ke pantai', correctAnswer: 'C' },
            { questionText: 'Apa yang sedang mereka bangun/dirikan?', optionA: 'Meja kayu', optionB: 'Tenda', optionC: 'Rumah pohon', correctAnswer: 'B' },
            { questionText: 'Apa yang mereka lihat saat di museum?', optionA: 'Fosil dinosaurus', optionB: 'Hewan hidup', optionC: 'Pemandangan alam', correctAnswer: 'A' },
            { questionText: 'Di manakah gajah itu berada?', optionA: 'Di hutan', optionB: 'Di kebun binatang', optionC: 'Di laut', correctAnswer: 'B' },
            { questionText: 'Bagaimana cuaca di gunung tersebut?', optionA: 'Sangat panas', optionB: 'Sangat dingin', optionC: 'Hangat', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 4, gradeLevel: 6, title: 'Animals & Habitats',
        questions: [
            { questionText: 'Bagaimana ciri-ciri fisik singa yang disebutkan?', optionA: 'Lemah', optionB: 'Kecil', optionC: 'Sangat kuat', correctAnswer: 'C' },
            { questionText: 'Di manakah unta dapat bertahan hidup?', optionA: 'Di hutan lebat', optionB: 'Di gurun pasir', optionC: 'Di lautan', correctAnswer: 'B' },
            { questionText: 'Apa keahlian utama dari penguin?', optionA: 'Berenang', optionB: 'Terbang', optionC: 'Berlari cepat', correctAnswer: 'A' },
            { questionText: 'Apa ciri khas tubuh yang dimiliki oleh kanguru?', optionA: 'Sayap besar', optionB: 'Kantung di perut', optionC: 'Tanduk panjang', correctAnswer: 'B' },
            { questionText: 'Bagaimana ukuran tubuh paus biru?', optionA: 'Sangat kecil', optionB: 'Sedang', optionC: 'Sangat besar', correctAnswer: 'C' },
        ],
    },
    {
        chapter: 5, gradeLevel: 6, title: 'Personality',
        questions: [
            { questionText: 'Sifat baik seperti apakah yang dimiliki Rina?', optionA: 'Pemalas', optionB: 'Suka menolong', optionC: 'Pemarah', correctAnswer: 'B' },
            { questionText: 'Sifat seperti apakah yang dimiliki Anton?', optionA: 'Pintar', optionB: 'Nakal', optionC: 'Bodoh', correctAnswer: 'A' },
            { questionText: 'Apa kebiasaan dari orang yang jujur?', optionA: 'Berbohong', optionB: 'Mengatakan kebenaran', optionC: 'Menyembunyikan barang', correctAnswer: 'B' },
        ],
    },
    {
        chapter: 6, gradeLevel: 6, title: 'Materials',
        questions: [
            { questionText: 'Terbuat dari bahan apakah meja tersebut?', optionA: 'Plastik', optionB: 'Besi', optionC: 'Kayu', correctAnswer: 'C' },
            { questionText: 'Terbuat dari bahan apakah cincin tersebut?', optionA: 'Emas', optionB: 'Perak', optionC: 'Perunggu', correctAnswer: 'A' },
        ],
    },
    {
        chapter: 7, gradeLevel: 6, title: 'Technology',
        questions: [
            { questionText: 'Apa salah satu kegunaan ponsel pintar?', optionA: 'Untuk memasak', optionB: 'Untuk menelepon', optionC: 'Untuk mencuci', correctAnswer: 'B' },
            { questionText: 'Perangkat apa yang digunakan untuk mengetik?', optionA: 'Komputer', optionB: 'Televisi', optionC: 'Radio', correctAnswer: 'A' },
            { questionText: 'Apa yang sedang dia kirimkan lewat internet?', optionA: 'Paket barang', optionB: 'Surat elektronik (Email)', optionC: 'Uang tunai', correctAnswer: 'B' },
            { questionText: 'Apa manfaat utama dari internet?', optionA: 'Menyembunyikan data', optionB: 'Mencari informasi', optionC: 'Membuat bingung', correctAnswer: 'B' },
            { questionText: 'Alat apa yang digunakan oleh fotografer?', optionA: 'Kamera', optionB: 'Senter', optionC: 'Termometer', correctAnswer: 'A' },
        ],
    },
];

// ─────────────────────────────────────────────────────────────
// WRITING
// ─────────────────────────────────────────────────────────────

const writingData: MaterialSeed<Writing>[] = [
    // Grade 3
    {
        chapter: 1, gradeLevel: 3, title: 'Animals',
        questions: [
            { exercise: 'I have a ___ (kucing).', correctAnswer: 'cat' },
            { exercise: 'The ___ (anjing) is barking.', correctAnswer: 'dog' },
            { exercise: 'A bird can ___ (terbang).', correctAnswer: 'fly' },
            { exercise: 'A fish can ___ (berenang).', correctAnswer: 'swim' },
        ],
    },
    {
        chapter: 2, gradeLevel: 3, title: 'Fruits',
        questions: [
            { exercise: 'I like to eat an ___ (apel).', correctAnswer: 'apple' },
            { exercise: 'A monkey likes to eat ___ (pisang).', correctAnswer: 'banana' },
        ],
    },
    {
        chapter: 3, gradeLevel: 3, title: 'Colors',
        questions: [
            { exercise: 'The banana is ___ (kuning).', correctAnswer: 'yellow' },
            { exercise: 'My school bag is ___ (merah).', correctAnswer: 'red' },
            { exercise: 'The sky is ___ (biru).', correctAnswer: 'blue' },
            { exercise: 'The grass is ___ (hijau).', correctAnswer: 'green' },
        ],
    },
    {
        chapter: 4, gradeLevel: 3, title: 'Numbers',
        questions: [
            { exercise: 'I have ___ (dua) eyes.', correctAnswer: 'two' },
            { exercise: 'This is number ___ (lima).', correctAnswer: 'five' },
        ],
    },
    {
        chapter: 5, gradeLevel: 3, title: 'Family',
        questions: [
            { exercise: 'I love my ___ (ibu).', correctAnswer: 'mother' },
            { exercise: 'He is my ___ (ayah).', correctAnswer: 'father' },
            { exercise: 'She is a beautiful ___ (anak perempuan).', correctAnswer: 'girl' },
            { exercise: 'He is a smart ___ (anak laki-laki).', correctAnswer: 'boy' },
        ],
    },
    {
        chapter: 6, gradeLevel: 3, title: 'Classroom',
        questions: [
            { exercise: 'I read a ___ (buku).', correctAnswer: 'book' },
            { exercise: 'I write with a ___ (pensil).', correctAnswer: 'pencil' },
        ],
    },
    {
        chapter: 7, gradeLevel: 3, title: 'Body Parts',
        questions: [
            { exercise: 'I have one ___ (hidung).', correctAnswer: 'nose' },
            { exercise: 'I have two ___ (telinga).', correctAnswer: 'ears' },
        ],
    },
    {
        chapter: 8, gradeLevel: 3, title: 'Adjectives',
        questions: [
            { exercise: 'The elephant is ___ (besar).', correctAnswer: 'big' },
            { exercise: 'The mouse is ___ (kecil).', correctAnswer: 'small' },
        ],
    },
    {
        chapter: 9, gradeLevel: 3, title: 'Actions',
        questions: [
            { exercise: 'I ___ (minum) a glass of milk.', correctAnswer: 'drink' },
            { exercise: 'I ___ (makan) rice everyday.', correctAnswer: 'eat' },
        ],
    },
    {
        chapter: 10, gradeLevel: 3, title: 'Greetings',
        questions: [
            { exercise: '___ (Selamat) morning!', correctAnswer: 'good' },
            { exercise: 'Thank ___ (kamu).', correctAnswer: 'you' },
        ],
    },
    {
        chapter: 11, gradeLevel: 3, title: 'Places & Nature',
        questions: [
            { exercise: 'I go to ___ (sekolah).', correctAnswer: 'school' },
            { exercise: 'The sun is ___ (panas).', correctAnswer: 'hot' },
        ],
    },
    {
        chapter: 12, gradeLevel: 3, title: 'House',
        questions: [
            { exercise: 'I sleep on the ___ (kasur).', correctAnswer: 'bed' },
            { exercise: 'Please open the ___ (pintu).', correctAnswer: 'door' },
        ],
    },
    // Grade 4
    {
        chapter: 1, gradeLevel: 4, title: 'Daily Routine',
        questions: [
            { exercise: 'I ___ (bangun) up at six o\'clock.', correctAnswer: 'wake' },
            { exercise: 'She ___ (menyikat) her teeth every day.', correctAnswer: 'brushes' },
            { exercise: 'We eat ___ (sarapan) in the morning.', correctAnswer: 'breakfast' },
            { exercise: 'I go to ___ (sekolah) by bus.', correctAnswer: 'school' },
            { exercise: 'He goes to ___ (tidur) at nine o\'clock.', correctAnswer: 'bed' },
        ],
    },
    {
        chapter: 2, gradeLevel: 4, title: 'Professions',
        questions: [
            { exercise: 'A ___ (guru) teaches students in the classroom.', correctAnswer: 'teacher' },
            { exercise: 'The ___ (dokter) works in the hospital.', correctAnswer: 'doctor' },
            { exercise: 'A ___ (petani) plants rice in the field.', correctAnswer: 'farmer' },
            { exercise: 'The ___ (polisi) catches the thief.', correctAnswer: 'police' },
            { exercise: 'A ___ (koki) cooks food in the kitchen.', correctAnswer: 'chef' },
        ],
    },
    {
        chapter: 3, gradeLevel: 4, title: 'House',
        questions: [
            { exercise: 'There is a TV in the living ___ (ruang).', correctAnswer: 'room' },
            { exercise: 'My mother cooks in the ___ (dapur).', correctAnswer: 'kitchen' },
            { exercise: 'I take a bath in the ___ (kamar mandi).', correctAnswer: 'bathroom' },
            { exercise: 'I sleep on the bed in my ___ (kamar tidur).', correctAnswer: 'bedroom' },
            { exercise: 'Father parks the car in the ___ (garasi).', correctAnswer: 'garage' },
        ],
    },
    {
        chapter: 4, gradeLevel: 4, title: 'Clothes',
        questions: [
            { exercise: 'He wears a red ___ (kaos).', correctAnswer: 't-shirt' },
            { exercise: 'She wears a beautiful blue ___ (rok).', correctAnswer: 'skirt' },
            { exercise: 'I wear black ___ (sepatu) to school.', correctAnswer: 'shoes' },
            { exercise: 'Put on your ___ (topi) because it is hot.', correctAnswer: 'hat' },
            { exercise: 'Wear a ___ (jaket) when it is cold.', correctAnswer: 'jacket' },
        ],
    },
    {
        chapter: 5, gradeLevel: 4, title: 'Hobbies',
        questions: [
            { exercise: 'They play ___ (sepak bola) in the field.', correctAnswer: 'football' },
            { exercise: 'My hobby is ___ (membaca) a story book.', correctAnswer: 'reading' },
            { exercise: 'She goes ___ (berenang) in the pool.', correctAnswer: 'swimming' },
            { exercise: 'I ___ (mengendarai) a bicycle with my friends.', correctAnswer: 'ride' },
            { exercise: 'Siti ___ (bernyanyi) a beautiful song.', correctAnswer: 'sings' },
        ],
    },
    {
        chapter: 6, gradeLevel: 4, title: 'Transport',
        questions: [
            { exercise: 'The ___ (kereta api) is very long and fast.', correctAnswer: 'train' },
            { exercise: 'A ___ (pesawat) flies in the sky.', correctAnswer: 'plane' },
            { exercise: 'The big ___ (kapal laut) sails on the sea.', correctAnswer: 'ship' },
            { exercise: 'My father rides a ___ (sepeda motor).', correctAnswer: 'motorcycle' },
            { exercise: 'Students go to school by ___ (bus).', correctAnswer: 'bus' },
        ],
    },
    // Grade 5
    {
        chapter: 1, gradeLevel: 5, title: 'Public Places',
        questions: [
            { exercise: 'The doctor works in the ___ (rumah sakit).', correctAnswer: 'hospital' },
            { exercise: 'I borrow a book from the ___ (perpustakaan).', correctAnswer: 'library' },
            { exercise: 'Mother buys fruit at the ___ (supermarket).', correctAnswer: 'supermarket' },
            { exercise: 'Father saves money in the ___ (bank).', correctAnswer: 'bank' },
            { exercise: 'He sends a letter at the post ___ (kantor).', correctAnswer: 'office' },
        ],
    },
    {
        chapter: 2, gradeLevel: 5, title: 'Weather',
        questions: [
            { exercise: 'It is ___ (hujan) outside.', correctAnswer: 'raining' },
            { exercise: 'The weather is very ___ (cerah).', correctAnswer: 'sunny' },
            { exercise: 'It is ___ (berangin) today.', correctAnswer: 'windy' },
            { exercise: 'It is cold in the ___ (musim dingin).', correctAnswer: 'winter' },
            { exercise: 'The sky is ___ (berawan).', correctAnswer: 'cloudy' },
        ],
    },
    {
        chapter: 3, gradeLevel: 5, title: 'Food & Drink',
        questions: [
            { exercise: 'I eat fried ___ (nasi).', correctAnswer: 'rice' },
            { exercise: 'She drinks orange ___ (jus).', correctAnswer: 'juice' },
            { exercise: 'The chicken ___ (mie) is hot.', correctAnswer: 'noodle' },
            { exercise: 'The ice ___ (krim) is sweet.', correctAnswer: 'cream' },
            { exercise: 'We eat ___ (roti) for breakfast.', correctAnswer: 'bread' },
        ],
    },
    {
        chapter: 4, gradeLevel: 5, title: 'Feelings',
        questions: [
            { exercise: 'He is very ___ (senang).', correctAnswer: 'happy' },
            { exercise: 'She feels ___ (sedih).', correctAnswer: 'sad' },
            { exercise: 'The boy is ___ (marah).', correctAnswer: 'angry' },
            { exercise: 'They are ___ (lelah).', correctAnswer: 'tired' },
            { exercise: 'I am ___ (lapar).', correctAnswer: 'hungry' },
        ],
    },
    {
        chapter: 5, gradeLevel: 5, title: 'Appearance',
        questions: [
            { exercise: 'She has long ___ (rambut).', correctAnswer: 'hair' },
            { exercise: 'Budi is a ___ (tinggi) boy.', correctAnswer: 'tall' },
            { exercise: 'The girl has big ___ (mata).', correctAnswer: 'eyes' },
            { exercise: 'Grandpa has ___ (putih) hair.', correctAnswer: 'white' },
            { exercise: 'The man is ___ (kuat).', correctAnswer: 'strong' },
        ],
    },
    {
        chapter: 6, gradeLevel: 5, title: 'Daily Chores',
        questions: [
            { exercise: 'I ___ (menyapu) the floor.', correctAnswer: 'sweep' },
            { exercise: 'Sister ___ (mencuci) the dishes.', correctAnswer: 'washes' },
            { exercise: 'He makes his ___ (tempat tidur).', correctAnswer: 'bed' },
            { exercise: 'We ___ (menyiram) the plants.', correctAnswer: 'water' },
            { exercise: 'Doni ___ (memberi makan) his cat.', correctAnswer: 'feeds' },
        ],
    },
    // Grade 6
    {
        chapter: 1, gradeLevel: 6, title: 'Directions',
        questions: [
            { exercise: 'The bank is ___ (di antara) the hospital and the post office.', correctAnswer: 'between' },
            { exercise: 'Turn ___ (kanan) at the crossroad.', correctAnswer: 'right' },
            { exercise: 'The school is ___ (di seberang) the park.', correctAnswer: 'opposite' },
            { exercise: 'You must ___ (berhenti) at the red light.', correctAnswer: 'stop' },
            { exercise: 'The city has many tall ___ (gedung-gedung).', correctAnswer: 'buildings' },
        ],
    },
    {
        chapter: 2, gradeLevel: 6, title: 'Health',
        questions: [
            { exercise: 'Budi has a ___ (sakit perut).', correctAnswer: 'stomachache' },
            { exercise: 'Siti goes to the ___ (dokter gigi).', correctAnswer: 'dentist' },
            { exercise: 'Take this ___ (obat) three times a day.', correctAnswer: 'medicine' },
            { exercise: 'The doctor uses a ___ (termometer).', correctAnswer: 'thermometer' },
            { exercise: 'Eating fruits keeps our body ___ (sehat).', correctAnswer: 'healthy' },
        ],
    },
    {
        chapter: 3, gradeLevel: 6, title: 'Holidays',
        questions: [
            { exercise: 'We went to the ___ (pantai) last holiday.', correctAnswer: 'beach' },
            { exercise: 'They set up a ___ (tenda) in the campsite.', correctAnswer: 'tent' },
            { exercise: 'We saw dinosaur ___ (fosil) at the museum.', correctAnswer: 'fossils' },
            { exercise: 'The elephant is in the ___ (kebun binatang).', correctAnswer: 'zoo' },
            { exercise: 'It was very cold on the ___ (gunung).', correctAnswer: 'mountain' },
        ],
    },
    {
        chapter: 4, gradeLevel: 6, title: 'Animals & Habitats',
        questions: [
            { exercise: 'The lion is very ___ (kuat).', correctAnswer: 'strong' },
            { exercise: 'Camels survive in the hot ___ (gurun).', correctAnswer: 'desert' },
            { exercise: 'Penguins are very good ___ (perenang).', correctAnswer: 'swimmers' },
            { exercise: 'A kangaroo has a ___ (kantung).', correctAnswer: 'pouch' },
            { exercise: 'The blue ___ (paus) is very big.', correctAnswer: 'whale' },
        ],
    },
    {
        chapter: 5, gradeLevel: 6, title: 'Personality',
        questions: [
            { exercise: 'Rina is a ___ (suka menolong) girl.', correctAnswer: 'helpful' },
            { exercise: 'Anton is a ___ (pintar) boy.', correctAnswer: 'smart' },
            { exercise: 'An ___ (jujur) person tells the truth.', correctAnswer: 'honest' },
        ],
    },
    {
        chapter: 6, gradeLevel: 6, title: 'Materials',
        questions: [
            { exercise: 'The table is made of ___ (kayu).', correctAnswer: 'wood' },
            { exercise: 'The ring is made of ___ (emas).', correctAnswer: 'gold' },
        ],
    },
    {
        chapter: 7, gradeLevel: 6, title: 'Technology',
        questions: [
            { exercise: 'People use ___ (ponsel pintar) to call friends.', correctAnswer: 'smartphones' },
            { exercise: 'I type using a ___ (komputer).', correctAnswer: 'computer' },
            { exercise: 'He sends an ___ (surat elektronik) to his teacher.', correctAnswer: 'email' },
            { exercise: 'The ___ (internet) helps us find information.', correctAnswer: 'internet' },
            { exercise: 'Photographers use a ___ (kamera) to take pictures.', correctAnswer: 'camera' },
        ],
    },
];

// ─────────────────────────────────────────────────────────────
// SPEAKING
// ─────────────────────────────────────────────────────────────

const speakingData: MaterialSeed<Speaking>[] = [
    // Grade 3
    {
        chapter: 1, gradeLevel: 3, title: 'Animals',
        questions: [
            { questionText: 'Read aloud: "Cat"', correctAnswer: 'cat' },
            { questionText: 'Read aloud: "Dog"', correctAnswer: 'dog' },
            { questionText: 'Read aloud: "Bird"', correctAnswer: 'bird' },
            { questionText: 'Read aloud: "Fish"', correctAnswer: 'fish' },
        ],
    },
    {
        chapter: 2, gradeLevel: 3, title: 'Fruits',
        questions: [
            { questionText: 'Say: "Apple"', correctAnswer: 'apple' },
            { questionText: 'Say: "Banana"', correctAnswer: 'banana' },
            { questionText: 'Say: "Orange"', correctAnswer: 'orange' },
        ],
    },
    {
        chapter: 3, gradeLevel: 3, title: 'Colors',
        questions: [
            { questionText: 'Say: "Red"', correctAnswer: 'red' },
            { questionText: 'Say: "Blue"', correctAnswer: 'blue' },
            { questionText: 'Say: "Yellow"', correctAnswer: 'yellow' },
        ],
    },
    {
        chapter: 4, gradeLevel: 3, title: 'Numbers',
        questions: [
            { questionText: 'Say: "One"', correctAnswer: 'one' },
            { questionText: 'Say: "Two"', correctAnswer: 'two' },
            { questionText: 'Say: "Three"', correctAnswer: 'three' },
            { questionText: 'Say: "Five"', correctAnswer: 'five' },
            { questionText: 'Say: "Ten"', correctAnswer: 'ten' },
        ],
    },
    {
        chapter: 5, gradeLevel: 3, title: 'Family',
        questions: [
            { questionText: 'Read aloud: "Father"', correctAnswer: 'father' },
            { questionText: 'Read aloud: "Mother"', correctAnswer: 'mother' },
            { questionText: 'Read aloud: "Brother"', correctAnswer: 'brother' },
            { questionText: 'Read aloud: "Sister"', correctAnswer: 'sister' },
        ],
    },
    {
        chapter: 6, gradeLevel: 3, title: 'Classroom',
        questions: [
            { questionText: 'Say: "Book"', correctAnswer: 'book' },
            { questionText: 'Say: "Pencil"', correctAnswer: 'pencil' },
            { questionText: 'Say: "Desk"', correctAnswer: 'desk' },
        ],
    },
    {
        chapter: 7, gradeLevel: 3, title: 'Body Parts',
        questions: [
            { questionText: 'Say: "Eye"', correctAnswer: 'eye' },
            { questionText: 'Say: "Nose"', correctAnswer: 'nose' },
            { questionText: 'Say: "Hand"', correctAnswer: 'hand' },
        ],
    },
    {
        chapter: 8, gradeLevel: 3, title: 'Greetings',
        questions: [
            { questionText: 'Say: "Hello"', correctAnswer: 'hello' },
            { questionText: 'Say: "Good morning"', correctAnswer: 'good morning' },
            { questionText: 'Say: "Thank you"', correctAnswer: 'thank you' },
        ],
    },
    {
        chapter: 9, gradeLevel: 3, title: 'Adjectives & Actions',
        questions: [
            { questionText: 'Say: "Big"', correctAnswer: 'big' },
            { questionText: 'Say: "Eat"', correctAnswer: 'eat' },
        ],
    },
    // Grade 4
    {
        chapter: 1, gradeLevel: 4, title: 'Daily Routine',
        questions: [
            { questionText: 'Read aloud: "I wake up at six."', correctAnswer: 'i wake up at six' },
            { questionText: 'Read aloud: "I brush my teeth."', correctAnswer: 'i brush my teeth' },
            { questionText: 'Read aloud: "We eat breakfast."', correctAnswer: 'we eat breakfast' },
            { questionText: 'Read aloud: "I go to school."', correctAnswer: 'i go to school' },
            { questionText: 'Read aloud: "I go to bed."', correctAnswer: 'i go to bed' },
        ],
    },
    {
        chapter: 2, gradeLevel: 4, title: 'Professions',
        questions: [
            { questionText: 'Say: "He is a teacher."', correctAnswer: 'he is a teacher' },
            { questionText: 'Say: "The doctor helps people."', correctAnswer: 'the doctor helps people' },
            { questionText: 'Say: "He is a farmer."', correctAnswer: 'he is a farmer' },
            { questionText: 'Say: "He is a police."', correctAnswer: 'he is a police' },
            { questionText: 'Say: "She is a chef."', correctAnswer: 'she is a chef' },
        ],
    },
    {
        chapter: 3, gradeLevel: 4, title: 'House',
        questions: [
            { questionText: 'Say: "This is the living room."', correctAnswer: 'this is the living room' },
            { questionText: 'Say: "Mother is in the kitchen."', correctAnswer: 'mother is in the kitchen' },
            { questionText: 'Say: "This is the bathroom."', correctAnswer: 'this is the bathroom' },
            { questionText: 'Say: "I sleep in the bedroom."', correctAnswer: 'i sleep in the bedroom' },
            { questionText: 'Say: "The car is in the garage."', correctAnswer: 'the car is in the garage' },
        ],
    },
    {
        chapter: 4, gradeLevel: 4, title: 'Clothes',
        questions: [
            { questionText: 'Read aloud: "He wears a t-shirt."', correctAnswer: 'he wears a t-shirt' },
            { questionText: 'Read aloud: "She wears a skirt."', correctAnswer: 'she wears a skirt' },
            { questionText: 'Read aloud: "I wear black shoes."', correctAnswer: 'i wear black shoes' },
            { questionText: 'Read aloud: "This is my hat."', correctAnswer: 'this is my hat' },
            { questionText: 'Read aloud: "I wear a jacket."', correctAnswer: 'i wear a jacket' },
        ],
    },
    {
        chapter: 5, gradeLevel: 4, title: 'Hobbies',
        questions: [
            { questionText: 'Say: "I play football."', correctAnswer: 'i play football' },
            { questionText: 'Say: "My hobby is reading."', correctAnswer: 'my hobby is reading' },
            { questionText: 'Say: "She goes swimming."', correctAnswer: 'she goes swimming' },
            { questionText: 'Say: "I ride a bicycle."', correctAnswer: 'i ride a bicycle' },
            { questionText: 'Say: "She sings a song."', correctAnswer: 'she sings a song' },
        ],
    },
    {
        chapter: 6, gradeLevel: 4, title: 'Transport',
        questions: [
            { questionText: 'Read aloud: "The train is fast."', correctAnswer: 'the train is fast' },
            { questionText: 'Read aloud: "The plane is big."', correctAnswer: 'the plane is big' },
            { questionText: 'Read aloud: "The ship is on the sea."', correctAnswer: 'the ship is on the sea' },
            { questionText: 'Read aloud: "He rides a motorcycle."', correctAnswer: 'he rides a motorcycle' },
            { questionText: 'Read aloud: "I take a bus."', correctAnswer: 'i take a bus' },
        ],
    },
    // Grade 5
    {
        chapter: 1, gradeLevel: 5, title: 'Public Places',
        questions: [
            { questionText: 'Read aloud: "The doctor is at the hospital."', correctAnswer: 'the doctor is at the hospital' },
            { questionText: 'Read aloud: "I read at the library."', correctAnswer: 'i read at the library' },
            { questionText: 'Read aloud: "We go to the supermarket."', correctAnswer: 'we go to the supermarket' },
            { questionText: 'Read aloud: "He goes to the bank."', correctAnswer: 'he goes to the bank' },
            { questionText: 'Read aloud: "This is a post office."', correctAnswer: 'this is a post office' },
        ],
    },
    {
        chapter: 2, gradeLevel: 5, title: 'Weather',
        questions: [
            { questionText: 'Say: "It is raining outside."', correctAnswer: 'it is raining outside' },
            { questionText: 'Say: "The weather is sunny."', correctAnswer: 'the weather is sunny' },
            { questionText: 'Say: "It is very windy."', correctAnswer: 'it is very windy' },
            { questionText: 'Say: "It snows in winter."', correctAnswer: 'it snows in winter' },
            { questionText: 'Say: "The sky is cloudy."', correctAnswer: 'the sky is cloudy' },
        ],
    },
    {
        chapter: 3, gradeLevel: 5, title: 'Food & Drink',
        questions: [
            { questionText: 'Say: "I like fried rice."', correctAnswer: 'i like fried rice' },
            { questionText: 'Say: "I drink orange juice."', correctAnswer: 'i drink orange juice' },
            { questionText: 'Say: "The noodles are hot."', correctAnswer: 'the noodles are hot' },
            { questionText: 'Say: "The ice cream is sweet."', correctAnswer: 'the ice cream is sweet' },
            { questionText: 'Say: "I eat bread for breakfast."', correctAnswer: 'i eat bread for breakfast' },
        ],
    },
    {
        chapter: 4, gradeLevel: 5, title: 'Feelings',
        questions: [
            { questionText: 'Say: "He is very happy."', correctAnswer: 'he is very happy' },
            { questionText: 'Say: "She feels sad today."', correctAnswer: 'she feels sad today' },
            { questionText: 'Say: "The boy is angry."', correctAnswer: 'the boy is angry' },
            { questionText: 'Say: "They are very tired."', correctAnswer: 'they are very tired' },
            { questionText: 'Say: "I am very hungry."', correctAnswer: 'i am very hungry' },
        ],
    },
    {
        chapter: 5, gradeLevel: 5, title: 'Appearance',
        questions: [
            { questionText: 'Read aloud: "She has long hair."', correctAnswer: 'she has long hair' },
            { questionText: 'Read aloud: "He is a tall boy."', correctAnswer: 'he is a tall boy' },
            { questionText: 'Read aloud: "She has big eyes."', correctAnswer: 'she has big eyes' },
            { questionText: 'Read aloud: "He has white hair."', correctAnswer: 'he has white hair' },
            { questionText: 'Read aloud: "The man is strong."', correctAnswer: 'the man is strong' },
        ],
    },
    {
        chapter: 6, gradeLevel: 5, title: 'Daily Chores',
        questions: [
            { questionText: 'Say: "I sweep the floor."', correctAnswer: 'i sweep the floor' },
            { questionText: 'Say: "She washes the dishes."', correctAnswer: 'she washes the dishes' },
            { questionText: 'Say: "I make my bed."', correctAnswer: 'i make my bed' },
            { questionText: 'Say: "We water the plants."', correctAnswer: 'we water the plants' },
            { questionText: 'Say: "He feeds the cat."', correctAnswer: 'he feeds the cat' },
        ],
    },
    // Grade 6
    {
        chapter: 1, gradeLevel: 6, title: 'Directions',
        questions: [
            { questionText: 'Read aloud: "The bank is near the hospital."', correctAnswer: 'the bank is near the hospital' },
            { questionText: 'Say: "Turn right at the crossroad."', correctAnswer: 'turn right at the crossroad' },
            { questionText: 'Read aloud: "The school is opposite the park."', correctAnswer: 'the school is opposite the park' },
            { questionText: 'Say: "Stop at the red light."', correctAnswer: 'stop at the red light' },
            { questionText: 'Read aloud: "The city has tall buildings."', correctAnswer: 'the city has tall buildings' },
        ],
    },
    {
        chapter: 2, gradeLevel: 6, title: 'Health',
        questions: [
            { questionText: 'Say: "I have a stomachache."', correctAnswer: 'i have a stomachache' },
            { questionText: 'Read aloud: "She goes to the dentist."', correctAnswer: 'she goes to the dentist' },
            { questionText: 'Say: "Take your medicine."', correctAnswer: 'take your medicine' },
            { questionText: 'Read aloud: "The doctor checks my temperature."', correctAnswer: 'the doctor checks my temperature' },
            { questionText: 'Say: "Eat healthy food every day."', correctAnswer: 'eat healthy food every day' },
        ],
    },
    {
        chapter: 3, gradeLevel: 6, title: 'Holidays',
        questions: [
            { questionText: 'Read aloud: "We went to the beach."', correctAnswer: 'we went to the beach' },
            { questionText: 'Say: "They set up a tent."', correctAnswer: 'they set up a tent' },
            { questionText: 'Read aloud: "We visited the museum."', correctAnswer: 'we visited the museum' },
            { questionText: 'Say: "I saw an elephant at the zoo."', correctAnswer: 'i saw an elephant at the zoo' },
            { questionText: 'Read aloud: "The mountain is very cold."', correctAnswer: 'the mountain is very cold' },
        ],
    },
    {
        chapter: 4, gradeLevel: 6, title: 'Animals & Habitats',
        questions: [
            { questionText: 'Say: "The lion is very strong."', correctAnswer: 'the lion is very strong' },
            { questionText: 'Read aloud: "Camels live in the desert."', correctAnswer: 'camels live in the desert' },
            { questionText: 'Say: "Penguins can swim fast."', correctAnswer: 'penguins can swim fast' },
            { questionText: 'Read aloud: "Kangaroos have a pouch."', correctAnswer: 'kangaroos have a pouch' },
            { questionText: 'Say: "The blue whale is very big."', correctAnswer: 'the blue whale is very big' },
        ],
    },
    {
        chapter: 5, gradeLevel: 6, title: 'Personality',
        questions: [
            { questionText: 'Read aloud: "She is a helpful girl."', correctAnswer: 'she is a helpful girl' },
            { questionText: 'Say: "He is a smart boy."', correctAnswer: 'he is a smart boy' },
            { questionText: 'Read aloud: "Always tell the truth."', correctAnswer: 'always tell the truth' },
        ],
    },
    {
        chapter: 6, gradeLevel: 6, title: 'Materials',
        questions: [
            { questionText: 'Say: "The table is made of wood."', correctAnswer: 'the table is made of wood' },
            { questionText: 'Read aloud: "The ring is made of gold."', correctAnswer: 'the ring is made of gold' },
        ],
    },
    {
        chapter: 7, gradeLevel: 6, title: 'Technology',
        questions: [
            { questionText: 'Say: "I use a smartphone."', correctAnswer: 'i use a smartphone' },
            { questionText: 'Read aloud: "I type on a computer."', correctAnswer: 'i type on a computer' },
            { questionText: 'Say: "He sends an email."', correctAnswer: 'he sends an email' },
            { questionText: 'Read aloud: "The internet is very useful."', correctAnswer: 'the internet is very useful' },
            { questionText: 'Say: "I take a picture with a camera."', correctAnswer: 'i take a picture with a camera' },
        ],
    },
];

// ─────────────────────────────────────────────────────────────
// VOCABULARY
// ─────────────────────────────────────────────────────────────

type VocabEntry = { gradeLevel: number; indonesian: string; english: string };

const vocabularyData: VocabEntry[] = [
    // Grade 3
    { gradeLevel: 3, indonesian: 'Kucing', english: 'cat' },
    { gradeLevel: 3, indonesian: 'Anjing', english: 'dog' },
    { gradeLevel: 3, indonesian: 'Burung', english: 'bird' },
    { gradeLevel: 3, indonesian: 'Ikan', english: 'fish' },
    { gradeLevel: 3, indonesian: 'Monyet', english: 'monkey' },
    { gradeLevel: 3, indonesian: 'Gajah', english: 'elephant' },
    { gradeLevel: 3, indonesian: 'Kelinci', english: 'rabbit' },
    { gradeLevel: 3, indonesian: 'Bebek', english: 'duck' },
    { gradeLevel: 3, indonesian: 'Tikus', english: 'mouse' },
    { gradeLevel: 3, indonesian: 'Apel', english: 'apple' },
    { gradeLevel: 3, indonesian: 'Pisang', english: 'banana' },
    { gradeLevel: 3, indonesian: 'Jeruk', english: 'orange' },
    { gradeLevel: 3, indonesian: 'Semangka', english: 'watermelon' },
    { gradeLevel: 3, indonesian: 'Anggur', english: 'grape' },
    { gradeLevel: 3, indonesian: 'Stroberi', english: 'strawberry' },
    { gradeLevel: 3, indonesian: 'Satu', english: 'one' },
    { gradeLevel: 3, indonesian: 'Dua', english: 'two' },
    { gradeLevel: 3, indonesian: 'Tiga', english: 'three' },
    { gradeLevel: 3, indonesian: 'Empat', english: 'four' },
    { gradeLevel: 3, indonesian: 'Lima', english: 'five' },
    { gradeLevel: 3, indonesian: 'Enam', english: 'six' },
    { gradeLevel: 3, indonesian: 'Tujuh', english: 'seven' },
    { gradeLevel: 3, indonesian: 'Delapan', english: 'eight' },
    { gradeLevel: 3, indonesian: 'Sembilan', english: 'nine' },
    { gradeLevel: 3, indonesian: 'Sepuluh', english: 'ten' },
    { gradeLevel: 3, indonesian: 'Merah', english: 'red' },
    { gradeLevel: 3, indonesian: 'Biru', english: 'blue' },
    { gradeLevel: 3, indonesian: 'Kuning', english: 'yellow' },
    { gradeLevel: 3, indonesian: 'Hijau', english: 'green' },
    { gradeLevel: 3, indonesian: 'Hitam', english: 'black' },
    { gradeLevel: 3, indonesian: 'Putih', english: 'white' },
    { gradeLevel: 3, indonesian: 'Cokelat', english: 'brown' },
    { gradeLevel: 3, indonesian: 'Ungu', english: 'purple' },
    { gradeLevel: 3, indonesian: 'Buku', english: 'book' },
    { gradeLevel: 3, indonesian: 'Pensil', english: 'pencil' },
    { gradeLevel: 3, indonesian: 'Papan tulis', english: 'whiteboard' },
    { gradeLevel: 3, indonesian: 'Tas', english: 'bag' },
    { gradeLevel: 3, indonesian: 'Kursi', english: 'chair' },
    { gradeLevel: 3, indonesian: 'Meja', english: 'desk' },
    { gradeLevel: 3, indonesian: 'Ayah', english: 'father' },
    { gradeLevel: 3, indonesian: 'Ibu', english: 'mother' },
    { gradeLevel: 3, indonesian: 'Saudara laki-laki', english: 'brother' },
    { gradeLevel: 3, indonesian: 'Saudara perempuan', english: 'sister' },
    { gradeLevel: 3, indonesian: 'Kakek', english: 'grandfather' },
    { gradeLevel: 3, indonesian: 'Bayi', english: 'baby' },
    { gradeLevel: 3, indonesian: 'Anak laki-laki', english: 'boy' },
    { gradeLevel: 3, indonesian: 'Anak perempuan', english: 'girl' },
    { gradeLevel: 3, indonesian: 'Mata', english: 'eye' },
    { gradeLevel: 3, indonesian: 'Hidung', english: 'nose' },
    { gradeLevel: 3, indonesian: 'Telinga', english: 'ear' },
    { gradeLevel: 3, indonesian: 'Mulut', english: 'mouth' },
    { gradeLevel: 3, indonesian: 'Tangan', english: 'hand' },
    { gradeLevel: 3, indonesian: 'Halo', english: 'hello' },
    { gradeLevel: 3, indonesian: 'Selamat pagi', english: 'good morning' },
    { gradeLevel: 3, indonesian: 'Selamat malam', english: 'good night' },
    { gradeLevel: 3, indonesian: 'Terima kasih', english: 'thank you' },
    { gradeLevel: 3, indonesian: 'Maaf', english: 'sorry' },
    { gradeLevel: 3, indonesian: 'Besar', english: 'big' },
    { gradeLevel: 3, indonesian: 'Kecil', english: 'small' },
    { gradeLevel: 3, indonesian: 'Manis', english: 'sweet' },
    { gradeLevel: 3, indonesian: 'Panas', english: 'hot' },
    { gradeLevel: 3, indonesian: 'Minum', english: 'drink' },
    { gradeLevel: 3, indonesian: 'Makan', english: 'eat' },
    { gradeLevel: 3, indonesian: 'Tidur', english: 'sleep' },
    { gradeLevel: 3, indonesian: 'Terbang', english: 'fly' },
    { gradeLevel: 3, indonesian: 'Berenang', english: 'swim' },
    { gradeLevel: 3, indonesian: 'Membaca', english: 'read' },
    { gradeLevel: 3, indonesian: 'Menulis', english: 'write' },
    { gradeLevel: 3, indonesian: 'Membuka', english: 'open' },
    { gradeLevel: 3, indonesian: 'Langit', english: 'sky' },
    { gradeLevel: 3, indonesian: 'Rumput', english: 'grass' },
    { gradeLevel: 3, indonesian: 'Matahari', english: 'sun' },
    { gradeLevel: 3, indonesian: 'Kasur', english: 'bed' },
    { gradeLevel: 3, indonesian: 'Pintu', english: 'door' },
    { gradeLevel: 3, indonesian: 'Sekolah', english: 'school' },
    // Grade 4
    { gradeLevel: 4, indonesian: 'Bangun', english: 'wake up' },
    { gradeLevel: 4, indonesian: 'Menyikat', english: 'brush' },
    { gradeLevel: 4, indonesian: 'Gigi', english: 'teeth' },
    { gradeLevel: 4, indonesian: 'Makan', english: 'eat' },
    { gradeLevel: 4, indonesian: 'Sarapan', english: 'breakfast' },
    { gradeLevel: 4, indonesian: 'Pagi', english: 'morning' },
    { gradeLevel: 4, indonesian: 'Sekolah', english: 'school' },
    { gradeLevel: 4, indonesian: 'Tempat tidur', english: 'bed' },
    { gradeLevel: 4, indonesian: 'Tidur', english: 'sleep' },
    { gradeLevel: 4, indonesian: 'Mandi', english: 'take a bath' },
    { gradeLevel: 4, indonesian: 'Guru', english: 'teacher' },
    { gradeLevel: 4, indonesian: 'Dokter', english: 'doctor' },
    { gradeLevel: 4, indonesian: 'Petani', english: 'farmer' },
    { gradeLevel: 4, indonesian: 'Polisi', english: 'police' },
    { gradeLevel: 4, indonesian: 'Koki', english: 'chef' },
    { gradeLevel: 4, indonesian: 'Orang sakit', english: 'sick people' },
    { gradeLevel: 4, indonesian: 'Rumah sakit', english: 'hospital' },
    { gradeLevel: 4, indonesian: 'Menanam', english: 'plant' },
    { gradeLevel: 4, indonesian: 'Padi / Nasi', english: 'rice' },
    { gradeLevel: 4, indonesian: 'Menangkap', english: 'catch' },
    { gradeLevel: 4, indonesian: 'Pencuri', english: 'thief' },
    { gradeLevel: 4, indonesian: 'Memasak', english: 'cook' },
    { gradeLevel: 4, indonesian: 'Makanan', english: 'food' },
    { gradeLevel: 4, indonesian: 'Ruang tamu', english: 'living room' },
    { gradeLevel: 4, indonesian: 'Dapur', english: 'kitchen' },
    { gradeLevel: 4, indonesian: 'Kamar mandi', english: 'bathroom' },
    { gradeLevel: 4, indonesian: 'Kamar tidur', english: 'bedroom' },
    { gradeLevel: 4, indonesian: 'Garasi', english: 'garage' },
    { gradeLevel: 4, indonesian: 'Sofa', english: 'sofa' },
    { gradeLevel: 4, indonesian: 'Selimut', english: 'blanket' },
    { gradeLevel: 4, indonesian: 'Mobil', english: 'car' },
    { gradeLevel: 4, indonesian: 'Memarkir', english: 'park' },
    { gradeLevel: 4, indonesian: 'Kaos', english: 't-shirt' },
    { gradeLevel: 4, indonesian: 'Rok', english: 'skirt' },
    { gradeLevel: 4, indonesian: 'Sepatu', english: 'shoes' },
    { gradeLevel: 4, indonesian: 'Topi', english: 'hat' },
    { gradeLevel: 4, indonesian: 'Jaket', english: 'jacket' },
    { gradeLevel: 4, indonesian: 'Memakai', english: 'wear' },
    { gradeLevel: 4, indonesian: 'Dingin', english: 'cold' },
    { gradeLevel: 4, indonesian: 'Panas', english: 'hot' },
    { gradeLevel: 4, indonesian: 'Bermain', english: 'play' },
    { gradeLevel: 4, indonesian: 'Sepak bola', english: 'football' },
    { gradeLevel: 4, indonesian: 'Lapangan', english: 'field' },
    { gradeLevel: 4, indonesian: 'Membaca', english: 'read' },
    { gradeLevel: 4, indonesian: 'Cerita', english: 'story' },
    { gradeLevel: 4, indonesian: 'Berenang', english: 'swim' },
    { gradeLevel: 4, indonesian: 'Kolam', english: 'pool' },
    { gradeLevel: 4, indonesian: 'Mengendarai', english: 'ride' },
    { gradeLevel: 4, indonesian: 'Sepeda', english: 'bicycle' },
    { gradeLevel: 4, indonesian: 'Teman', english: 'friend' },
    { gradeLevel: 4, indonesian: 'Bernyanyi', english: 'sing' },
    { gradeLevel: 4, indonesian: 'Lagu', english: 'song' },
    { gradeLevel: 4, indonesian: 'Cantik / Indah', english: 'beautiful' },
    { gradeLevel: 4, indonesian: 'Kereta api', english: 'train' },
    { gradeLevel: 4, indonesian: 'Pesawat', english: 'plane' },
    { gradeLevel: 4, indonesian: 'Kapal laut', english: 'ship' },
    { gradeLevel: 4, indonesian: 'Sepeda motor', english: 'motorcycle' },
    { gradeLevel: 4, indonesian: 'Bus', english: 'bus' },
    { gradeLevel: 4, indonesian: 'Cepat', english: 'fast' },
    { gradeLevel: 4, indonesian: 'Panjang', english: 'long' },
    { gradeLevel: 4, indonesian: 'Besar', english: 'big' },
    { gradeLevel: 4, indonesian: 'Langit', english: 'sky' },
    { gradeLevel: 4, indonesian: 'Laut', english: 'sea' },
    { gradeLevel: 4, indonesian: 'Jalan', english: 'street' },
    { gradeLevel: 4, indonesian: 'Terbang', english: 'fly' },
    { gradeLevel: 4, indonesian: 'Berlayar', english: 'sail' },
    // Grade 5
    { gradeLevel: 5, indonesian: 'Rumah sakit', english: 'hospital' },
    { gradeLevel: 5, indonesian: 'Dokter', english: 'doctor' },
    { gradeLevel: 5, indonesian: 'Perawat', english: 'nurse' },
    { gradeLevel: 5, indonesian: 'Orang sakit', english: 'sick people' },
    { gradeLevel: 5, indonesian: 'Perpustakaan', english: 'library' },
    { gradeLevel: 5, indonesian: 'Meminjam', english: 'borrow' },
    { gradeLevel: 5, indonesian: 'Buku', english: 'book' },
    { gradeLevel: 5, indonesian: 'Supermarket', english: 'supermarket' },
    { gradeLevel: 5, indonesian: 'Membeli', english: 'buy' },
    { gradeLevel: 5, indonesian: 'Sayuran', english: 'vegetable' },
    { gradeLevel: 5, indonesian: 'Buah', english: 'fruit' },
    { gradeLevel: 5, indonesian: 'Bank', english: 'bank' },
    { gradeLevel: 5, indonesian: 'Menyimpan', english: 'save' },
    { gradeLevel: 5, indonesian: 'Uang', english: 'money' },
    { gradeLevel: 5, indonesian: 'Kantor pos', english: 'post office' },
    { gradeLevel: 5, indonesian: 'Mengirim', english: 'send' },
    { gradeLevel: 5, indonesian: 'Surat', english: 'letter' },
    { gradeLevel: 5, indonesian: 'Cuaca', english: 'weather' },
    { gradeLevel: 5, indonesian: 'Hujan', english: 'rain' },
    { gradeLevel: 5, indonesian: 'Payung', english: 'umbrella' },
    { gradeLevel: 5, indonesian: 'Cerah', english: 'sunny' },
    { gradeLevel: 5, indonesian: 'Berangin', english: 'windy' },
    { gradeLevel: 5, indonesian: 'Layang-layang', english: 'kite' },
    { gradeLevel: 5, indonesian: 'Musim dingin', english: 'winter' },
    { gradeLevel: 5, indonesian: 'Manusia salju', english: 'snowman' },
    { gradeLevel: 5, indonesian: 'Berawan', english: 'cloudy' },
    { gradeLevel: 5, indonesian: 'Langit', english: 'sky' },
    { gradeLevel: 5, indonesian: 'Nasi goreng', english: 'fried rice' },
    { gradeLevel: 5, indonesian: 'Jus jeruk', english: 'orange juice' },
    { gradeLevel: 5, indonesian: 'Mie', english: 'noodle' },
    { gradeLevel: 5, indonesian: 'Es krim', english: 'ice cream' },
    { gradeLevel: 5, indonesian: 'Roti', english: 'bread' },
    { gradeLevel: 5, indonesian: 'Sarapan', english: 'breakfast' },
    { gradeLevel: 5, indonesian: 'Manis', english: 'sweet' },
    { gradeLevel: 5, indonesian: 'Panas', english: 'hot' },
    { gradeLevel: 5, indonesian: 'Dingin', english: 'cold' },
    { gradeLevel: 5, indonesian: 'Senang / Bahagia', english: 'happy' },
    { gradeLevel: 5, indonesian: 'Sedih', english: 'sad' },
    { gradeLevel: 5, indonesian: 'Marah', english: 'angry' },
    { gradeLevel: 5, indonesian: 'Lelah', english: 'tired' },
    { gradeLevel: 5, indonesian: 'Lapar', english: 'hungry' },
    { gradeLevel: 5, indonesian: 'Rambut', english: 'hair' },
    { gradeLevel: 5, indonesian: 'Panjang', english: 'long' },
    { gradeLevel: 5, indonesian: 'Tinggi', english: 'tall' },
    { gradeLevel: 5, indonesian: 'Mata', english: 'eyes' },
    { gradeLevel: 5, indonesian: 'Besar', english: 'big' },
    { gradeLevel: 5, indonesian: 'Putih', english: 'white' },
    { gradeLevel: 5, indonesian: 'Kuat', english: 'strong' },
    { gradeLevel: 5, indonesian: 'Tubuh', english: 'body' },
    { gradeLevel: 5, indonesian: 'Menyapu', english: 'sweep' },
    { gradeLevel: 5, indonesian: 'Lantai', english: 'floor' },
    { gradeLevel: 5, indonesian: 'Mencuci', english: 'wash' },
    { gradeLevel: 5, indonesian: 'Piring kotor', english: 'dishes' },
    { gradeLevel: 5, indonesian: 'Tempat tidur', english: 'bed' },
    { gradeLevel: 5, indonesian: 'Menyiram', english: 'water' },
    { gradeLevel: 5, indonesian: 'Tanaman', english: 'plant' },
    { gradeLevel: 5, indonesian: 'Memberi makan', english: 'feed' },
    { gradeLevel: 5, indonesian: 'Kucing', english: 'cat' },
    { gradeLevel: 5, indonesian: 'Setiap hari', english: 'every day' },
    // Grade 6
    { gradeLevel: 6, indonesian: 'Bank', english: 'bank' },
    { gradeLevel: 6, indonesian: 'Di antara', english: 'between' },
    { gradeLevel: 6, indonesian: 'Rumah sakit', english: 'hospital' },
    { gradeLevel: 6, indonesian: 'Kantor pos', english: 'post office' },
    { gradeLevel: 6, indonesian: 'Lampu lalu lintas', english: 'traffic light' },
    { gradeLevel: 6, indonesian: 'Berhenti', english: 'stop' },
    { gradeLevel: 6, indonesian: 'Perempatan', english: 'crossroad' },
    { gradeLevel: 6, indonesian: 'Belok kanan', english: 'turn right' },
    { gradeLevel: 6, indonesian: 'Di seberang', english: 'opposite' },
    { gradeLevel: 6, indonesian: 'Kota', english: 'city' },
    { gradeLevel: 6, indonesian: 'Gedung / Bangunan', english: 'building' },
    { gradeLevel: 6, indonesian: 'Sakit perut', english: 'stomachache' },
    { gradeLevel: 6, indonesian: 'Dokter gigi', english: 'dentist' },
    { gradeLevel: 6, indonesian: 'Obat', english: 'medicine' },
    { gradeLevel: 6, indonesian: 'Termometer', english: 'thermometer' },
    { gradeLevel: 6, indonesian: 'Sehat', english: 'healthy' },
    { gradeLevel: 6, indonesian: 'Liburan', english: 'holiday' },
    { gradeLevel: 6, indonesian: 'Pantai', english: 'beach' },
    { gradeLevel: 6, indonesian: 'Tenda', english: 'tent' },
    { gradeLevel: 6, indonesian: 'Berkemah', english: 'camping' },
    { gradeLevel: 6, indonesian: 'Museum', english: 'museum' },
    { gradeLevel: 6, indonesian: 'Fosil', english: 'fossil' },
    { gradeLevel: 6, indonesian: 'Kebun binatang', english: 'zoo' },
    { gradeLevel: 6, indonesian: 'Gunung', english: 'mountain' },
    { gradeLevel: 6, indonesian: 'Singa', english: 'lion' },
    { gradeLevel: 6, indonesian: 'Hutan (rimba)', english: 'jungle' },
    { gradeLevel: 6, indonesian: 'Unta', english: 'camel' },
    { gradeLevel: 6, indonesian: 'Gurun pasir', english: 'desert' },
    { gradeLevel: 6, indonesian: 'Bertahan hidup', english: 'survive' },
    { gradeLevel: 6, indonesian: 'Penguin', english: 'penguin' },
    { gradeLevel: 6, indonesian: 'Perenang', english: 'swimmer' },
    { gradeLevel: 6, indonesian: 'Kanguru', english: 'kangaroo' },
    { gradeLevel: 6, indonesian: 'Kantung', english: 'pouch' },
    { gradeLevel: 6, indonesian: 'Paus', english: 'whale' },
    { gradeLevel: 6, indonesian: 'Mamalia', english: 'mammal' },
    { gradeLevel: 6, indonesian: 'Lautan', english: 'ocean' },
    { gradeLevel: 6, indonesian: 'Suka menolong', english: 'helpful' },
    { gradeLevel: 6, indonesian: 'Pintar', english: 'smart' },
    { gradeLevel: 6, indonesian: 'Jujur', english: 'honest' },
    { gradeLevel: 6, indonesian: 'Kebenaran', english: 'truth' },
    { gradeLevel: 6, indonesian: 'Kayu', english: 'wood' },
    { gradeLevel: 6, indonesian: 'Emas', english: 'gold' },
    { gradeLevel: 6, indonesian: 'Cincin', english: 'ring' },
    { gradeLevel: 6, indonesian: 'Ponsel pintar', english: 'smartphone' },
    { gradeLevel: 6, indonesian: 'Menelepon', english: 'call' },
    { gradeLevel: 6, indonesian: 'Komputer', english: 'computer' },
    { gradeLevel: 6, indonesian: 'Mengetik', english: 'type' },
    { gradeLevel: 6, indonesian: 'Surat elektronik', english: 'email' },
    { gradeLevel: 6, indonesian: 'Internet', english: 'internet' },
    { gradeLevel: 6, indonesian: 'Kamera', english: 'camera' },
    { gradeLevel: 6, indonesian: 'Fotografer', english: 'photographer' },
    { gradeLevel: 6, indonesian: 'Gambar / Foto', english: 'picture' },
];

// ─────────────────────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────────────────────

async function seedMCQMaterials(
    data: MaterialSeed<MCQ>[],
    skill: SkillCategory,
) {
    for (const mat of data) {
        const material = await prisma.material.create({
            data: {
                chapter: mat.chapter,
                content: mat.title,
                skillCategory: skill,
                gradeLevel: mat.gradeLevel,
            },
        });

        await prisma.quizQuestion.createMany({
            data: mat.questions.map((q) => ({
                material_id: material.id,
                questionType: QuestionType.MULTIPLE_CHOICE,
                questionText: q.questionText,
                correctAnswer: q.correctAnswer,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
            })),
        });
    }
}

async function seedWritingMaterials(data: MaterialSeed<Writing>[]) {
    for (const mat of data) {
        const material = await prisma.material.create({
            data: {
                chapter: mat.chapter,
                content: mat.title,
                skillCategory: SkillCategory.WRITING,
                gradeLevel: mat.gradeLevel,
            },
        });

        await prisma.quizQuestion.createMany({
            data: mat.questions.map((q) => ({
                material_id: material.id,
                questionType: QuestionType.WRITING,
                questionText: q.exercise,
                correctAnswer: q.correctAnswer,
                missingWordIndex: getMissingWordIndex(q.exercise),
            })),
        });
    }
}

async function seedSpeakingMaterials(data: MaterialSeed<Speaking>[]) {
    for (const mat of data) {
        const material = await prisma.material.create({
            data: {
                chapter: mat.chapter,
                content: mat.title,
                skillCategory: SkillCategory.SPEAKING,
                gradeLevel: mat.gradeLevel,
            },
        });

        await prisma.quizQuestion.createMany({
            data: mat.questions.map((q) => ({
                material_id: material.id,
                questionType: QuestionType.SPEAKING,
                questionText: q.questionText,
                correctAnswer: q.correctAnswer,
            })),
        });
    }
}

async function main() {
    console.log('🌱 Starting seed...');

    // ── Reading ──────────────────────────────────────────────────
    console.log('  → Seeding Reading materials...');
    await seedMCQMaterials(readingData, SkillCategory.READING);

    // ── Listening ────────────────────────────────────────────────
    console.log('  → Seeding Listening materials...');
    await seedMCQMaterials(listeningData, SkillCategory.LISTENING);

    // ── Writing ──────────────────────────────────────────────────
    console.log('  → Seeding Writing materials...');
    await seedWritingMaterials(writingData);

    // ── Speaking ─────────────────────────────────────────────────
    console.log('  → Seeding Speaking materials...');
    await seedSpeakingMaterials(speakingData);

    // ── Vocabulary ───────────────────────────────────────────────
    console.log('  → Seeding Vocabulary...');
    await prisma.vocabulary.createMany({
        data: vocabularyData.map((v) => ({
            english: v.english,
            indonesian: v.indonesian,
            gradeLevel: v.gradeLevel,
        })),
    });

    console.log('✅ Seed complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });