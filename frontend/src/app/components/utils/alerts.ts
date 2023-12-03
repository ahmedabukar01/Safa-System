import { App, notification } from "antd";
import type { NotificationPlacement } from 'antd/es/notification/interface';

export const GreenLight = (
    title: string,
    description: string,
    duration = 4.5
  ) => {
    notification.success({
      message: title,
      description,
      duration,
    });
  };
  
  export const RedLight = (title: string, description: string) => {
    notification.error({
      message: title,
      description,
    });

  };

  // export const RedLight = (title: string, description: string) => {
  //   const { message } = App.useApp();

  //   message.error(`${title} ${description}`);

  // };

    
  export const WarningAlert = (title: string, description: string) => {
    notification.warning({
      message: title,
      description,
    });

  };
  
  // TO KNOW
  // Warning message when using these alerts. "Static Funcion can not consume context like dynamic theme ...."

  // export const WarningAlert = (
  //   title: string,
  //   description: string,
  //   duration = 4.5
  // ) => {
  //   notification.warning({
  //     duration: duration,
  //     message: title,
  //     description,
  //   });
  // };