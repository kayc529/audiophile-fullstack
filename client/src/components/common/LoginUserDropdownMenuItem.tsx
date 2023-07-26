import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeAllModals } from '../../features/modal/modalSlice';

interface Props {
  children: JSX.Element;
  title: string;
  description: string;
  link?: string;
}

export default function LoginUserDropdownMenuItem({
  children,
  title,
  description,
  link = undefined,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLinkClick = () => {
    if (link) {
      dispatch(closeAllModals());
      navigate(`/my-account/${link}`);
    }
  };

  return (
    <li className='flex py-4 items-center border-b last:border-0 first:pt-0 last:pb-2'>
      {children}
      <div className='w-full pl-4 flex flex-col'>
        <p
          className='pb-1 capitalize text-lg tracking-sm leading-sm font-normal cursor-pointer hover:text-darkOrange hover:font-bold'
          onClick={onLinkClick}
        >
          {title}
        </p>
        <p className='text-sm tracking-sm leading-md opacity-60'>
          {description}
        </p>
      </div>
    </li>
  );
}
