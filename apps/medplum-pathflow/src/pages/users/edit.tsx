import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { NumberInput, TextInput, Checkbox, Group } from "@mantine/core";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        getInputProps,
        saveButtonProps,
        setFieldValue,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            status: "",
            birthday: "",
            skills: [],
        },
    });

    const usersData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
            <TextInput
                mt="sm"
                label="First Name"
                {...getInputProps("firstName")}
            />
            <TextInput
                mt="sm"
                label="Last Name"
                {...getInputProps("lastName")}
            />
            <TextInput mt="sm" label="Email" {...getInputProps("email")} />
            <Checkbox
                mt="sm"
                label="Status"
                {...getInputProps("status", { type: "checkbox" })}
            />
            {/* 
                    DatePicker component is not included in "@refinedev/mantine" package.
                    To use a <DatePicker> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/dates/date-picker/
                */}
            <TextInput
                mt="sm"
                label="Birthday"
                {...getInputProps("birthday")}
            />
            <Group spacing="xs">
                {usersData?.skills?.map((item: any, index: number) => (
                    <TextInput
                        mt="sm"
                        key={index}
                        label="Skills"
                        {...getInputProps(`skills.${index}`)}
                    />
                ))}
            </Group>
            {/* 
                Dropzone component is not included in "@refinedev/mantine" package.
                To use a <Dropzone> component, you can follow the official documentation for Mantine.
                
                Docs: https://mantine.dev/others/dropzone/
            */}
        </Edit>
    );
};
