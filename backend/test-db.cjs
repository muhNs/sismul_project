const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:123@localhost:5432/sismulbos?schema=public' });
client.connect().then(async () => {
  try {
    // Reset mediaUrl
    await client.query(`UPDATE "QuizQuestion" SET "mediaUrl" = NULL WHERE "questionType" = 'MULTIPLE_CHOICE' AND "questionText" LIKE '%Hewan apakah%'`);
    
    // Set TTS Words
    await client.query(`UPDATE "QuizQuestion" SET "questionText" = '[TTS: Cat] Hewan apakah yang diucapkan?' WHERE id = 121`);
    await client.query(`UPDATE "QuizQuestion" SET "questionText" = '[TTS: Dog] Hewan apakah yang diucapkan?' WHERE id = 122`);
    await client.query(`UPDATE "QuizQuestion" SET "questionText" = '[TTS: Bird] Hewan apakah yang diucapkan?' WHERE id = 123`);
    await client.query(`UPDATE "QuizQuestion" SET "questionText" = '[TTS: Fish] Hewan apakah yang diucapkan?' WHERE id = 124`);
    await client.query(`UPDATE "QuizQuestion" SET "questionText" = '[TTS: Monkey] Hewan apakah yang diucapkan?' WHERE id = 125`);
    await client.query(`UPDATE "QuizQuestion" SET "questionText" = '[TTS: Elephant] Hewan apakah yang diucapkan?' WHERE id = 126`);

    console.log("Database TTS updated!");
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
});
