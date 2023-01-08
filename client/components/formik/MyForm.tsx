import { Form } from "formik";

export default function MyForm({
  props,
  children,
}: {
  props?: any;
  children: React.ReactNode;
}) {
  return (
    <Form className="flex w-80 flex-col gap-3" {...props}>
      {children}
    </Form>
  );
}
