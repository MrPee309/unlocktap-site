// Keep module declarations here so the build finds the packages cleanly on Vercel
declare module 'firebase/app';
declare module 'firebase/auth';
declare module 'firebase/firestore';
declare module 'firebase/storage';
declare module 'firebase/functions';

// Only keep xml2js if your repo really imports it (safe to keep)
declare module 'xml2js';
