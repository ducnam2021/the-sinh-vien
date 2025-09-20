import React, { useState, useEffect, useRef, useCallback } from 'react';
import IDCard from './components/IDCard';
import ControlPanel from './components/ControlPanel';
import Spinner from './components/Spinner';
import { GraduationCapIcon } from './components/Icons';
import type { Student, University, CountryCode } from './types';
import {
  generateRandomStudent,
  generateRandomUniversity,
  generateRandomName,
  generateRandomDob,
  generateRandomMajor,
  generateRandomPhotoUrl,
  generateEmail,
  generateRandomId,
  generateRandomValidYears
} from './services/generator';
import { toPng } from 'html-to-image';
import { BACKGROUNDS } from './constants/data';

function App() {
  const [student, setStudent] = useState<Student | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('VN');
  const [isGenerating, setIsGenerating] = useState(true);
  const [isPhotoGenerating, setIsPhotoGenerating] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>(BACKGROUNDS[0].style);
  const [cardColor, setCardColor] = useState<string>('#f59e0b'); // Default amber color
  const idCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadInitialStudent = async () => {
      setIsGenerating(true);
      const initialStudent = await generateRandomStudent(selectedCountry);
      setStudent(initialStudent);
      setIsGenerating(false);
    };
    loadInitialStudent();
  }, [selectedCountry]);

  const handleCountryChange = useCallback((countryCode: CountryCode) => {
    setSelectedCountry(countryCode);
    // The useEffect hook will handle regeneration
  }, []);

  const handleStudentChange = useCallback(<K extends keyof Student>(field: K, value: Student[K]) => {
    if (field === 'gender') {
      const newGender = value as 'male' | 'female' | 'random';
      const determinedGender = newGender === 'random' ? (Math.random() > 0.5 ? 'male' : 'female') : newGender;
      
      setStudent(prev => prev ? {
          ...prev,
          gender: newGender,
          name: generateRandomName(selectedCountry, determinedGender),
      } : null);

      const generateNewPhoto = async () => {
          setIsPhotoGenerating(true);
          const newPhotoUrl = await generateRandomPhotoUrl(selectedCountry, determinedGender);
          setStudent(p => p ? {...p, photoUrl: newPhotoUrl} : null);
          setIsPhotoGenerating(false);
      };
      generateNewPhoto();
    } else {
       setStudent(prev => prev ? { ...prev, [field]: value } : null);
    }
  }, [selectedCountry]);

  const handleUniversityChange = useCallback((field: keyof University, value: string) => {
    setStudent(prev => {
        if (!prev) return null;
        return {
          ...prev,
          university: {
            ...prev.university,
            [field]: value
          }
        };
    });
  }, []);
  
  const handleRandomizeField = useCallback(async (field: keyof Student) => {
    if (!student) return;

    switch (field) {
        case 'university':
            const newUniversity = generateRandomUniversity(selectedCountry);
            setStudent(prev => prev ? { ...prev, university: newUniversity, email: generateEmail(prev.id, newUniversity.domain)}: null);
            break;
        case 'name':
            const determinedNameGender = student.gender === 'random' ? (Math.random() > 0.5 ? 'male' : 'female') : student.gender;
            setStudent(prev => prev ? { ...prev, name: generateRandomName(selectedCountry, determinedNameGender) } : null);
            break;
        case 'dob':
            setStudent(prev => prev ? { ...prev, dob: generateRandomDob() } : null);
            break;
        case 'major':
            setStudent(prev => prev ? { ...prev, major: generateRandomMajor(selectedCountry) } : null);
            break;
        case 'photoUrl':
            const photoGender = student.gender === 'random' ? (Math.random() > 0.5 ? 'male' : 'female') : student.gender;
            setIsPhotoGenerating(true);
            const newPhotoUrl = await generateRandomPhotoUrl(selectedCountry, photoGender);
            setStudent(prev => prev ? { ...prev, photoUrl: newPhotoUrl } : null);
            setIsPhotoGenerating(false);
            break;
        default:
            break;
    }
  }, [student, selectedCountry]);

  const handleGenerateNew = useCallback(async () => {
    if (!student) return;
    setIsGenerating(true);
    
    const determinedGender = student.gender === 'random' 
        ? (Math.random() > 0.5 ? 'male' : 'female') 
        : student.gender;

    const newUniversity = generateRandomUniversity(selectedCountry);
    const newId = generateRandomId();
    const newPhotoUrl = await generateRandomPhotoUrl(selectedCountry, determinedGender);
    
    setStudent({
        ...student,
        university: newUniversity,
        id: newId,
        name: generateRandomName(selectedCountry, determinedGender),
        dob: generateRandomDob(),
        major: generateRandomMajor(selectedCountry),
        photoUrl: newPhotoUrl,
        validYears: generateRandomValidYears(),
        email: generateEmail(newId, newUniversity.domain),
    });
    setIsGenerating(false);
  }, [student, selectedCountry]);

  const handleDownload = useCallback(() => {
    if (idCardRef.current === null || !student) {
      return;
    }
    toPng(idCardRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `student-id-${student.id}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download image', err);
        alert('Oops, something went wrong while trying to download the image.');
      });
  }, [student]);

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const dataUrl = await fileToDataUrl(e.target.files[0]);
        setStudent(prev => prev ? ({ ...prev, photoUrl: dataUrl }) : null);
      } catch (error) {
        console.error("Error reading photo file:", error);
      }
    }
  }, []);

  const handleLogoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const dataUrl = await fileToDataUrl(e.target.files[0]);
        handleUniversityChange('logo', dataUrl);
      } catch (error) {
        console.error("Error reading logo file:", error);
      }
    }
  }, [handleUniversityChange]);
  
  useEffect(() => {
    if (student) {
        setStudent(prev => {
            if (!prev) return null;
            return {
                ...prev,
                email: generateEmail(prev.id, prev.university.domain)
            }
        });
    }
  }, [student?.id, student?.university.domain]);


  if (!student || isGenerating) {
      return (
        <div className="min-h-screen bg-gray-900 flex flex-col gap-4 items-center justify-center text-white">
            <Spinner />
            <p>Đang tạo thẻ sinh viên...</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans transition-all duration-500">
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <header className="text-center mb-8">
            <div className="flex justify-center items-center gap-4">
                <GraduationCapIcon className="h-12 w-12 text-amber-400" />
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Trình tạo thẻ sinh viên</h1>
            </div>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-300">Tạo thẻ sinh viên tùy chỉnh một cách nhanh chóng.</p>
        </header>
        
        <main className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
            <div className="w-full lg:w-auto">
                <ControlPanel 
                    student={student}
                    selectedCountry={selectedCountry}
                    cardColor={cardColor}
                    onCountryChange={handleCountryChange}
                    onStudentChange={handleStudentChange}
                    onUniversityChange={handleUniversityChange}
                    onRandomizeField={handleRandomizeField}
                    onGenerateNew={handleGenerateNew}
                    onDownload={handleDownload}
                    onPhotoUpload={handlePhotoUpload}
                    onLogoUpload={handleLogoUpload}
                    isGenerating={isGenerating}
                    onBackgroundChange={setBackgroundStyle}
                    onCardColorChange={setCardColor}
                />
            </div>

            <div className="w-full lg:max-w-xl xl:max-w-2xl flex-shrink-0">
                <div ref={idCardRef} style={backgroundStyle} className="p-8 rounded-3xl transition-all duration-500">
                    <IDCard student={student} country={selectedCountry} isPhotoGenerating={isPhotoGenerating} cardColor={cardColor} />
                </div>
            </div>
        </main>

        <footer className="text-center mt-12 text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Student ID Card Generator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;