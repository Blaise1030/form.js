export interface IValidatorOutput<T, V> {
  validateFunc: (
    inputValue: T,
    ruleValue: V,
    fieldName: string
  ) => void | { [_: string]: string };
  validatorName: string;
  dataType: string[];
}

function B_Required(): IValidatorOutput<any, boolean> {
  return {
    dataType: ["any"],
    validatorName: "required",
    validateFunc: (value: any, ruleValue: boolean, fieldName: string) => {
      const success = ruleValue && value !== undefined && value !== null;
      if (success) return;
      else return { [fieldName]: "Field is required" };
    },
  };
}

function B_MinLength(): IValidatorOutput<string, number> {
  return {
    dataType: ["string"],
    validatorName: "minLength",
    validateFunc: (value: string, length: number, id: string) => {
      const success = value.length > length;
      if (success) return;
      return { [id]: `Length less than ${length} characters` };
    },
  };
}

function B_EqLength(): IValidatorOutput<string, number> {
  return {
    dataType: ["string"],
    validatorName: "eqLength",
    validateFunc: (value: string, length: number, id: string) => {
      const success = value.length === length;
      if (success) return;
      return { [id]: `Length not equal to ${length} characters` };
    },
  };
}

function B_MaxLength(): IValidatorOutput<string, number> {
  return {
    validatorName: "maxLength",
    dataType: ["string"],
    validateFunc: (value: string, length: number, id: string) => {
      const success = value.length < length;
      if (success) return;
      return { [id]: `Length exceeds ${length} characters` };
    },
  };
}

function B_MatchRegex(): IValidatorOutput<
  string,
  { regex: string; patternName: string } | string
> {
  return {
    validatorName: "regex",
    dataType: ["string"],
    validateFunc: (
      value: string,
      payload: { regex: string; patternName: string } | string,
      id: string
    ) => {
      if (typeof payload === "object") {
        const { regex, patternName } = payload;
        const success = value.match(regex);
        if (success) return;
        return { [id]: `Invalid ${patternName}` };
      } else if (typeof payload === "string") {
        const success = value.match(payload);
        if (success) return;
        return { [id]: `Does not match ${payload}` };
      }
      return;
    },
  };
}

const createValidatorMap = (
  validationPlugins: Array<IValidatorOutput<any, any>> = []
): { [type: string]: IValidatorOutput<any, any> } =>
  [
    B_Required(),
    B_EqLength(),
    B_MatchRegex(),
    B_MinLength(),
    B_MaxLength(),
    ...validationPlugins,
  ].reduce(
    (prev, curr) => ({
      [curr.validatorName]: {
        ...curr,
      },
      ...prev,
    }),
    {}
  );

export default createValidatorMap;
