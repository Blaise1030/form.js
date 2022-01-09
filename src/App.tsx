import { Box } from "@chakra-ui/react";
import BaseForm from "./BaseForm";
import { IDatePicker, ISelectInput, ITextInput } from "./types";

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
    {
      type: "text",
      id: "2sss",
      halfSize: true,
      validation: {
        regex: {
          regex: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
          patternName: "email",
        },
      },
    } as ITextInput,
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
    {
      type: "select",
      id: "select-5",
      label: "Email",
      description: "This is the description an this is very long blah blaj",
      defaultValue: "3",
      selections: [
        {
          value: "1",
          label: "This is the lable1",
        },
        {
          value: "2",
          label: "This is the lable2",
        },
        {
          value: "3",
          label: "This is the lable3",
        },
      ],
    } as ISelectInput,
    {
      type: "date",
      id: "data-5",
      label: "Email",
      description: "This is the description an this is very long blah blaj",
    } as IDatePicker,
  ];

  return (
    <Box width={["100%", "80%"]} margin={"auto"} p={14} mt={4}>
      <BaseForm
        payload={payload as any}
        validationPlugin={[]}
        showConfirmAlert
        onSubmit={async (values) => {
          await sleep(4000);
          console.log(values);
        }}
      />
    </Box>
  );
}

export default App;
