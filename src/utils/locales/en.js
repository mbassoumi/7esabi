export default {
  translations: {
    logo: '7esabi',
    user: {
      you: 'you',
    },

    generic: {
      messages: {
        welcome: 'Welcome',
        loadingPleaseWait: 'Loading...',
        noDataFound: 'No data available',
        success: 'Operation was successful',
      },
      errors: {
        dataIncomplete:
          'An error occurred... The data is not complete... Please check your internet connection',
        operationFailed: 'Operation failed!',
        pageNotFound: 'Sorry... Requested page is not found',
        internalError:
          'Sorry... We have a technical issue and we are working on it. Please try again later',
      },
      links: {
        goToLogin: 'Login or Signup',
        goToHomePage: 'Go to home page',
        logout: 'logout',
      },
      actions: {
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        criticalDelete: 'Yes, I Understand. Delete!',
        yes: 'Yes',
        no: 'No',
        ok: 'Ok',
      },
    },

    dashboard: {
      title: 'Dashboard',
      sharedWithMeGroup: 'Shared With Me',
    },

    accountGroup: {
      actions: {
        add: 'Add Account Group',
        edit: 'Edit Account Group',
        delete: 'Delete Account Group',
      },
      form: {
        title: {
          edit: 'Edit Account Group',
          create: 'New Account Group',
        },
        inputAccountGroupName: 'Account Group Name',
      },
      deleteForm: {
        title: 'Delete Account Group',
        body:
          'Are you sure? If you delete an account group, all the accounts inside it and transactions on them will be deleted.',
      },
    },

    account: {
      actions: {
        add: 'Add Account',
        edit: 'Edit Account',
        delete: 'Delete Account',
      },
      card: {
        owner: 'Owner',
        on: 'on',
        noActivities: 'No Activities',
        stats: 'Participation Statistics',
        permissions: 'Account Users',
        debits: 'Debits',
        participation: 'Participation',
      },
      form: {
        title: {
          edit: 'Edit Account',
          create: 'New Account',
        },
        selectGroupName: 'Select Account Group',
        selectCurrency: 'Select Currency',
        inputAccountName: 'Enter Account Name',
        permissionsSectionHeader: 'Permissions Control',
      },
      deleteForm: {
        title: 'Delete Account',
        body:
          'Are you sure? If you delete this account, the transactions on it will be deleted as well.',
      },
      currency: {
        NIS: 'shekel(s)',
        USD: 'dollar(s)',
        EURO: 'euro(s)',
        JOD: 'dinar(s)',
      },
    },

    accountPermission: {
      form: {
        selectUser: 'Select users to share the account with',
        userNameColumn: 'User',
        canEditColumn: 'Write Access',
        explanation: {
          title: 'Shared Accounts:',
          body:
            'Everyone in the list below can see the account and its transactions. However, only the ones with an enabled Edit Access would be able to add transactions to the account.',
        },
      },
      list: {
        title: 'People who share this account',
      },
    },

    transaction: {
      actions: {
        add: 'Add Transaction',
        edit: 'Edit Transaction',
        delete: 'Delete Transaction',
      },
      form: {
        title: {
          edit: 'Edit Transaction',
          create: 'New Transaction',
        },
        inputAmount: 'Enter amount',
        inputDescription: 'Add description',
        selectDate: 'Select Date',
      },
      deleteForm: {
        title: 'Delete Transaction',
        body: 'Do you want to delete this transaction?',
      },
      operation: {
        added: 'added',
        withdrew: 'withdrew',
        deposit: 'Deposit',
        withdraw: 'Withdraw',
      },
    },
  },
};
