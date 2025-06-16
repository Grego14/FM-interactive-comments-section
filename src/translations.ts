const translations = {
  en: {
    profile: {
      menu: {
        edit: 'Edit profile',
        settings: 'Settings',
        theme: {
          dark: 'Dark',
          light: 'Light'
        },
        lang: 'English'
      },
      editor: {
        bioPlaceholder: 'Tell us a little about yourself...',
        togglePrivate: 'Make my profile private',
        togglePublic: 'Make my profile public',
        privateText:
          "If your profile is private users, that are not your friends can't see the people you follow, your followers, your posts and your upvote and downvote stats",
        labels: {
          avatar: 'My profile photo',
          username: 'My username',
          email: 'My email',
          bio: 'My bio'
        }
      },
      stats: {
        totalPosts: 'Total posts:',
        postingSince: 'Posting since:',
        upvotes: 'Upvotes:',
        downvotes: 'Downvotes:'
      },
      posts: {
        postsEmpty: 'You have no posts yet.',
        createPost: 'Create one!',
        sort: {
          by: 'Sort by:',
          latest: 'Latest',
          older: 'Older',
          upvotes: 'Upvotes',
          downvotes: 'Downvotes'
        }
      }
    },
    auth: {
      labels: {
        email: 'Email:',
        password: 'Password:'
      },

      signUp: {
        title: 'Create new account',
        createAccount: 'Start! 👉',
        accountExists: 'That account already exists!',
        errors: {
          emptyFields: "Fields can't be empty",
          emptyEmail: "Email can't be empty",
          emptyPassword: "Password can't be empty",
          emailStructure: 'Email must follow the next structure: username@domain.tld',
          shortEmail: 'Email username must be at least 6 characters long',
          atSigns: 'Email can only have one @',
          shortTLD: 'Top level domain must be at least 2 characters long',
          shortPassword: 'Password must be at least 8 characters long!'
        }
      },
      login: {
        title: 'Log in',
        noAccount: 'No account?',
        btnEmail: 'Log in with email',
        btnGoogle: 'Continue with Google',
        btnGithub: 'Continue with Github',
        recuperate: 'I forget my password'
      }
    },
    verifyEmailBanner: {
      text: 'You must verify your email to be able to post, follow users and more.',
      button: 'Click here'
    },
    offlineBanner: {
      text: 'You are using the app in ',
      mode: 'offline mode.'
    },
    authProvider: {
      fetching: 'Fetching user data...',
      cantFetch: "Can't fetch user data. Check your internet connection."
    },
    notifications: {
      newAccount: {
        title: 'Welcome!',
        description: 'Your account was successfully created.'
      }
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Editar',
      retry: 'Retry',
      logout: 'Log Out',
      login: 'Log In'
    },
    signUpButton: 'Create a new account!'
  },
  es: {
    profile: {
      menu: {
        edit: 'Editar perfil',
        settings: 'Configuraciones',
        theme: {
          dark: 'Oscuro',
          light: 'Claro'
        },
        lang: 'Español'
      },
      editor: {
        bioPlaceholder: 'Cuentanos un poco de ti...',
        togglePrivate: 'Hacer mi perfil privado',
        togglePublic: 'Hacer mi perfil publico',
        privateText:
          'Si tu perfil es privado, usuarios que no sean tus amigos no podran ver las personas que sigues, tus seguidores, tus publicaciones ni tus estadísticas de me gustas o no me gustas.',
        labels: {
          avatar: 'Mi foto de perfil',
          username: 'Mi nombre de usuario',
          email: 'Mi correo electronico',
          bio: 'Mi biografía'
        }
      },
      stats: {
        totalPosts: 'Publicaciones totales:',
        postingSince: 'Publicando desde:',
        upvotes: 'Me gustas:',
        downvotes: 'No me gustas:'
      },
      posts: {
        postsEmpty: 'Todavia no tienes publicaciones.',
        createPost: 'Crear una!',
        sort: {
          by: 'Ordenar por:',
          latest: 'Últimas',
          older: 'Antiguas',
          upvotes: 'Más Populares',
          downvotes: 'Menos Populares'
        }
      }
    },
    auth: {
      labels: {
        email: 'Correo eléctronico:',
        password: 'Contraseña:'
      },

      signUp: {
        title: 'Crear nueva cuenta',
        createAccount: '¡Comenzar! 👉',
        accountExists: '¡Esa cuenta ya existe!',
        errors: {
          emptyFields: 'Los campos no pueden estar vacios',
          emptyEmail: 'Se requiere un correo eléctronico',
          emptyPassword: 'Se requiere una contraseña',
          emailStructure: 'El correo eléctronico debe seguir la siguiente estructura: usuario@dominio.tld',
          shortEmail: 'El correo eléctronico debe ser de al menos 6 caracteres',
          atSigns: 'El correo eléctronico debe contener solo un signo arroba',
          shortTLD: 'El dominio de alto nivel debe contener al menos 2 caracteres',
          shortPassword: 'La contraseña debe contener al menos 8 caracteres'
        }
      },

      login: {
        title: 'Inicia sesión',
        noAccount: '¿No tienes cuenta?',
        btnEmail: 'Iniciar sesión con email',
        btnGoogle: 'Continuar con Google',
        btnGithub: 'Continuar con Github',
        recuperate: 'Olvide mi contraseña'
      }
    },
    verifyEmailBanner: {
      text: 'Debes verificar tu correo para poder publicar, seguir usuarios y más.',
      button: 'Click aquí'
    },
    offlineBanner: {
      text: 'Estas usando la app en modo ',
      mode: 'sin conexión.'
    },
    authProvider: {
      fetching: 'Obteniendo datos del usuario...',
      cantFetch:
        'No se pudo obtener los datos del usuario. Verifique su conexión.'
    },
    notifications: {
      newAccount: {
        title: '¡Bienvenido/a!',
        description: 'Tu cuenta fue creada exitosamente.',
      }
    },
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      retry: 'Reintentar',
      logout: 'Cerrar sesión',
      login: 'Iniciar sesión'
    },
    signUpButton: '¡Crear una nueva cuenta!'
  }
} as const

export type LanguageKey = keyof typeof translations
export default translations
