export interface IValidation {
  [id: string]: boolean | string | object | number;
}

export interface IComponent {
  type: string;
  id: string;
  label?: string;
  order?: number;
  halfSize?: boolean;
  isReadonly?: boolean;
  description?: string;
  validation?: IValidation;
}

export interface IHeader extends IComponent {
  type: "Header";
}

export interface IHStack extends IComponent {
  type: "HStack";
  right: IComponent;
  left: IComponent;
}

export interface IRadioButton extends IComponent {
  type: "radio";
  selections: Array<{ label: string; value: string }>;
  allowMultiple: boolean;
  validation?: {
    required?: boolean;
  };
}

export interface ICheckbox extends IComponent {
  type: "checkbox";
  selections: Array<{ label: string; value: string }>;
  label: string;
  validation?: {
    required?: boolean;
  };
}

export interface ITextInput extends IComponent {
  type: "text";
  isTextArea?: boolean;
  validation?: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    regex?: string;
  };
}

export interface IFileInput extends IComponent {
  type: "file";
  acceptableFiles?: string[];
  validation?: {
    required?: boolean;
    maximumFileSize?: number;
  };
}

export interface IDatePicker extends IComponent {
  type: "DatePicker";
  validation?: {
    required?: boolean;
    maxDate?: Date;
    minDate?: Date;
  };
}

export interface IDateRange extends IComponent {
  type: "DateRange";
  validation: {
    required?: boolean;
    maxDate?: Date;
    minDate?: Date;
  };
}

export interface ISelection extends IComponent {
  type: "Selection";
  selections: Array<{ name: string; label: string }>;
  validation?: {
    required: boolean;
  };
}
