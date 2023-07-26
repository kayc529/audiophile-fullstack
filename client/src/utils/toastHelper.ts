import { toast } from 'react-toastify';

export enum TOAST_MESSAGE_TYPE {
  SUCCESS,
  ERROR,
  DEFAULT,
}

export const toastMessage = (msg: string, msgType?: TOAST_MESSAGE_TYPE) => {
  if (typeof msgType === 'undefined') {
    toast(msg);
    return;
  }

  switch (msgType) {
    case TOAST_MESSAGE_TYPE.SUCCESS:
      toast.success(msg);
      return;
    case TOAST_MESSAGE_TYPE.ERROR:
      toast.error(msg);
      return;
    default:
      toast(msg);
      return;
  }
};
