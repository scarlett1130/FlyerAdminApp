import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, width }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} width={width} />;
}

export default SubmitButton;
