import React, { useState } from "react";
import { connect } from "react-redux";
import { addSongToFirestore } from "components/store/actions";
import { useNavigate } from "react-router-dom";
import SongForm from "./SongForm";

interface SongData {
  title: string;
  lyrics_with_chords: string;
  lyrics_without_chords: string;
  chordsOriginal: Record<string, string[]>;
  chordsTranspose: Record<string, string[]>;
}

interface AddSongProps {
  addSongToFirestore: any;
}

const AddSong: React.FC<AddSongProps> = ({ addSongToFirestore }) => {
  const [title, setTitle] = useState("");
  const [lyricsWithChords, setLyricsWithChords] = useState("");
  const [lyricsWithoutChords, setLyricsWithoutChords] = useState("");
  const [originalChordPairs, setOriginalChordPairs] = useState<
    { key: string; chords: string[] }[]
  >([{ key: "", chords: [] }]);
  const [transposeChordPairs, setTransposeChordPairs] = useState<
    { key: string; chords: string[] }[]
  >([{ key: "", chords: [] }]);
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleLyricsWithChordsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLyricsWithChords(e.target.value);
  };

  const handleLyricsWithoutChordsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLyricsWithoutChords(e.target.value);
  };

  const handleChordChange = (chordPairs, index, property, newValue, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index][property] = newValue;
    setter(newChordPairs);
  };

  const addChord = (chordPairs, index, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index].chords.push("");
    setter(newChordPairs);
  };

  const removeChord = (chordPairs, index, chordIndex, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index].chords.splice(chordIndex, 1);
    setter(newChordPairs);
  };

  const handleChordPairsChange = (
    chordPairs,
    index,
    property,
    newValue,
    setter
  ) => {
    const newChordPairs = [...chordPairs];
    newChordPairs[index][property] = newValue;
    setter(newChordPairs);
  };

  const addChordPair = (chordPairs, index, setter) => {
    const newChordPairs = [...chordPairs];
    newChordPairs.push({ key: "", chords: [""] });
    setter(newChordPairs);
  };

  const handleSubmit = () => {
    const chordsOriginal: Record<string, string[]> = {};
    const chordsTranspose: Record<string, string[]> = {};

    originalChordPairs.forEach((pair) => {
      chordsOriginal[pair.key] = pair.chords;
    });

    transposeChordPairs.forEach((pair) => {
      chordsTranspose[pair.key] = pair.chords;
    });

    const newSong: SongData = {
      lyrics_without_chords: lyricsWithoutChords,
      lyrics_with_chords: lyricsWithChords,
      title: title,
      chordsOriginal,
      chordsTranspose,
    };

    addSongToFirestore(newSong)
      .then(() => {
        navigate("/controlPanel");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <SongForm
        originalChordPairs={originalChordPairs}
        setOriginalChordPairs={setOriginalChordPairs}
        transposeChordPairs={transposeChordPairs}
        setTransposeChordPairs={setTransposeChordPairs}
        handleChordChange={handleChordChange}
        addChord={addChord}
        removeChord={removeChord}
        handleChordPairsChange={handleChordPairsChange}
        addChordPair={addChordPair}
        onSubmit={handleSubmit}
        handleTitleChange={handleTitleChange}
        handleLyricsWithChordsChange={handleLyricsWithChordsChange}
        handleLyricsWithoutChordsChange={handleLyricsWithoutChordsChange}
        title={title}
        lyricsWithChords={lyricsWithChords}
        lyricsWithoutChords={lyricsWithoutChords}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSongToFirestore: (song) => dispatch(addSongToFirestore(song)),
  };
};

export default connect(null, mapDispatchToProps)(AddSong);
