import { IndexPath, Input, Layout, Select, SelectItem, Text, useTheme } from "@ui-kitten/components";
import React from "react";


const DefaultDatePicker = (props) => {

    const theme = useTheme();

    // Configuration
    const MIN_YEAR = 1950;
    const MAX_YEAR = new Date().getFullYear() - 10;

    // Data used for selection
    const dayList = [...Array(31).keys()].map((item) => (item + 1).toString().padStart(2, '0'));
    const monthList = [
        "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const yearList = [...Array(MAX_YEAR - MIN_YEAR).keys()].map((item) => (MAX_YEAR - item - 1).toString());

    // Default values
    const [defaultYear, defaultMonth, defaultDay] = props.value ? 
        props.value.split('-') : 
        [MIN_YEAR.toString(), "01", "01"];

    const [selectedDay, setSelectedDay] = React.useState(defaultDay);
    const [dayIndex, setDayIndex] = React.useState();

    const [selectedMonth, setSelectedMonth] = React.useState(monthList[parseInt(defaultMonth) - 1]);
    const [monthIndex, setMonthIndex] = React.useState();

    const [selectedYear, setSelectedYear] = React.useState(defaultYear);
    const [yearIndex, setYearIndex] = React.useState();

    const renderOption = (item, key) => (
        <SelectItem key={key} title={item.toString().padStart(2, '0')} />
    );

    const updateValue = (dayIndex, monthIndex, yearIndex) => {
        // Revert to default value if not defined yet
        let [_dayIndex, _monthIndex, _yearIndex] = [
            dayIndex || dayList.indexOf(defaultDay),
            monthIndex || parseInt(defaultMonth) - 1,
            yearIndex || yearList.indexOf(defaultYear)
        ];

        let _value = [
            yearList[_yearIndex],
            (_monthIndex + 1).toString().padStart(2, '0'),
            dayList[_dayIndex]
        ].join('-');

        // Once set, we call the callback
        if (props.onChangeDate) {
            props.onChangeDate(_value);
        }
    };

    return (
        <Layout>
            <Text category='label' style={[props.style, { color: theme['color-basic-600'] }]}>{props.label}</Text>

            <Layout style={{flexDirection: 'row', marginTop: 4}}>
                <Select 
                    style={{flex: 2, marginRight: 8}}
                    selectedIndex={dayIndex}
                    value={selectedDay}
                    onSelect={(index) => {
                        setDayIndex(index);
                        setSelectedDay(dayList[index.row]);
                        updateValue(index.row, monthIndex, yearIndex);
                    }}>
                    {dayList.map(renderOption)}
                </Select>
                <Select
                    style={{flex: 2, marginRight: 8}}
                    selectedIndex={monthIndex}
                    value={selectedMonth}
                    onSelect={(index) => {
                        setMonthIndex(index);
                        setSelectedMonth(monthList[index.row]);
                        updateValue(dayIndex, index.row, yearIndex);
                    }}>
                    {monthList.map(renderOption)}
                </Select>
                <Select
                    style={{flex: 2}}
                    selectedIndex={yearIndex}
                    value={selectedYear}
                    onSelect={(index) => {
                        setYearIndex(index);
                        setSelectedYear(yearList[index.row]);
                        updateValue(dayIndex, monthIndex, index.row);
                    }}>
                    {yearList.map(renderOption)}
                </Select>
            </Layout>
        </Layout>
    );

};
export default DefaultDatePicker;