import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

import { App, message as antdMessage, Modal as antdModal, notification as antdNotification } from 'antd';

let message: MessageInstance = antdMessage;
let notification: NotificationInstance = antdNotification;

// because warn is deprecated, so we need to remove it.
const { ...resetFns } = antdModal;
let modal: Omit<ModalStaticFunctions, 'warn'> = resetFns;

/**
 * This component is used to escape the antd's static functions.
 */
function EscapeAntd() {
  const staticFunctions = App.useApp();

  message = staticFunctions.message;
  notification = staticFunctions.notification;
  modal = staticFunctions.modal;

  return null;
}

export { message, modal, notification };

export default EscapeAntd;
