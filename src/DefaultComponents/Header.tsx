import { Text, VStack } from "@chakra-ui/react";
import { FieldRenderProps } from "react-final-form";
import BaseField from "../BaseField";
import { IComponent } from "../types";

const Header = (payload: IComponent) => ({
  ...BaseField(
    payload,
    (
      _: FieldRenderProps<any, HTMLElement, any>,
      payload: IComponent,
      __: string
    ) => (
      <VStack align={"start"}>
        <Text fontWeight={"medium"}>{payload.label}</Text>
        <Text pb={2.5} color={"gray.500"} fontSize={"sm"}>
          {payload.description}
        </Text>
      </VStack>
    )
  ),
});

export default Header;
