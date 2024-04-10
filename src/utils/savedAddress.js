export const SetFieldValues = (setFieldValue, address) => {
  setFieldValue('adressName', address.adressName || '');
  setFieldValue('comment', address.comment || '');
  setFieldValue('entranceCode', address.entranceCode || '');
  setFieldValue('entranceNumber', address.entranceNumber || '');
  setFieldValue('flatNumber', address.flatNumber || '');
  setFieldValue('floar', address.floar || '');
  setFieldValue('address', address.address || '');
};
