export default {
  translations: {
    logo: 'حسابي',
    user: {
      you: 'أنت',
    },

    generic: {
      messages: {
        welcome: 'أهلا بك',
        loadingPleaseWait: 'يرجى الإنتظار...',
        noDataFound: 'لا توجد بيانات',
        success: 'تمت العملية بنجاح',
      },
      words: {
        others: 'اخرى',
      },
      errors: {
        dataIncomplete:
          'حدث خلل.. .البيانات غير مكتملة.. يرجى التأكد من اتصالك في الانترنت',
        operationFailed: 'لم تتم العملية بنجاح!',
        pageNotFound: 'عذراً...  الصفحة المطلوبة غير موجودة',
        internalError:
          'عذرأ...  حدث عطل فني في الصفحة وجاري العمل على إصلاحه... يرجى المحاولة لاحقا',
      },
      links: {
        goToLogin: 'تسجيل الدخول',
        goToHomePage: 'اذهب الى الصفحة الرئيسة',
        logout: 'تسجيل الخروج',
      },
      actions: {
        cancel: 'الغاء',
        save: 'حفظ',
        delete: 'حذف',
        criticalDelete: 'نعم، أفهم ذلك. أحذف!',
        yes: 'نعم',
        no: 'لا',
        ok: 'تم',
      },
    },

    dashboard: {
      title: 'الرئيسية',
      sharedWithMeGroup: 'حسابات تم مشاركتها معي',
    },

    accountGroup: {
      actions: {
        add: 'أضف مجموعة حسابات',
        edit: 'تعديل مجموعة الحسابات',
        delete: 'حذف محموعة الحسابات',
      },
      form: {
        title: {
          edit: 'تعديل مجموعة الحسابات',
          create: 'مجموعة حسابات جديدة',
        },
        inputAccountGroupName: 'إسم المجموعة',
      },
      deleteForm: {
        title: 'حذف مجموعة الحسابات',
        body: 'هل انت متأكد أنك تريد حذف المجموعة؟ جميع الحسابات داخل هذه المجموعة سيتم حذفها، بالاضافة الى جميع الحركات على تلك الحسابات',
      },
    },

    account: {
      actions: {
        add: 'أضف حساب',
        edit: 'تعديل الحساب',
        delete: 'حذف الحساب',
      },
      card: {
        owner: 'المالك',
        on: 'في',
        noActivities: 'لا يوجد حركات',
        stats: 'نسب المشاركة',
        permissions: 'قائمة الأعضاء',
        debits: 'ديون',
        participation: 'مشاركة',
      },
      form: {
        title: {
          edit: 'تعديل الحساب',
          create: 'حساب جديد',
        },
        selectGroupName: 'إختر المجموعة التي تريد اضافة الحساب اليها',
        selectCurrency: 'إختر العملة',
        inputAccountName: 'أدخل اسم الحساب',
        permissionsSectionHeader: 'إعدادات المشاركة',
      },
      deleteForm: {
        title: 'حذف الحساب',
        body: 'هل انت متأكد أنك تريد حذف الحساب؟ جميع الحركات المالية على هذا الحساب سيتم حذفها أيضا',
      },
      currency: {
        NIS: 'شيكل',
        USD: 'دولار',
        EURO: 'يورو',
        JOD: 'دينار',
      },
    },

    accountPermission: {
      form: {
        selectUser: 'اختر أشخاص لمشاركة الحساب معهم',
        userNameColumn: 'الاسم',
        canEditColumn: 'صلاحية الإضافة',
        explanation: {
          title: 'الحساب المشترك:',
          body: 'جميع الأشخاص في هذه القائمة يمكنهم رؤية الحساب والحركات المالية عليه. لكن، فقظ الأشخاص الذين تم تفعيل "صلاحية الإضافة" لهم يمكنهم اضافة حركات مالية للحساب.',
        },
      },
      list: {
        title: 'المشتركين في الحساب',
      },
    },

    transaction: {
      actions: {
        add: 'أضف حركة مالية',
        edit: 'تعديل الحركة المالية',
        delete: 'حذف الحركة المالية',
      },
      form: {
        title: {
          edit: 'تعدل الحركة المالية',
          create: 'حركة مالية جديدة',
        },
        inputAmount: 'اذخل المبلغ',
        inputDescription: 'ملاحظات...',
        selectDate: 'اختر تايخ الحركة',
      },
      deleteForm: {
        title: 'حذف الحركة المالية',
        body: 'هل تريد حذف هذه الحركة؟',
      },
      operation: {
        added: 'اضاف',
        withdrew: 'سحب',
        deposit: 'أضافة',
        withdraw: 'سحب',
      },
    },

    stats: {
      negativeOrZeroBalances:
        'المجموع الكلي للحسابات صفر او أقل.. الرسم البياني غير ممكن!',
      selectAccountsPlaceholder: 'اختر الحسابات',
      totalBalance: 'المجموع الكلي',
      conversionApiIsDown:
        'خدمة تحويل العملات لا تعمل حاليا... الأرقام أدناه قد تكون غير صحيحة... يرجى المحاولة لاحقا',
    },
  },
};
