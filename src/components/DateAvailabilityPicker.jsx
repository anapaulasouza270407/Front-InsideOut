import React from 'react';
 
export const DateAvailabilityPicker = ({ selectedDates, onChange, disabledDates = [] }) => {
    const allDates = Array.from({ length: 14 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString().slice(0, 10);  //e a data
    });
 
    const toggleDate = (date) => {
        if (selectedDates.includes(date)) {
            onChange(selectedDates.filter(d => d !== date));
        } else {
            onChange([...selectedDates, date]);
        }
    }
 
 
    return (
        <div className="space-y-2">
            <label className="block text-lg font-medium text-dark mb-1">
                Selecione suas datas disponiveis
            </label>
            <div className="grid grid-cols-3 gap-2">
                {allDates.map(date => {
                    const isDisabled = disabledDates.includes(date);
                    const isSelected = selectedDates.includes(date);
                    return (
                        <button
                            key={date}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => toggleDate(date)}
                            className={`px-3 py-2 rounded-lg text-sm border ${isDisabled
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : isSelected
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-dark hover:bg-blue-100'
                                }`}
                        >
                            {new Date(date).toLocaleDateString('pt-BR', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                            })}
                        </button>
                    );
                })}
            </div>
        </div>
    )
};