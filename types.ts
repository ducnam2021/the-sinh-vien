import React from 'react';

export interface University {
  name: string;
  logo: string;
  domain: string;
}

export interface Student {
  university: University;
  id: string;
  name: string;
  dob: string;
  major: string;
  photoUrl: string;
  validYears: string;
  email: string;
  gender: 'random' | 'male' | 'female';
}

export type CountryCode = 'SA' | 'BR' | 'EG' | 'DE' | 'IN' | 'ID' | 'JP' | 'MX' | 'KR' | 'GB' | 'US' | 'VN';

export interface Country {
    code: CountryCode;
    name: string;
}

export interface LocalizedStrings {
    cardTitle: string;
    footer: string;
}
