import React from 'react';
import type { Student, University, CountryCode } from '../types';
import { BACKGROUNDS, COUNTRIES } from '../constants/data';
import { DownloadIcon, RefreshCwIcon, ShuffleIcon } from './Icons';

interface ControlPanelProps {
    student: Student;
    selectedCountry: CountryCode;
    cardColor: string;
    onCountryChange: (countryCode: CountryCode) => void;
    onStudentChange: <K extends keyof Student>(field: K, value: Student[K]) => void;
    onUniversityChange: (field: keyof University, value: string) => void;
    onRandomizeField: (field: keyof Student) => void;
    onGenerateNew: () => void;
    onDownload: () => void;
    onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isGenerating: boolean;
    onBackgroundChange: (style: React.CSSProperties) => void;
    onCardColorChange: (color: string) => void;
}

const inputStyles = "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500";

const ControlPanel: React.FC<ControlPanelProps> = ({
    student,
    selectedCountry,
    cardColor,
    onCountryChange,
    onStudentChange,
    onUniversityChange,
    onRandomizeField,
    onGenerateNew,
    onDownload,
    onPhotoUpload,
    onLogoUpload,
    isGenerating,
    onBackgroundChange,
    onCardColorChange,
}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onStudentChange(name as keyof Student, value);
    };
    
    const handlePredefinedBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBg = BACKGROUNDS.find(bg => bg.name === e.target.value);
        if (selectedBg) {
            onBackgroundChange(selectedBg.style);
        }
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-8">
            {/* Section: Country Selection */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Quốc gia</h2>
                <label htmlFor="country" className="block text-sm font-medium text-gray-800 mb-1">Chọn quốc gia</label>
                <select id="country" name="country" value={selectedCountry} onChange={(e) => onCountryChange(e.target.value as CountryCode)} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${inputStyles}`}>
                    {COUNTRIES.map(country => (
                        <option key={country.code} value={country.code} className="bg-gray-700 text-white">{country.name}</option>
                    ))}
                </select>
            </div>
        
            {/* Section: Card Customization */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Tùy chỉnh thẻ</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="background" className="block text-sm font-medium text-gray-800 mb-1">Nền khu vực thẻ</label>
                        <select id="background" name="background" onChange={handlePredefinedBackgroundChange} defaultValue={BACKGROUNDS[0].name} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${inputStyles}`}>
                            {BACKGROUNDS.map(bg => (
                                <option key={bg.name} className="bg-gray-700 text-white">{bg.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cardColor" className="block text-sm font-medium text-gray-800 mb-1">Màu nền thẻ</label>
                        <input
                            type="color"
                            id="cardColor"
                            value={cardColor}
                            onChange={(e) => onCardColorChange(e.target.value)}
                            className="w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            
            <div className="flex gap-3">
                <button
                    onClick={onGenerateNew}
                    disabled={isGenerating}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300 disabled:bg-gray-400"
                >
                    <RefreshCwIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    TẠO THẺ SV MỚI
                </button>
                <button
                    onClick={onDownload}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-300"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    TẢI ẢNH THẺ SV
                </button>
            </div>

            {/* Section: University Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Thông tin trường</h2>
                <div className="space-y-3">
                    <InputField label="Tên trường" name="universityName" value={student.university.name} onRandomize={() => onRandomizeField('university')} onChange={(e) => onUniversityChange('name', e.target.value)} />
                     <div>
                         <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-800 mb-1">Tải lên logo</label>
                         <input type="file" id="logoUpload" name="logoUpload" accept="image/*" onChange={onLogoUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                    </div>
                </div>
            </div>

            {/* Section: Portrait Photo */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Ảnh chân dung</h2>
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-800 mb-1">Giới tính</label>
                        <select id="gender" name="gender" value={student.gender} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${inputStyles}`}>
                            <option value="random">Random</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <button onClick={() => onRandomizeField('photoUrl')} aria-label="Randomize Photo" className="self-end p-2.5 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        <ShuffleIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="mt-3">
                     <label htmlFor="photoUpload" className="block text-sm font-medium text-gray-800 mb-1">Hoặc tải ảnh lên</label>
                     <input type="file" id="photoUpload" name="photoUpload" accept="image/*" onChange={onPhotoUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                </div>
            </div>

            {/* Section: Current Information */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Thông tin hiện tại</h2>
                <div className="space-y-4">
                    <InputField label="Họ tên" name="name" value={student.name} onRandomize={() => onRandomizeField('name')} onChange={handleInputChange} />
                    <InputField label="Ngày sinh" name="dob" value={student.dob} onRandomize={() => onRandomizeField('dob')} onChange={handleInputChange} />
                    <InputField label="Số thẻ sinh viên" name="id" value={student.id} onChange={handleInputChange} />
                    <InputField label="Email sinh viên" name="email" value={student.email} onChange={handleInputChange} />
                    <InputField label="Hết hạn (năm học)" name="validYears" value={student.validYears} onChange={handleInputChange} />
                </div>
            </div>
        </div>
    );
};

interface InputFieldProps {
    label: string;
    name: keyof Student | 'universityName';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRandomize?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, onRandomize }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-800">{label}</label>
        <div className="mt-1 flex rounded-md shadow-sm">
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`flex-1 block w-full px-3 py-2 border sm:text-sm disabled:bg-gray-600 ${inputStyles} ${onRandomize ? 'rounded-l-md' : 'rounded-md'}`}
            />
            {onRandomize && (
                <button onClick={onRandomize} aria-label={`Randomize ${label}`} className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <ShuffleIcon className="h-5 w-5"/>
                </button>
            )}
        </div>
    </div>
);

export default ControlPanel;