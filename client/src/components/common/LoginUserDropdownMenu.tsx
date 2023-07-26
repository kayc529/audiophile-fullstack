import React from 'react';
import LoginUserDropdownMenuItem from './LoginUserDropdownMenuItem';
import { BsBoxSeam } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';

export default function LoginUserDropdownMenu() {
  return (
    <ul className='w-[200px]'>
      <LoginUserDropdownMenuItem
        title='orders'
        description='View and track online orders'
        link='orders'
      >
        <BsBoxSeam className='w-7 h-7' style={{ color: 'grey' }} />
      </LoginUserDropdownMenuItem>
      <LoginUserDropdownMenuItem
        title='account settings'
        description='Contact info, password'
        link='account-info'
      >
        <FaRegAddressCard className='w-7 h-7' style={{ color: 'grey' }} />
      </LoginUserDropdownMenuItem>
    </ul>
  );
}
