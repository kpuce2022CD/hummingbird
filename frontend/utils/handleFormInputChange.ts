export const handleFormInputChange = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  setter: React.Dispatch<React.SetStateAction<{}>>
) => {
  const name = e.target.name;
  const value = e.target.value;
  setter((values) => ({ ...values, [name]: value }));
};
