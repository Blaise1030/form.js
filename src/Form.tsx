import { Grid } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { IComponent, IFormFields } from "./types";

function BaseForm({
  formFields,
  payload,
}: {
  formFields: IFormFields;
  payload?: IComponent[];
}) {
  const knowedFields = payload?.filter(({ type }) => Boolean(formFields[type]));

  const validate = (e: any) => {
    console.log(e);
    return {};
  };
  const onSubmit = (e: any) => {
    console.log(e);
    return {};
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {knowedFields?.map((p) => formFields[p?.type](p).render())}
            <button type="submit">Submit</button>
          </Grid>
        </form>
      )}
    />
  );
}

export default BaseForm;
