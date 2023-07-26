import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  title: string;
  children?: JSX.Element;
  showCheckBox?: boolean;
  isChecked?: boolean;
  onChecked?: () => void;
}

export default function InputFieldsSharedLayout({
  title,
  children,
  showCheckBox = false,
  isChecked = false,
  onChecked,
}: Props) {
  const { isUsingDefaultAddress } = useSelector(
    (state: RootState) => state.user
  );
  const onCheckboxClicked = () => {
    if (onChecked) {
      onChecked();
    }
  };

  return (
    <fieldset className='w-full flex flex-col'>
      <div className='w-full pb-4 flex flex-col justify-between md:flex-row md:items-center'>
        <p className='uppercase text-sm leading-sm tracking-sm text-darkOrange font-bold'>
          {title}
        </p>
        {showCheckBox && (
          <div className='pt-2 flex items-center md:pt-0'>
            <input
              type='checkbox'
              id='defaultAddress'
              name='defaultAddress'
              checked={isUsingDefaultAddress}
              onChange={onCheckboxClicked}
            />
            <label className='pl-2 text-sm'>Same as default address</label>
          </div>
        )}
      </div>
      {children}
    </fieldset>
  );
}
