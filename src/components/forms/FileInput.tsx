import React, { FC } from "react";
import { Field, FieldProps } from "formik";
import { Input } from "../ui/input";

type Props = {
  name: string;
  label?: string;
  accept?: string;
  setPreviewImg?: any;
  setFileName?: any;
};

const FileInput: FC<Props> = ({
  name,
  setFileName,
  setPreviewImg,
  label,
  accept,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const { setFieldValue } = form;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { target } = event;
          const file = (target?.files && target?.files[0]) || null;
          setFieldValue(name, file);
        };

        return (
          <div>
            <label htmlFor={name}>{label}</label>
            <Input
              type="file"
              accept={accept}
              id={name}
              onChange={handleChange}
            />

            {meta.touched && meta.error ? <span>{meta.error}</span> : null}
          </div>
        );
      }}
    </Field>
  );
};

export default FileInput;
