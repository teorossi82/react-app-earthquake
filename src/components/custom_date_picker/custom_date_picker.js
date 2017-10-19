import React from 'react';
import DatePicker from 'react-date-picker';

import './custom_date_picker.scss';

const CustomDatePicker = ({ value, instance, onDateChange }) => {
	const onChange = date => {
		onDateChange(date, instance);
	};

	return (
		<div className="custom_date_picker">
			<DatePicker
				className="box-date"
				calendarClassName="box-calendar"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default CustomDatePicker;
