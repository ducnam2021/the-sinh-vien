import React, { useState, useEffect } from 'react';
import type { Student, CountryCode } from '../types';
import Spinner from './Spinner';
import { LOCALIZED_STRINGS } from '../constants/data';

// Extend the Window interface to include the QRCode library, making it robust against load timing issues.
declare global {
    interface Window {
        QRCode?: {
            toDataURL: (text: string, options?: any) => Promise<string>;
        };
    }
}

const Watermark: React.FC<{ text: string }> = ({ text }) => {
    const watermarkText = text.split(' ').join('-').toUpperCase();
    return (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {Array(5).fill(0).map((_, i) => (
                <p key={i} className="absolute font-black text-6xl text-black opacity-[0.04] whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
                   style={{
                       left: `${(i * 30) % 100}%`,
                       top: `${(20 + i * 25)}%`,
                       transform: 'rotate(-30deg)'
                   }}>
                    {watermarkText}
                </p>
            ))}
        </div>
    );
};


interface IDCardProps {
    student: Student;
    country: CountryCode;
    isPhotoGenerating?: boolean;
    cardColor: string;
}

const IDCard: React.FC<IDCardProps> = ({ student, country, isPhotoGenerating = false, cardColor }) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
    const localized = LOCALIZED_STRINGS[country] || LOCALIZED_STRINGS.US;

    const getTextColorForBackground = (hexColor: string): string => {
        if (!hexColor || !hexColor.startsWith('#')) return '#000000';
        try {
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);
            // http://www.w3.org/TR/AERT#color-contrast
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
            return luminance > 128 ? '#000000' : '#FFFFFF';
        } catch(e) {
            return '#000000';
        }
    };
    
    const textColor = getTextColorForBackground(cardColor);

    useEffect(() => {
        // Safely check if the QRCode library is available on the window object before using it.
        if (window.QRCode && student.id && student.email) {
            const qrData = JSON.stringify({
                studentId: student.id,
                email: student.email
            });
            const options = {
                errorCorrectionLevel: 'H' as const,
                margin: 1,
                width: 128,
            };
            window.QRCode.toDataURL(qrData, options)
                .then((url: string) => {
                    setQrCodeDataUrl(url);
                })
                .catch((err: Error) => {
                    console.error('Failed to generate QR code', err);
                    setQrCodeDataUrl('');
                });
        }
    }, [student.id, student.email]);
    
    return (
        <div 
            className="font-sans relative w-full max-w-xl mx-auto rounded-2xl shadow-2xl overflow-hidden aspect-[85.6/54] transition-colors duration-300"
            style={{ backgroundColor: cardColor, color: textColor }}
        >
            <Watermark text={student.university.name} />
            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <header className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full p-1 flex items-center justify-center">
                         <img src={student.university.logo} alt={`${student.university.name} Logo`} className="w-12 h-12 object-contain" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-wider leading-tight">{student.university.name.toUpperCase()}</h2>
                        <p className="text-sm font-semibold">{localized.cardTitle}</p>
                    </div>
                </header>

                <main className="flex items-end space-x-5">
                    <div className="flex-1 flex items-end space-x-4">
                        <div className="flex-1 space-y-1">
                            <p className="font-mono text-lg tracking-widest">{student.id}</p>
                            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide">{student.name}</h3>
                            <p className="font-semibold text-lg">{student.dob}</p>
                            <p className="font-bold text-xl" style={{ opacity: 0.8 }}>{student.major}</p>
                        </div>
                        {qrCodeDataUrl && (
                            <div className="flex-shrink-0">
                                <img src={qrCodeDataUrl} alt="Student QR Code" className="w-20 h-20 rounded-md bg-white p-1 shadow-sm" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative w-28 h-36 sm:w-32 sm:h-40 bg-white p-1 border-2 border-black/50 shadow-lg">
                           <img src={student.photoUrl} alt="Student" className="w-full h-full object-cover"/>
                           {isPhotoGenerating && (
                               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                   <Spinner />
                               </div>
                           )}
                        </div>
                        <p className="mt-1 font-mono text-xs font-bold bg-black/70 text-white px-2 py-0.5 rounded">{student.validYears}</p>
                    </div>
                </main>

                <footer className="text-xs font-medium text-center opacity-70">
                    <p>{localized.footer}</p>
                </footer>
            </div>
        </div>
    );
};

export default IDCard;