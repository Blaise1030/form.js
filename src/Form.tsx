import { Box, GridItem, Input, SimpleGrid } from "@chakra-ui/react";

const Form = () => {
  return (
    <SimpleGrid column={2} width={"50%"} gap={2}>
      <GridItem colSpan={1} children={<Input size={"sm"} />} />
      <GridItem colSpan={1} children={<Input size={"sm"} />} />
      <GridItem colSpan={2} children={<Input size={"sm"} />} />
      <GridItem colSpan={1} children={<Input size={"sm"} />} />
      <GridItem colSpan={1} children={<Input size={"sm"} />} />
    </SimpleGrid>
  );
};

export default Form;
