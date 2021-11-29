/*
 * custom DatePicker as hack to use date-fns (or native js Date) with antD Datepicker instead of
 * the built-in "moment" support
 * See: https://ant.design/docs/react/replace-moment
 */
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
