import React from "react";
import StyledInput from "./StyledInput";

interface NoteInputProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const NoteInput: React.FC<NoteInputProps> = ({ data, setData }) => {
  return (
    <StyledInput
      onChange={(e) => setData(e.target.value)}
      value={data}
      placeholder="Enter your note here..."
    />
  );
};

export default NoteInput;