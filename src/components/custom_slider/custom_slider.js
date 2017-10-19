import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const CustomSlider = ({ instance, label, min, max, defaultValue, dots, railStyle, dotStyle, trackStyle, handleStyle, onSliderChange }) => {
  return (
    <div className="custom_slider">
      <p>{label}</p>
      <Slider 
        min={min} 
        max={max} 
        defaultValue={defaultValue} 
        handle={handle} 
        dots={dots} 
        railStyle={railStyle} 
        dotStyle={dotStyle}
        trackStyle={trackStyle}
        handleStyle={handleStyle || { borderColor: trackStyle.backgroundColor || '#AAA' }}
        activeDotStyle={{ borderColor: trackStyle.backgroundColor || '#AAA' }}
        onChange={data => onSliderChange(data, instance)}
      />
    </div>
  );
};

export default CustomSlider;
