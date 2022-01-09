import { Box } from "@chakra-ui/react";
import BaseForm from "./BaseForm";
import { IDatePicker, ISelectInput, ITextInput } from "./types";

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
function App() {
  return (
    <Box width={["100%", "80%"]} margin={"auto"} p={14} mt={4}>
      <BaseForm
        payload={[]}
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
