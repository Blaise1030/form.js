import { Box } from "@chakra-ui/react";
import BaseForm from "./BaseForm";
import { ICheckbox, IRadioButton, ITextInput } from "./types";

function App() {
  const payload = [
    {
      type: "header",
      id: "4s",
      label: "The following is that",
      description:
        "This is the lorum ipsum This is the description an this is very long blah blaj This is the description an this is very long blah blaj",
    },
    {
      id: "1222as",
      type: "text",
      label: "Email",
      isTextArea: true,
      description: "This is the description an this is very long blah blaj",
      validation: {
        minLength: 2,
        maxLength: 10,
      },
    } as ITextInput,
    { type: "text", id: "2sss" },
    {
      type: "checkbox",
      id: "checkbox-3",
      label: "Email",
      description: "This is the description an this is very long blah blaj",
      validation: {
        required: true,
      },
    } as ICheckbox,
    {
      type: "radio",
      id: "radio-4",
      label: "Email",
      description: "This is the description an this is very long blah blaj",
      allowMultiple: false,
      halfSize: true,
      selections: [
        { label: "name", value: "value" },
        { label: "name1", value: "value1" },
        { label: "name2", value: "value2" },
      ],
      validation: {
        required: true,
      },
    } as IRadioButton,
    {
      type: "file",
      id: "file-5",
      label: "Email",
      acceptableFiles: [".png", ".jpg", ".pdf"],
      description: "This is the description an this is very long blah blaj",
      halfSize: true,
      validation: {
        required: true,
      },
    },
  ];
  return (
    <Box width={["100%", "80%"]} margin={"auto"} p={5} mt={4}>
      <BaseForm payload={payload} />
    </Box>
  );
}

export default App;
