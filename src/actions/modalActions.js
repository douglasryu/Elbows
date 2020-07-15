export const OPEN_MODAL = "elbows/modal/OPEN_MODAL";
export const CLOSE_MODAL = "elbows/modal/CLOSE_MODAL";

export const openModal = modal => ({ type: OPEN_MODAL, modal });
export const closeModal = () => ({ type: CLOSE_MODAL });