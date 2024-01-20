import { IndexPath, Input, Layout, Select, SelectItem, Text, useTheme } from "@ui-kitten/components";
import React from "react";


const DefaultDatePicker = (props) => {

    const theme = useTheme();

    const MIN_YEAR = 1950;
    const MAX_YEAR = new Date().getFullYear() - 10;

    const [selectedDay, setSelectedDay] = React.useState('01');
    const [dayIndex, setDayIndex] = React.useState();

    const [selectedMonth, setSelectedMonth] = React.useState('Jan');
    const [monthIndex, setMonthIndex] = React.useState();

    const [selectedYear, setSelectedYear] = React.useState(MIN_YEAR.toString());
    const [yearIndex, setYearIndex] = React.useState();

    const dayList = [...Array(31).keys()].map((item) => (item + 1).toString().padStart(2, '0'));
    const monthList = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const yearList = [...Array(MAX_YEAR - MIN_YEAR).keys()].map((item) => MAX_YEAR - item - 1);

    const renderOption = (title) => (
        <SelectItem title={title.toString().padStart(2, '0')} />
    );

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
                    }}>
                    {dayList.map(renderOption)}
                </Select>
                <Select
                    style={{flex: 2, marginRight: 8}}
                    selectedIndex={monthIndex}
                    value={selectedMonth}
                    onSelect={(index) => {
                        setMonthIndex(index);
                        setSelectedMonth(monthList[index.row].substring(0, 3));
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
                    }}>
                    {yearList.map(renderOption)}
                </Select>
            </Layout>
        </Layout>
    );

};
export default DefaultDatePicker;