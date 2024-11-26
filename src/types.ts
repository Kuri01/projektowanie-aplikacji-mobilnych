export type RootStackParamList = {
    Form: undefined;
    Summary: { formData: FormData };
};

export interface FormData {
    firstName: string;
    lastName: string;
    city: string;
    street: string;
    houseNumber: string;
    birthDate: string;
    gender: string;
    hobbies: string[];
}