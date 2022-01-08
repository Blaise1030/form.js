import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Field, FieldRenderProps, Form } from "react-final-form";

import BaseComponent from "./BaseComponents";

function App() {
  const [count, setCount] = useState(0);

  const formFields = [
    {
      type: "Info",
      lable: "This is the header",
      description: "This is the description",
      validation: {
        required: true,
      },
    },
    {
      type: "HStack",
      lable: "This is the label",
      description: "This is the description",
    },
  ];

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              children={(props: FieldRenderProps<any>) => (
                <Input
                  onChange={props.input.onChange}
                  value={props.input.value}
                />
              )}
            />
            <Field
              name="email"
              children={(props) => (
                <Input
                  onChange={props.input.onChange}
                  value={props.input.value}
                />
              )}
            />
            <Field
              name="password"
              children={(props) => (
                <Input
                  onChange={props.input.onChange}
                  value={props.input.value}
                />
              )}
            />
            <button type="submit">Submit</button>
          </form>
        );
      }}
    />
  );
}

export default App;
