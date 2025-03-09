"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 5.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from dotenv import load_dotenv
import dj_database_url
import os
load_dotenv()

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

CALLBACK_URL = "http://localhost:3000"

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    #3rd Party
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'corsheaders',
    'django.contrib.sites',
    'django_seed',
    'django_extensions',
    
    
    # image hosts
    'cloudinary',
    'cloudinary_storage', 
    
    #auth
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    "allauth.socialaccount.providers.discord",
    'django_otp',
    'django_otp.plugins.otp_email',
    
    #local apps
    "accounts",
    "recipes",
    "interactions",
    "cook_list",
]

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    },
    'discord': {
        "SCOPE": [
            "identify",
            "email",
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }

    
}

SOCIALACCOUNT_EMAIL_VERIFICATION = 'none'
SOCIALACCOUNT_EMAIL_REQUIRED = False

# re enable when implementing email verification
ACCOUNT_LOGIN_METHODS = {'email'}
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = "none"


SITE_ID = 1

DJ_REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "access",
    "JWT_AUTH_REFRESH_COOKIE": "refresh",
    "JWT_AUTH_SECURE": False, # true in prod
    "JWT_AUTH_SAMESITE": "Lax",
    "SESSION_LOGIN": False,
}

REST_USE_JWT = True
JWT_AUTH_COOKIE = "access"
JWT_REFRESH_COOKIE = "refresh"

CORS_ALLOW_CREDENTIALS = True  
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:8000", "http://127.0.0.1:3000"]  
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:8000", "http://127.0.0.1:3000"] 

SESSION_COOKIE_SAMESITE = "Lax"  
CSRF_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_SECURE = True  
SESSION_COOKIE_SECURE = True  

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv("EMAIL_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_PASS")

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv("CLOUDINARY_CLOUD_NAME"),
    'API_KEY':  os.getenv("CLOUDINARY_API_KEY"),
    'API_SECRET': os.getenv("CLOUDINARY_API_SECRET"),
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    "USER_ID_FIELD": "userId",
    "USER_ID_CLAIM": "user_id",
    "SIGNING_KEY": os.getenv("JWT_SECRET_KEY")
}

AUTH_USER_MODEL = "accounts.CustomUserModel"

REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "accounts.serializers.CustomUserModelSerializer",
}

REST_AUTH_REGISTER_SERIALIZERS = {
    "REGISTER_SERIALIZER": "accounts.serializers.CustomUserModelSerializer"
}


CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")

REST_FRAMEWORK = {
    
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication', 
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
          os.path.join(BASE_DIR, 'templates'),
        ],
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

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASE = os.getenv("DATABASE_URL")

DATABASES = {
    "default": dj_database_url.config(
        default=DATABASE,
        conn_max_age=600,
        ssl_require=True, 
    )
}




# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

from dj_rest_auth.app_settings import api_settings

api_settings.USE_JWT = True

