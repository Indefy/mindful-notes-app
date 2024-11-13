// src/components/MindfulNotes.jsx
import React, { useState } from 'react';
import Card from './ui/Card';
import CardContent from './ui/CardContent';

const MindfulNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentMood, setCurrentMood] = useState('neutral');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentNote.trim()) return;

    const newNote = {
      id: Date.now(),
      content: currentNote,
      mood: currentMood,
      timestamp: new Date().toISOString()
    };

    setNotes([newNote, ...notes]);
    setCurrentNote('');
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-2">Mindful Notes</h1>
          <p className="text-gray-600">Capture your thoughts and feelings mindfully</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 border rounded-lg mb-4 min-h-[100px]"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="What's on your mind?"
            />
            <div className="flex justify-between items-center">
              <select
                className="p-2 border rounded-lg"
                value={currentMood}
                onChange={(e) => setCurrentMood(e.target.value)}
              >
                <option value="happy">😊 Happy</option>
                <option value="neutral">😐 Neutral</option>
                <option value="sad">😔 Sad</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Note
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="bg-white">
            <CardContent>
              <div className="flex justify-between items-start">
                <p className="whitespace-pre-wrap">{note.content}</p>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500 flex justify-between items-center">
                <span>{new Date(note.timestamp).toLocaleString()}</span>
                <span>{note.mood === 'happy' ? '😊' : note.mood === 'sad' ? '😔' : '😐'}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MindfulNotes;