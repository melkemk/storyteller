'use client';
import { useState } from "react";
import axios from "axios";

const StoryBuilder = () => {
  const themes = ["Friendship", "Adventure", "Mystery", "Love"];
  const genres = ["Fantasy", "Sci-fi", "Horror", "Comedy"];
  const charactersList = [
    "Alex, a curious boy; Lila, a lonely dragon",
    "Sam, a brave astronaut; Zara, an AI companion",
    "Mia, a witty detective; Jack, a loyal dog",
  ];
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const speak = (text: string) => {
    if (synth) {
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.lang = "en-US"; //
      utterance.rate = 1; // 
          utterance.pitch = 1; // 
      synth.speak(utterance); // 
    }
  };

  const [theme, setTheme] = useState(themes[0]);
  const [genre, setGenre] = useState(genres[0]);
  const [characters, setCharacters] = useState(charactersList[0]);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleGenerateStory = async () => {
    if (!theme || !genre || !characters) {
      alert("Please select all fields.");
      return;
    }

    setLoading(true);
    setStory("");

    try {
      const response = await axios.post("/api/generate-story", {
        theme,
        genre,
        characters,
      });

      const generatedStory = response.data.story;
      setStory(generatedStory);
    } catch (error) {
      console.error("Error generating story:", error);
      alert("Failed to generate the story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startSpeaking = () => {
    if (story) {
      setIsSpeaking(true);
      speak(story);
    }
  };

  const stopSpeaking = () => {
    if (synth) {
      setIsSpeaking(false);
      synth.cancel();
    }
  };

  const restartSpeaking = () => {
    stopSpeaking();
    startSpeaking();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">AI-Powered Story Builder</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="theme">
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="genre">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="characters">
            Characters
          </label>
          <select
            id="characters"
            value={characters}
            onChange={(e) => setCharacters(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {charactersList.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerateStory}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition disabled:bg-gray-300"
        >
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </div>

      {story && (
        <div className="bg-white mt-6 p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h2 className="text-xl font-bold mb-4">Your Story</h2>
          <p className="whitespace-pre-wrap">{story}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={startSpeaking}
              disabled={isSpeaking}
              className="bg-green-500 text-white p-2 rounded font-semibold hover:bg-green-600 transition disabled:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={stopSpeaking}
              disabled={!isSpeaking}
              className="bg-red-500 text-white p-2 rounded font-semibold hover:bg-red-600 transition disabled:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
              </svg>
            </button>
            <button
              onClick={restartSpeaking}
              className="bg-yellow-500 text-white p-2 rounded font-semibold hover:bg-yellow-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryBuilder;
