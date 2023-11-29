import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs().format('L LT')

export const formatDateString = (date: any) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };

  export const formatDateTime = (date: string) => {
    if(!date) return "N/A"
    return dayjs(date).format('lll'); 
  }

  export const formatDate = (date: string) =>{

    if(!date) return null
    return dayjs(date).format('ll');
  } 