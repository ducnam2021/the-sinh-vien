import React from 'react';
import type { University, CountryCode, Country, LocalizedStrings } from '../types';

export const COUNTRIES: Country[] = [
  { code: 'SA', name: 'Ả Rập Xê Út' },
  { code: 'US', name: 'Hoa Kỳ' },
  { code: 'GB', name: 'Vương quốc Anh' },
  { code: 'DE', name: 'Đức' },
  { code: 'JP', name: 'Nhật Bản' },
  { code: 'KR', name: 'Hàn Quốc' },
  { code: 'IN', name: 'Ấn Độ' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'EG', name: 'Ai Cập' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'VN', name: 'Việt Nam' },
];

interface CountryData {
  universities: University[];
  firstNamesMale: string[];
  firstNamesFemale: string[];
  lastNames: string[];
  majors: string[];
  nationality: string;
}

export const COUNTRY_DATA: Record<CountryCode, CountryData> = {
  SA: {
    universities: [
      { name: "King Saud University", logo: "https://logo.clearbit.com/ksu.edu.sa", domain: "ksu.edu.sa" },
      { name: "King Abdulaziz University", logo: "https://logo.clearbit.com/kau.edu.sa", domain: "kau.edu.sa" },
      { name: "KFUPM", logo: "https://logo.clearbit.com/kfupm.edu.sa", domain: "kfupm.edu.sa" },
      { name: "Umm Al-Qura University", logo: "https://logo.clearbit.com/uqu.edu.sa", domain: "uqu.edu.sa" },
      { name: "Imam Muhammad ibn Saud Islamic University", logo: "https://logo.clearbit.com/imamu.edu.sa", domain: "imamu.edu.sa" },
    ],
    firstNamesMale: ["Omar", "Abdullah", "Mohammed", "Ali", "Khaled"],
    firstNamesFemale: ["Fatima", "Aisha", "Sarah", "Noor", "Hana"],
    lastNames: ["Al-Ghamdi", "Al-Zahrani", "Al-Qahtani", "Al-Otaibi", "Khan"],
    majors: ["Petroleum Engineering", "Islamic Studies", "Business Administration", "Computer Science", "Medicine"],
    nationality: "Saudi Arabian",
  },
  US: {
    universities: [
      { name: "Harvard University", logo: "https://logo.clearbit.com/harvard.edu", domain: "harvard.edu" },
      { name: "Stanford University", logo: "https://logo.clearbit.com/stanford.edu", domain: "stanford.edu" },
      { name: "MIT", logo: "https://logo.clearbit.com/mit.edu", domain: "mit.edu" },
      { name: "UC Berkeley", logo: "https://logo.clearbit.com/berkeley.edu", domain: "berkeley.edu" },
      { name: "Yale University", logo: "https://logo.clearbit.com/yale.edu", domain: "yale.edu" },
    ],
    firstNamesMale: ["James", "John", "Robert", "Michael", "William"],
    firstNamesFemale: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth"],
    lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones"],
    majors: ["Computer Science", "Economics", "Psychology", "Political Science", "Biology"],
    nationality: "American",
  },
  GB: {
    universities: [
      { name: "University of Oxford", logo: "https://logo.clearbit.com/ox.ac.uk", domain: "ox.ac.uk" },
      { name: "University of Cambridge", logo: "https://logo.clearbit.com/cam.ac.uk", domain: "cam.ac.uk" },
      { name: "Imperial College London", logo: "https://logo.clearbit.com/imperial.ac.uk", domain: "imperial.ac.uk" },
      { name: "UCL", logo: "https://logo.clearbit.com/ucl.ac.uk", domain: "ucl.ac.uk" },
      { name: "University of Edinburgh", logo: "https://logo.clearbit.com/ed.ac.uk", domain: "ed.ac.uk" },
    ],
    firstNamesMale: ["Oliver", "George", "Harry", "Noah", "Jack"],
    firstNamesFemale: ["Olivia", "Amelia", "Isla", "Ava", "Emily"],
    lastNames: ["Smith", "Jones", "Taylor", "Brown", "Williams"],
    majors: ["Law", "Medicine", "History", "English Literature", "Philosophy"],
    nationality: "British",
  },
  DE: {
    universities: [
        { name: "TU Munich", logo: "https://logo.clearbit.com/tum.de", domain: "tum.de" },
        { name: "LMU Munich", logo: "https://logo.clearbit.com/lmu.de", domain: "lmu.de" },
        { name: "Heidelberg University", logo: "https://logo.clearbit.com/uni-heidelberg.de", domain: "uni-heidelberg.de" },
        { name: "Humboldt University of Berlin", logo: "https://logo.clearbit.com/hu-berlin.de", domain: "hu-berlin.de" },
    ],
    firstNamesMale: ["Ben", "Paul", "Jonas", "Finn", "Leon"],
    firstNamesFemale: ["Mia", "Emma", "Hannah", "Sophia", "Anna"],
    lastNames: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber"],
    majors: ["Mechanical Engineering", "Physics", "Chemistry", "Philosophy", "Automotive Engineering"],
    nationality: "German",
  },
  JP: {
    universities: [
        { name: "The University of Tokyo", logo: "https://logo.clearbit.com/u-tokyo.ac.jp", domain: "u-tokyo.ac.jp" },
        { name: "Kyoto University", logo: "https://logo.clearbit.com/kyoto-u.ac.jp", domain: "kyoto-u.ac.jp" },
        { name: "Osaka University", logo: "https://logo.clearbit.com/osaka-u.ac.jp", domain: "osaka-u.ac.jp" },
        { name: "Tohoku University", logo: "https://logo.clearbit.com/tohoku.ac.jp", domain: "tohoku.ac.jp" },
    ],
    firstNamesMale: ["Hiroshi", "Takeshi", "Akira", "Kenji", "Satoshi"],
    firstNamesFemale: ["Yuki", "Hana", "Sakura", "Aiko", "Rin"],
    lastNames: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe"],
    majors: ["Robotics", "Material Science", "Economics", "Fine Arts", "Manga Studies"],
    nationality: "Japanese",
  },
  KR: {
    universities: [
        { name: "Seoul National University", logo: "https://logo.clearbit.com/snu.ac.kr", domain: "snu.ac.kr" },
        { name: "KAIST", logo: "https://logo.clearbit.com/kaist.ac.kr", domain: "kaist.ac.kr" },
        { name: "Korea University", logo: "https://logo.clearbit.com/korea.ac.kr", domain: "korea.ac.kr" },
        { name: "Yonsei University", logo: "https://logo.clearbit.com/yonsei.ac.kr", domain: "yonsei.ac.kr" },
    ],
    firstNamesMale: ["Min-jun", "Seo-jun", "Do-yun", "Ye-jun", "Ha-joon"],
    firstNamesFemale: ["Seo-yeon", "Ha-eun", "Ji-woo", "Seo-hyun", "Min-seo"],
    lastNames: ["Kim", "Lee", "Park", "Choi", "Jeong"],
    majors: ["Electrical Engineering", "Business", "Media & Communication", "Design", "Computer Game Development"],
    nationality: "South Korean",
  },
  IN: {
    universities: [
        { name: "IIT Bombay", logo: "https://logo.clearbit.com/iitb.ac.in", domain: "iitb.ac.in" },
        { name: "IIT Delhi", logo: "https://logo.clearbit.com/iitd.ac.in", domain: "iitd.ac.in" },
        { name: "IISc Bangalore", logo: "https://logo.clearbit.com/iisc.ac.in", domain: "iisc.ac.in" },
        { name: "University of Delhi", logo: "https://logo.clearbit.com/du.ac.in", domain: "du.ac.in" },
    ],
    firstNamesMale: ["Aarav", "Vihaan", "Aditya", "Arjun", "Sai"],
    firstNamesFemale: ["Saanvi", "Aadya", "Kiara", "Diya", "Pari"],
    lastNames: ["Sharma", "Verma", "Gupta", "Singh", "Patel"],
    majors: ["Computer Science", "Commerce", "Mechanical Engineering", "Civil Engineering", "Ayurvedic Medicine"],
    nationality: "Indian",
  },
  BR: {
    universities: [
        { name: "University of São Paulo", logo: "https://logo.clearbit.com/usp.br", domain: "usp.br" },
        { name: "University of Campinas", logo: "https://logo.clearbit.com/unicamp.br", domain: "unicamp.br" },
        { name: "UFRJ", logo: "https://logo.clearbit.com/ufrj.br", domain: "ufrj.br" },
    ],
    firstNamesMale: ["Miguel", "Arthur", "Heitor", "Bernardo", "Davi"],
    firstNamesFemale: ["Helena", "Alice", "Laura", "Manuela", "Valentina"],
    lastNames: ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues"],
    majors: ["Law", "Dentistry", "Agricultural Science", "Social Communication", "Veterinary Medicine"],
    nationality: "Brazilian",
  },
  MX: {
    universities: [
        { name: "UNAM", logo: "https://logo.clearbit.com/unam.mx", domain: "unam.mx" },
        { name: "Tec de Monterrey", logo: "https://logo.clearbit.com/tec.mx", domain: "tec.mx" },
        { name: "IPN", logo: "https://logo.clearbit.com/ipn.mx", domain: "ipn.mx" },
    ],
    firstNamesMale: ["Santiago", "Mateo", "Sebastián", "Leonardo", "Matías"],
    firstNamesFemale: ["Sofía", "Valentina", "Regina", "María José", "Ximena"],
    lastNames: ["Hernández", "García", "Martínez", "López", "González"],
    majors: ["Architecture", "Medicine", "Industrial Engineering", "Gastronomy", "Mechatronics"],
    nationality: "Mexican",
  },
  EG: {
    universities: [
        { name: "Cairo University", logo: "https://logo.clearbit.com/cu.edu.eg", domain: "cu.edu.eg" },
        { name: "Ain Shams University", logo: "https://logo.clearbit.com/asu.edu.eg", domain: "asu.edu.eg" },
        { name: "The American University in Cairo", logo: "https://logo.clearbit.com/aucegypt.edu", domain: "aucegypt.edu" },
    ],
    firstNamesMale: ["Mohamed", "Ahmed", "Mahmoud", "Youssef", "Omar"],
    firstNamesFemale: ["Malak", "Jana", "Hana", "Farida", "Salma"],
    lastNames: ["Mohamed", "Mahmoud", "Ali", "Hassan", "Ibrahim"],
    majors: ["Medicine", "Engineering", "Pharmacy", "Archaeology", "Commerce"],
    nationality: "Egyptian",
  },
  ID: {
    universities: [
        { name: "University of Indonesia", logo: "https://logo.clearbit.com/ui.ac.id", domain: "ui.ac.id" },
        { name: "Gadjah Mada University", logo: "https://logo.clearbit.com/ugm.ac.id", domain: "ugm.ac.id" },
        { name: "Bandung Institute of Technology", logo: "https://logo.clearbit.com/itb.ac.id", domain: "itb.ac.id" },
    ],
    firstNamesMale: ["Budi", "Agus", "Eko", "Putra", "Joko"],
    firstNamesFemale: ["Putri", "Sri", "Dewi", "Siti", "Indah"],
    lastNames: ["Santoso", "Wijaya", "Susanto", "Kurniawan", "Pratama"],
    majors: ["Informatics", "Accounting", "Management", "Communication Science", "Law"],
    nationality: "Indonesian",
  },
  VN: {
    universities: [
        { name: "Đại học Quốc gia Hà Nội", logo: "https://logo.clearbit.com/vnu.edu.vn", domain: "vnu.edu.vn" },
        { name: "Đại học Bách khoa Hà Nội", logo: "https://logo.clearbit.com/hust.edu.vn", domain: "hust.edu.vn" },
        { name: "Đại học Quốc gia TP.HCM", logo: "https://logo.clearbit.com/vnuhcm.edu.vn", domain: "vnuhcm.edu.vn" },
        { name: "Đại học Cần Thơ", logo: "https://logo.clearbit.com/ctu.edu.vn", domain: "ctu.edu.vn" },
    ],
    firstNamesMale: ["An", "Bảo", "Dũng", "Hải", "Khánh"],
    firstNamesFemale: ["Anh", "Chi", "Hương", "Linh", "Phương"],
    lastNames: ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng"],
    majors: ["Công nghệ thông tin", "Quản trị kinh doanh", "Ngôn ngữ Anh", "Kỹ thuật cơ khí", "Tài chính-Ngân hàng"],
    nationality: "Vietnamese",
  },
};

