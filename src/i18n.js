// import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
//
// i18n.use(LanguageDetector).init({
//   // we init with resources
//   resources: {
//     en: {
//       translations: {
//         logo: '7esabi',
//         username: 'username',
//         password: 'password'
//       }
//     },
//     ar: {
//       translations: {
//         logo: 'حسابي',
//         username: 'اسم المستخدم',
//         password: 'كلمة السر'
//       }
//     },
//   },
//   fallbackLng: "en",
//   debug: true,
//
//   // have a common namespace used around the full app
//   ns: ["translations"],
//   defaultNS: "translations",
//
//   keySeparator: false, // we use content as keys
//
//   interpolation: {
//     escapeValue: false, // not needed for react!!
//     formatSeparator: ","
//   },
//
//   react: {
//     wait: true
//   }
// });
//
// export default i18n;

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend)

  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {
        translations: {
          logo: '7esabi',
          username: 'username',
          password: 'password',
          login: 'Login',
          groupName: 'Group Name',
          accountName: 'Account Name',
          EditGroupName: 'Edit Group Name',
          save: 'Save',
          cancel: 'Cancel',
          dashboard: {
            title: 'Dashboard',
          },
          selectCurrency: 'Select Currency',
          currency: {
            nis: 'Shekel',
            usa: 'Dollar',
            euro: 'Euro',
            jod: 'Dinar',
          },
          sharedWith: 'Shared With',
          createAccount: 'Create New Account',
          addTransaction: 'Add Transaction',
          withdraw: 'Withdraw',
          deposit: 'Deposit',
          amount: 'Amount',
          description: 'Description',
          date: 'Date',
        },
      },
      ar: {
        translations: {
          logo: 'حسابي',
          username: 'اسم المستخدم',
          password: 'كلمة السر',
          login: 'تسجيل الدخول',
          groupName: 'اسم المجموعة',
          accountName: 'اسم الحساب',
          EditGroupName: 'تعديل اسم المجموعة',
          save: 'حفظ',
          cancel: 'الغاء',
          dashboard: {
            title: 'الحسابات',
          },
          selectCurrency: 'اختر عملة',
          currency: {
            nis: 'شيقل',
            usa: 'دولار',
            euro: 'يورو',
            jod: 'دينار',
          },
          sharedWith: 'مشاركة مع',
          createAccount: 'انشاء حساب جديد',
          addTransaction: 'اضافة حركة نقدية',
          withdraw: 'سحب',
          deposit: 'ايداع',
          amount: 'المبلغ',
          description: 'الوصف',
          date: 'التاريخ',
        },
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n