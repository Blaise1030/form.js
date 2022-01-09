import { Box } from "@chakra-ui/react";
import BaseForm from "./BaseForm";

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
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
    },
    { type: "text", id: "2sss", halfSize: true },
    {
      type: "checkbox",
      id: "checkbox-3",
      label: "Email",
      halfSize: true,
      description: "This is the description an this is very long blah blaj",
      defaultValue: true,
      validation: {
        required: true,
      },
    },
    {
      type: "radio",
      id: "radio-4",
      label: "Email",
      description: "This is the description an this is very long blah blaj",
      selections: [
        { label: "name", value: "value" },
        { label: "name1", value: "value1" },
        { label: "name2", value: "value2" },
        { label: "name3", value: "value3" },
        { label: "name4", value: "value4" },
      ],
      defaultValue: "value2",
      validation: {
        required: true,
      },
    },
    {
      type: "file",
      id: "file-5",
      label: "Email",
      acceptableFiles: [".png", ".jpg", ".pdf"],
      description: "This is the description an this is very long blah blaj",
      validation: {
        required: true,
      },
    },
  ];

  return (
    <Box width={["100%"]} margin={"auto"} p={14} mt={4}>
      <BaseForm
        onSubmit={async (values) => {
          await sleep(4000);
        }}
        payload={payload as any}
        validationPlugin={[]}
        componentPlugin={[]}
        showConfirmAlert
      />
    </Box>
  );
}

export default App;
