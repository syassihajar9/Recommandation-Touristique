from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

import sys
import os
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

SECRET_KEY = 'django-insecure-+yryg$6y^f_=z8v-lov&pz6o1w-$kbpwf3@c7y4hr@_#a*1@p2'

DEBUG = True

ALLOWED_HOSTS = ["*"]  # Autoriser tous les hôtes (à modifier en prod)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
   
    'rest_framework',
    'corsheaders',
    'apps.recommendations',  # Ton app
    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Middleware CORS
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'fr'
TIME_ZONE = 'Africa/Casablanca'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
BASE_DIR / "backend/react/static",  # Assurez-vous que les fichiers générés par React sont ici

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework
REST_FRAMEWORK = {
   'DEFAULT_AUTHENTICATION_CLASSES': [
    'rest_framework_simplejwt.authentication.JWTAuthentication',
],

    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Permet l'accès à tout le monde
    ],
}

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = True  # Permet toutes les origines pendant le développement

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # adresse de ton frontend React
]
OPENWEATHERMAP_API_KEY = '70b656eeb86a87b0a345f45a938b44f4'
GEMINI_API_KEY = "AIzaSyC9gc-0zR1XrNntVIqHV_YN3XD0LurFx0o"

UNSPLASH_ACCESS_KEY = 'vyVdDEVknDeQt0Cik2aEzY7RbaIXpfCqeMfmdZ2K_hY'
