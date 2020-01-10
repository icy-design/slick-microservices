FROM php:7.1-fpm as builder
RUN apt-get update \
    && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd \
    && :\
    && apt-get install -y libicu-dev \
    && docker-php-ext-install intl \
    && :\
    && apt-get install -y libxml2-dev \
    && apt-get install -y libxslt-dev \
    && docker-php-ext-install soap \
    && docker-php-ext-install xsl \
    && docker-php-ext-install xmlrpc \
    && docker-php-ext-install wddx \
    && :\
    && apt-get install -y libbz2-dev \
    && docker-php-ext-install bz2 \
    && :\
    && docker-php-ext-install zip \
    && docker-php-ext-install pcntl \
    && docker-php-ext-install exif \
    && docker-php-ext-install bcmath \
    && docker-php-ext-install calendar \
    && docker-php-ext-install sockets \
    && docker-php-ext-install gettext \
    && docker-php-ext-install shmop \
    && docker-php-ext-install sysvmsg \
    && docker-php-ext-install sysvsem \
    && docker-php-ext-install sysvshm \
    && docker-php-ext-install opcache

RUN pecl install grpc && docker-php-ext-enable grpc
RUN pecl install protobuf && docker-php-ext-enable protobuf

RUN apt-get install -y \
        librabbitmq-dev \
        libssh-dev \
    && docker-php-ext-install \
        bcmath \
        sockets
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
WORKDIR /src/productcatalog
COPY server/composer.json composer.json
RUN composer install
COPY Server.php ./vendor/spiral/php-grpc/src/Server.php
# 复制配置文件到 /usr/local
COPY etc /usr/local/etc
COPY php.ini /usr/local/etc/phpbuster-updates

FROM builder
COPY server /productcatalogservice
WORKDIR /productcatalogservice
RUN chmod -R 777 /productcatalogservice
COPY --from=builder /src/productcatalog/vendor ./vendor
ADD start.sh start.sh
RUN chmod +x start.sh
CMD sh start.sh

