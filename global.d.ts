// Oddiy (global) CSS importlari uchun, masalan '@toast-ui/editor/dist/toastui-editor.css'
declare module '*.css';
declare module '*.scss';

// Swiper CSS'ni package.json "exports" orqali beradi ('swiper/css' → swiper.min.css),
// "moduleResolution": "node" esa exports'ni o'qimaydi
declare module 'swiper/css';
declare module 'swiper/css/*';