export const LOCALIZED_STRINGS: Record<CountryCode, LocalizedStrings> = {
    SA: { cardTitle: "بطاقة طالب", footer: "يجب إبراز هذه البطاقة عند الطلب" },
    US: { cardTitle: "STUDENT ID", footer: "THIS CARD MUST BE PRESENTED UPON REQUEST" },
    GB: { cardTitle: "STUDENT ID", footer: "THIS CARD MUST BE PRESENTED UPON REQUEST" },
    DE: { cardTitle: "STUDENTENAUSWEIS", footer: "DIESER AUSWEIS IST AUF VERLANGEN VORZUZEIGEN" },
    JP: { cardTitle: "学生証", footer: "この学生証は、要求に応じて提示する必要があります" },
    KR: { cardTitle: "학생증", footer: "이 카드는 요청 시 제시해야 합니다" },
    IN: { cardTitle: "STUDENT ID", footer: "THIS CARD MUST BE PRESENTED UPON REQUEST" },
    BR: { cardTitle: "CARTEIRA DE ESTUDANTE", footer: "ESTE CARTÃO DEVE SER APRESENTADO MEDIANTE SOLICITAÇÃO" },
    MX: { cardTitle: "CREDENCIAL DE ESTUDIANTE", footer: "ESTA CREDENCIAL DEBE PRESENTARSE CUANDO SE SOLICITE" },
    EG: { cardTitle: "بطاقة طالب", footer: "يجب إبراز هذه البطاقة عند الطلب" },
    ID: { cardTitle: "KARTU MAHASISWA", footer: "SETIAP SEMESTER MAHASISWA HARUS MELAKSANAKAN REGISTRASI" },
    VN: { cardTitle: "THẺ SINH VIÊN", footer: "VUI LÒNG XUẤT TRÌNH THẺ KHI ĐƯỢC YÊU CẦU" },
};


export const BACKGROUNDS: { name: string; style: React.CSSProperties }[] = [
    { 
        name: 'Nền gỗ sáng', 
        style: { 
            backgroundImage: "url('https://images.pexels.com/photos/244433/pexels-photo-244433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } 
    },
    { 
        name: 'Nền gỗ cũ', 
        style: { 
            backgroundImage: "url('https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } 
    },
    { 
        name: 'Nền gỗ tối', 
        style: { 
            backgroundImage: "url('https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } 
    },
    { 
        name: 'Nền gỗ bóng', 
        style: { 
            backgroundImage: "url('https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } 
    },
    { 
        name: 'Nền gỗ hoa văn', 
        style: { 
            backgroundImage: "url('https://images.pexels.com/photos/273935/pexels-photo-273935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } 
    },
];