import File from '@/components/form/File';
import InputText from '@/components/form/InputText';
import Select from '@/components/form/Select';
import Textarea from '@/components/form/Textarea';

export default function FormikController(props) {
  const { control, ...rest } = props;

  switch (control) {
    case 'text':
      return <InputText {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'file':
      return <File {...rest} />;
    default:
      return null;
  }
}
