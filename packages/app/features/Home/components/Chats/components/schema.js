import * as Yup from 'yup';

export const CreateGroupSchema = Yup.object().shape({
  image: Yup.object().nullable(),
  name: Yup.string().min(3, 'Minimum of three characters').required('Give your group a name'),
  isPrivate: Yup.boolean()
});
