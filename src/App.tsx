import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import BaseForm from "./Form";
import TextInput from "./DefaultComponents/TextInput";
import { ICheckbox, IFileInput, IRadioButton, ITextInput } from "./types";
import CheckboxInput from "./DefaultComponents/CheckBoxInput";
import Header from "./DefaultComponents/Header";
import RadioInput from "./DefaultComponents/RadioInput";
import FileInput from "./DefaultComponents/FileInput";

function App() {
  const payload = [
    {
      type: "header",
      id: "4",
      label: "The following is that",
      description:
        "This is the lorum ipsum This is the description an this is very long blah blaj This is the description an this is very long blah blaj",
    },
    {
      id: "1",
      type: "text",
      label: "Email",
      isTextArea: true,
      description: "This is the description an this is very long blah blaj",
      validation: {
        required: true,
      },
    },
    { type: "text", id: "2" },
    {
      type: "checkbox",
      id: "3",
      label: "Email",
      description: "This is the description an this is very long blah blaj",
    },
    {
      type: "radio",
      id: "4",
      label: "Email",
      description: "This is the description an this is very long blah blaj",
      allowMultiple: false,
      halfSize: true,
      selections: [
        { label: "name", value: "value" },
        { label: "name1", value: "value1" },
        { label: "name2", value: "value2" },
      ],
    },
    {
      type: "file",
      id: "5",
      label: "Email",
      acceptableFiles: [".png", ".jpg", ".pdf"],
      description: "This is the description an this is very long blah blaj",
      halfSize: true,
    },
  ];
  return (
    <Box width={["100%", "80%"]} margin={"auto"} p={5} mt={4}>
      <BaseForm
        payload={payload}
        formFields={{
          header: Header,
          text: TextInput,
          file: FileInput,
          radio: RadioInput,
          checkbox: CheckboxInput,
        }}
      />
    </Box>
  );
}

export default App;
