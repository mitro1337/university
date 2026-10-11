# Multi-stage Dockerfile pentru Laravel 11 & PHP 8.2
FROM php:8.2-cli-alpine AS base

# Instalare dependinte de sistem si extensii PHP esentiale pentru MySQL
RUN apk add --no-cache \
    curl \
    git \
    libzip-dev \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    mysql-client \
    bash \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    xml \
    bcmath \
    zip

# Copiere composer din imaginea oficiala
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiere dependinte composer pentru optimizare cache Docker layer
COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copiere cod sursa aplicatie
COPY . .

# Generare autoloader si optimizari
RUN composer dump-autoload --optimize \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
