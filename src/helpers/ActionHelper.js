const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

export const getPending = (type) => `${type}_${PENDING}`;
export const getFullfilled = (type) => `${type}_${FULFILLED}`;
export const getRejected = (type) => `${type}_${REJECTED}`;
