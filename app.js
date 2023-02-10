import React, { useState } from "react";
import { useEffect } from "react";

const groups = [
  {
    name: "Standard",//fix frequencies
    notes: [
      { name: "E2", displayName: "E2", freq: 82.41 },
      { name: "A", displayName: "A", freq: 110 },
      { name: "D", displayName: "D", freq: 146.8 },
      { name: "G", displayName: "G", freq: 196 },
      { name: "B", displayName: "B", freq: 246.9 },
      { name: "E4", displayName: "E4", freq: 329.6 },
    ],
  },
  {
    name: "Fret 1",
    notes: [
      { name: "F2", displayName: "F2", freq: 110.0 },
      { name: "A#", displayName: "A#", freq: 146.83 },
      { name: "D#", displayName: "D#", freq: 196.0 },
      { name: "G#", displayName: "G#", freq: 246.94 },
      { name: "C", displayName: "C", freq: 329.63 },
      { name: "F", displayName: "F", freq: 440.0 },
    ],
  },
  {
    name: "Fret 2",
    notes: [
      { name: "Gb", displayName: "Gb", freq: 123.47 },
      { name: "B", displayName: "B", freq: 164.81 },
      { name: "E", displayName: "E", freq: 220.0 },
      { name: "A", displayName: "A", freq: 293.66 },
      { name: "Db", displayName: "Db", freq: 392.0 },
      { name: "Gb", displayName: "Gb", freq: 493.88 },
    ],
  },
  {
    name: "Fret 3",
    notes: [
      { name: "G", displayName: "G", freq: 130.81 },
      { name: "C", displayName: "C", freq: 174.61 },
      { name: "F", displayName: "F", freq: 233.08 },
      { name: "Bb", displayName: "Bb", freq: 311.13 },
      { name: "D", displayName: "D", freq: 415.3 },
      { name: "G", displayName: "G", freq: 523.25 },
    ],
  },{
    name: "Fret 4",
  notes: [
    { name: "Ab", displayName: "Ab", freq: 92.5 },
    { name: "Db", displayName: "Db", freq: 138.6 },
    { name: "Gb", displayName: "Gb", freq: 207.7 },
    { name: "B", displayName: "B", freq: 311.1 },
    { name: "Eb", displayName: "Eb", freq: 466.2 },
    { name: "Ab", displayName: "Ab", freq: 739.9 },
  ],
  },

  {
  name: "Fret 5",
  notes: [
    { name: "A", displayName: "A", freq: 98 },
    { name: "D", displayName: "D", freq: 146.8 },
    { name: "G", displayName: "G", freq: 220 },
    { name: "C", displayName: "C", freq: 329.6 },
    { name: "E", displayName: "E", freq: 493.9 },
    { name: "A", displayName: "A", freq: 783.9 },
  ],
  },

  {
  name: "Fret 6",
  notes: [
    { name: "Bb", displayName: "Bb", freq: 103.8 },
    { name: "Eb", displayName: "Eb", freq: 155.6 },
    { name: "Ab", displayName: "Ab", freq: 233.1 },
    { name: "Db", displayName: "Db", freq: 349.2 },
    { name: "F", displayName: "F", freq: 523.3 },
    { name: "Bb", displayName: "Bb", freq: 830.6 },
  ],
  },

];

const Tuner = () => {
  const [context, setContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(0);

  useEffect(() => {
    setContext(new (window.AudioContext || window.webkitAudioContext)());
  }, []);

  useEffect(() => {
    if (context && selectedNote) {
      if (oscillator) {
        oscillator.stop();
      }

      const newOscillator = context.createOscillator();
      newOscillator.frequency.value = selectedNote.freq;
      newOscillator.connect(context.destination);
      newOscillator.start();

      setOscillator(newOscillator);
    }
  }, [context, selectedNote]);

  const handleNoteSelection = (note) => {
    setSelectedNote(note);
  };

  
  const handleGroupSelection = (event) => {
    setSelectedGroup(event.target.value);
  };
  const stop =()=>{
    if(oscillator){
      setOscillator();
      oscillator.stop();
    }
  }

  return (
    <div>
      <select onChange={handleGroupSelection}>
        {groups.map((group, index) => (
          <option key={group.name} value={index}>
            {group.name}
          </option>
        ))}
      </select>
      <div>
        <h3>{groups[selectedGroup].name}</h3>
        <ul>
          {groups[selectedGroup].notes.map((note) => (
            <li key={note.name}>
              <button onClick={() => handleNoteSelection(note)}>
                {note.displayName}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={stop}>
        Stop
      </button>
    </div>
  );
}
export default Tuner;
